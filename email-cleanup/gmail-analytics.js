#!/usr/bin/env node

/**
 * Gmail Email Analytics Service
 * 
 * This service generates a comprehensive report of all senders in your Gmail inbox
 * with email counts, sorted in descending order.
 * 
 * Features:
 * - Lists all unique sender email addresses
 * - Counts emails per sender
 * - Outputs CSV format (sorted by count descending)
 * - Supports GitHub Actions workflow integration
 * - Privacy-focused: outputs to private gist or workflow summary
 * 
 * Author: Gmail Project Team
 * Date: 2026-03-05
 */

const { google } = require('googleapis');
const https = require('https');
const fs = require('fs').promises;

class GmailAnalyticsService {
  constructor() {
    this.gmail = null;
    this.auth = null;
    this.config = null;
    this.senderStats = new Map();
    this.totalEmailsProcessed = 0;
  }

  /**
   * Initialize the Gmail API client with OAuth2 authentication
   */
  async initialize() {
    try {
      console.log('🔧 Initializing Gmail Analytics Service...');
      
      // Load configuration
      await this.loadConfiguration();
      
      // Setup OAuth2 client
      this.auth = new google.auth.OAuth2(
        this.config.clientId,
        this.config.clientSecret,
        this.config.redirectUri || 'urn:ietf:wg:oauth:2.0:oob'
      );

      // Set refresh token
      this.auth.setCredentials({
        refresh_token: this.config.refreshToken
      });

      // Initialize Gmail API
      this.gmail = google.gmail({ version: 'v1', auth: this.auth });
      
      console.log('✅ Gmail API initialized successfully');
      
    } catch (error) {
      console.error('❌ Failed to initialize Gmail service:', error.message);
      throw error;
    }
  }

  /**
   * Load configuration from environment variables
   */
  async loadConfiguration() {
    try {
      this.config = {
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        maxResults: parseInt(process.env.MAX_RESULTS_PER_QUERY || '500'),
        rateLimitDelay: parseInt(process.env.RATE_LIMIT_DELAY_MS || '500'),
        maxPages: parseInt(process.env.MAX_PAGES || '20'), // Limit pages to avoid timeout
        gistToken: process.env.GIST_TOKEN, // For private gist storage
        outputFormat: process.env.OUTPUT_FORMAT || 'both', // 'csv', 'summary', 'both'
        senderEmailsList: process.env.SENDER_EMAILS_LIST || '', // Current cleanup list
        minEmailThreshold: parseInt(process.env.MIN_EMAIL_THRESHOLD || '10') // Min emails to suggest
      };

      // Validate required configuration
      if (!this.config.clientId || !this.config.clientSecret || !this.config.refreshToken) {
        throw new Error('Missing required Gmail API credentials.');
      }

      console.log('📋 Configuration loaded successfully');
      console.log(`📊 Max results per query: ${this.config.maxResults}`);
      console.log(`📄 Max pages to process: ${this.config.maxPages}`);
      console.log(`🎯 Min email threshold for suggestions: ${this.config.minEmailThreshold}`);
      
    } catch (error) {
      console.error('❌ Failed to load configuration:', error.message);
      throw error;
    }
  }

  /**
   * Get the current cleanup list from SENDER_EMAILS_LIST
   */
  getCurrentCleanupList() {
    if (!this.config.senderEmailsList || !this.config.senderEmailsList.trim()) {
      console.log('📋 No SENDER_EMAILS_LIST configured - will show all suggestions');
      return new Set();
    }
    
    const emails = this.config.senderEmailsList
      .split(',')
      .map(email => email.trim().toLowerCase())
      .filter(email => email);
    
    console.log(`📋 Current cleanup list has ${emails.length} senders`);
    return new Set(emails);
  }

  /**
   * Compare analytics results with current cleanup list
   * Returns senders NOT in cleanup list, sorted by email count
   */
  getNewSendersToAdd(sortedStats, currentCleanupList, minThreshold = 10) {
    const newSenders = sortedStats
      .filter(([email, count]) => {
        // Not in current cleanup list AND meets minimum threshold
        return !currentCleanupList.has(email.toLowerCase()) && count >= minThreshold;
      });
    
    return newSenders;
  }

  /**
   * Generate copy-paste ready string for new senders
   */
  generateCopyPasteList(newSenders, limit = 50) {
    const topNewSenders = newSenders.slice(0, limit);
    return topNewSenders.map(([email]) => email).join(',');
  }

  /**
   * Sleep for specified milliseconds (for rate limiting)
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Extract email address from sender string
   * Handles formats like "Name <email@example.com>" or "email@example.com"
   */
  extractEmailAddress(fromHeader) {
    if (!fromHeader) return 'unknown';
    
    // Try to extract email from "Name <email@example.com>" format
    const emailMatch = fromHeader.match(/<([^>]+)>/);
    if (emailMatch) {
      return emailMatch[1].toLowerCase();
    }
    
    // If no angle brackets, try to find email pattern
    const directEmailMatch = fromHeader.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (directEmailMatch) {
      return directEmailMatch[0].toLowerCase();
    }
    
    return fromHeader.toLowerCase();
  }

  /**
   * Get all messages from inbox with pagination
   */
  async getAllInboxMessages() {
    try {
      console.log('📥 Fetching inbox messages...');
      
      let pageToken = null;
      let pageCount = 0;
      let allMessages = [];
      
      do {
        // Rate limiting
        if (pageCount > 0) {
          await this.sleep(this.config.rateLimitDelay);
        }
        
        const response = await this.gmail.users.messages.list({
          userId: 'me',
          labelIds: ['INBOX'],
          maxResults: this.config.maxResults,
          pageToken: pageToken
        });
        
        const messages = response.data.messages || [];
        allMessages = allMessages.concat(messages);
        pageToken = response.data.nextPageToken;
        pageCount++;
        
        console.log(`📄 Page ${pageCount}: Found ${messages.length} messages (Total: ${allMessages.length})`);
        
        // Safety limit to prevent timeout
        if (pageCount >= this.config.maxPages) {
          console.log(`⚠️ Reached max pages limit (${this.config.maxPages}). Processing collected messages.`);
          break;
        }
        
      } while (pageToken);
      
      console.log(`✅ Total messages to analyze: ${allMessages.length}`);
      return allMessages;
      
    } catch (error) {
      console.error('❌ Error fetching inbox messages:', error.message);
      throw error;
    }
  }

  /**
   * Get sender information for a batch of messages
   */
  async getSenderForMessages(messages) {
    const batchSize = 50; // Process in batches to avoid rate limits
    let processed = 0;
    
    for (let i = 0; i < messages.length; i += batchSize) {
      const batch = messages.slice(i, i + batchSize);
      
      // Rate limiting between batches
      if (i > 0) {
        await this.sleep(this.config.rateLimitDelay);
      }
      
      // Process batch in parallel
      await Promise.all(batch.map(async (message) => {
        try {
          const msg = await this.gmail.users.messages.get({
            userId: 'me',
            id: message.id,
            format: 'metadata',
            metadataHeaders: ['From']
          });
          
          const fromHeader = msg.data.payload.headers.find(h => h.name === 'From');
          if (fromHeader) {
            const email = this.extractEmailAddress(fromHeader.value);
            const currentCount = this.senderStats.get(email) || 0;
            this.senderStats.set(email, currentCount + 1);
          }
          
          this.totalEmailsProcessed++;
        } catch (error) {
          // Skip individual message errors
          console.warn(`⚠️ Could not get sender for message ${message.id}`);
        }
      }));
      
      processed += batch.length;
      console.log(`📊 Processed ${processed}/${messages.length} messages...`);
    }
  }

  /**
   * Generate sorted sender statistics
   */
  getSortedStats() {
    // Convert Map to array and sort by count (descending)
    const sortedStats = Array.from(this.senderStats.entries())
      .sort((a, b) => b[1] - a[1]);
    
    return sortedStats;
  }

  /**
   * Generate CSV content
   */
  generateCSV(sortedStats) {
    const timestamp = new Date().toISOString().split('T')[0];
    let csv = `Email Address,Email Count,Report Date\n`;
    
    sortedStats.forEach(([email, count]) => {
      // Escape emails that might contain commas
      const escapedEmail = email.includes(',') ? `"${email}"` : email;
      csv += `${escapedEmail},${count},${timestamp}\n`;
    });
    
    return csv;
  }

  /**
   * Create or update a private GitHub Gist for CSV storage
   */
  async saveToGist(csvContent) {
    if (!this.config.gistToken) {
      console.log('⚠️ GIST_TOKEN not configured. Skipping Gist storage.');
      return null;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `gmail-inbox-stats-${timestamp}.csv`;
    
    const gistData = {
      description: `Gmail Inbox Analytics Report - ${new Date().toLocaleDateString()}`,
      public: false, // PRIVATE gist - only you can see it
      files: {
        [filename]: {
          content: csvContent
        }
      }
    };

    return new Promise((resolve, reject) => {
      const data = JSON.stringify(gistData);
      
      const options = {
        hostname: 'api.github.com',
        port: 443,
        path: '/gists',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.gistToken}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Gmail-Analytics-Service',
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Length': Buffer.byteLength(data)
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode === 201) {
            const result = JSON.parse(body);
            console.log(`✅ CSV saved to private Gist: ${result.html_url}`);
            resolve(result);
          } else {
            console.error(`❌ Failed to create Gist: ${res.statusCode}`);
            console.error(body);
            resolve(null);
          }
        });
      });

      req.on('error', (error) => {
        console.error('❌ Error creating Gist:', error.message);
        resolve(null);
      });

      req.write(data);
      req.end();
    });
  }

  /**
   * Delete old gists (cleanup older than specified days)
   */
  async cleanupOldGists(daysToKeep = 7) {
    if (!this.config.gistToken) {
      return;
    }

    console.log(`🧹 Cleaning up gists older than ${daysToKeep} days...`);

    return new Promise((resolve) => {
      const options = {
        hostname: 'api.github.com',
        port: 443,
        path: '/gists',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.gistToken}`,
          'User-Agent': 'Gmail-Analytics-Service',
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', async () => {
          if (res.statusCode === 200) {
            const gists = JSON.parse(body);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
            
            // Find old gmail analytics gists
            const oldGists = gists.filter(gist => {
              const isGmailGist = gist.description && gist.description.includes('Gmail Inbox Analytics Report');
              const gistDate = new Date(gist.created_at);
              return isGmailGist && gistDate < cutoffDate;
            });

            // Delete old gists
            for (const gist of oldGists) {
              await this.deleteGist(gist.id);
              console.log(`🗑️ Deleted old gist: ${gist.id}`);
            }

            console.log(`✅ Cleaned up ${oldGists.length} old gists`);
          }
          resolve();
        });
      });

      req.on('error', () => resolve());
      req.end();
    });
  }

  /**
   * Delete a specific gist
   */
  async deleteGist(gistId) {
    return new Promise((resolve) => {
      const options = {
        hostname: 'api.github.com',
        port: 443,
        path: `/gists/${gistId}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.config.gistToken}`,
          'User-Agent': 'Gmail-Analytics-Service',
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      };

      const req = https.request(options, (res) => {
        res.on('data', () => {});
        res.on('end', () => resolve());
      });

      req.on('error', () => resolve());
      req.end();
    });
  }

  /**
   * Output results to GitHub Actions
   */
  outputToGitHubActions(sortedStats, gistUrl, newSendersToAdd, copyPasteList) {
    const timestamp = new Date().toISOString();
    const totalEmails = sortedStats.reduce((sum, [, count]) => sum + count, 0);
    const uniqueSenders = sortedStats.length;
    
    // Write to GITHUB_OUTPUT for use in subsequent steps
    const githubOutput = process.env.GITHUB_OUTPUT;
    if (githubOutput) {
      const fs = require('fs');
      fs.appendFileSync(githubOutput, `total_emails=${totalEmails}\n`);
      fs.appendFileSync(githubOutput, `unique_senders=${uniqueSenders}\n`);
      fs.appendFileSync(githubOutput, `report_date=${timestamp}\n`);
      fs.appendFileSync(githubOutput, `new_senders_count=${newSendersToAdd.length}\n`);
      if (gistUrl) {
        fs.appendFileSync(githubOutput, `gist_url=${gistUrl}\n`);
      }
    }

    // Write summary to GITHUB_STEP_SUMMARY
    const summaryFile = process.env.GITHUB_STEP_SUMMARY;
    if (summaryFile) {
      const fs = require('fs');
      
      let summary = `## 📊 Gmail Inbox Analytics Report\n\n`;
      summary += `**Report Generated:** ${timestamp}\n\n`;
      summary += `### 📈 Overview\n`;
      summary += `| Metric | Value |\n`;
      summary += `|--------|-------|\n`;
      summary += `| 📧 Total Emails in Inbox | ${totalEmails.toLocaleString()} |\n`;
      summary += `| 👥 Unique Senders | ${uniqueSenders.toLocaleString()} |\n`;
      summary += `| 🆕 New Senders to Add | ${newSendersToAdd.length} |\n`;
      summary += `| 📅 Report Date | ${new Date().toLocaleDateString()} |\n\n`;
      
      if (gistUrl) {
        summary += `### 📄 Full CSV Report\n`;
        summary += `🔒 **Private Gist:** [Download CSV](${gistUrl})\n\n`;
        summary += `> ⚠️ This link is private and only accessible to you when logged into GitHub.\n\n`;
      }

      // NEW SENDERS SECTION - Copy-paste ready
      if (newSendersToAdd.length > 0) {
        summary += `### 🆕 Senders NOT in Your Cleanup List\n\n`;
        summary += `These high-volume senders (≥${this.config.minEmailThreshold} emails) are **not yet** in your \`SENDER_EMAILS_LIST\`.\n\n`;
        
        summary += `#### 📋 Top ${Math.min(30, newSendersToAdd.length)} New Senders\n\n`;
        summary += `| Rank | Email Address | Count | Action |\n`;
        summary += `|------|---------------|-------|--------|\n`;
        
        const top30New = newSendersToAdd.slice(0, 30);
        top30New.forEach(([email, count], index) => {
          const category = this.categorizeEmail(email);
          summary += `| ${index + 1} | \`${email}\` | ${count} | ${category} |\n`;
        });
        
        if (newSendersToAdd.length > 30) {
          summary += `\n*... and ${newSendersToAdd.length - 30} more new senders*\n`;
        }

        // COPY-PASTE READY SECTION
        summary += `\n---\n\n`;
        summary += `### 📝 Copy-Paste Ready (Append to SENDER_EMAILS_LIST)\n\n`;
        summary += `**Top 20 new senders** - copy this and append to your variable:\n\n`;
        summary += `\`\`\`\n`;
        summary += `,${this.generateCopyPasteList(newSendersToAdd, 20)}\n`;
        summary += `\`\`\`\n\n`;
        
        summary += `**Top 50 new senders** - for aggressive cleanup:\n\n`;
        summary += `<details>\n<summary>Click to expand</summary>\n\n`;
        summary += `\`\`\`\n`;
        summary += `,${this.generateCopyPasteList(newSendersToAdd, 50)}\n`;
        summary += `\`\`\`\n\n`;
        summary += `</details>\n\n`;

        summary += `> 💡 **How to use:** Go to Settings → Variables → Actions → Edit \`SENDER_EMAILS_LIST\` → Paste at the end\n\n`;
        summary += `> ⚠️ **Review first!** Some senders might be important (bank statements, etc.)\n\n`;
      } else {
        summary += `### ✅ All High-Volume Senders Already in Cleanup List\n\n`;
        summary += `Great job! All senders with ≥${this.config.minEmailThreshold} emails are already in your \`SENDER_EMAILS_LIST\`.\n\n`;
      }
      
      summary += `### 🏆 Top 30 Senders by Email Count\n\n`;
      summary += `| Rank | Email Address | Count |\n`;
      summary += `|------|---------------|-------|\n`;
      
      // Show top 30 senders (masked for privacy in logs)
      const top30 = sortedStats.slice(0, 30);
      top30.forEach(([email, count], index) => {
        // Mask email for privacy in public summary
        const maskedEmail = this.maskEmail(email);
        summary += `| ${index + 1} | ${maskedEmail} | ${count} |\n`;
      });
      
      if (sortedStats.length > 30) {
        summary += `\n*... and ${sortedStats.length - 30} more senders in the full CSV report*\n`;
      }
      
      fs.appendFileSync(summaryFile, summary);
      console.log('📝 Summary written to GitHub Actions');
    }
  }

  /**
   * Categorize email for quick review
   */
  categorizeEmail(email) {
    const lowerEmail = email.toLowerCase();
    
    if (lowerEmail.includes('job') || lowerEmail.includes('career') || lowerEmail.includes('hire') || lowerEmail.includes('talent') || lowerEmail.includes('recruit')) {
      return '💼 Job';
    }
    if (lowerEmail.includes('newsletter') || lowerEmail.includes('news@') || lowerEmail.includes('update')) {
      return '📰 Newsletter';
    }
    if (lowerEmail.includes('noreply') || lowerEmail.includes('no-reply') || lowerEmail.includes('donotreply')) {
      return '🤖 Auto';
    }
    if (lowerEmail.includes('alert') || lowerEmail.includes('notification')) {
      return '🔔 Alert';
    }
    if (lowerEmail.includes('promo') || lowerEmail.includes('offer') || lowerEmail.includes('deal') || lowerEmail.includes('sale')) {
      return '🛒 Promo';
    }
    if (lowerEmail.includes('bank') || lowerEmail.includes('statement') || lowerEmail.includes('finance')) {
      return '🏦 Finance';
    }
    return '📧 Other';
  }

  /**
   * Mask email address for privacy (used in public summaries)
   * Example: shiva@example.com -> sh***@ex***.com
   */
  maskEmail(email) {
    const parts = email.split('@');
    if (parts.length !== 2) return '***';
    
    const [local, domain] = parts;
    const domainParts = domain.split('.');
    
    const maskedLocal = local.length > 2 
      ? local.substring(0, 2) + '***' 
      : local + '***';
    
    const maskedDomain = domainParts[0].length > 2
      ? domainParts[0].substring(0, 2) + '***'
      : domainParts[0] + '***';
    
    return `${maskedLocal}@${maskedDomain}.${domainParts.slice(1).join('.')}`;
  }

  /**
   * Run the complete analytics process
   */
  async runAnalytics() {
    try {
      console.log('🚀 Starting Gmail Inbox Analytics...');
      console.log(`📅 Current date: ${new Date().toLocaleString()}`);
      
      const startTime = new Date();
      
      // Get current cleanup list for comparison
      const currentCleanupList = this.getCurrentCleanupList();
      
      // Get all inbox messages
      const messages = await this.getAllInboxMessages();
      
      if (messages.length === 0) {
        console.log('📭 No messages found in inbox.');
        return;
      }
      
      // Analyze senders
      console.log('\n📊 Analyzing senders...');
      await this.getSenderForMessages(messages);
      
      // Get sorted statistics
      const sortedStats = this.getSortedStats();
      
      // Compare with current cleanup list
      const newSendersToAdd = this.getNewSendersToAdd(
        sortedStats, 
        currentCleanupList, 
        this.config.minEmailThreshold
      );
      
      // Generate copy-paste list
      const copyPasteList = this.generateCopyPasteList(newSendersToAdd, 50);
      
      // Generate CSV
      const csvContent = this.generateCSV(sortedStats);
      
      // Cleanup old gists before creating new one
      await this.cleanupOldGists(7);
      
      // Save to private Gist
      const gistResult = await this.saveToGist(csvContent);
      const gistUrl = gistResult ? gistResult.html_url : null;
      
      // Output to GitHub Actions (with new senders comparison)
      this.outputToGitHubActions(sortedStats, gistUrl, newSendersToAdd, copyPasteList);
      
      const endTime = new Date();
      const duration = Math.round((endTime - startTime) / 1000);
      
      // Print summary (with new senders comparison)
      this.printSummary(sortedStats, duration, gistUrl, newSendersToAdd, currentCleanupList);
      
      console.log('\n🎉 Gmail analytics completed successfully!');
      
    } catch (error) {
      console.error('❌ Gmail analytics failed:', error.message);
      throw error;
    }
  }

  /**
   * Print analytics summary
   */
  printSummary(sortedStats, duration, gistUrl, newSendersToAdd, currentCleanupList) {
    const totalEmails = sortedStats.reduce((sum, [, count]) => sum + count, 0);
    
    console.log('\n📊 INBOX ANALYTICS SUMMARY');
    console.log('=' .repeat(50));
    console.log(`📧 Total emails in inbox: ${totalEmails.toLocaleString()}`);
    console.log(`👥 Unique senders: ${sortedStats.length.toLocaleString()}`);
    console.log(`📋 Senders in cleanup list: ${currentCleanupList.size}`);
    console.log(`🆕 New senders to add: ${newSendersToAdd.length}`);
    console.log(`⏱️  Analysis duration: ${duration} seconds`);
    
    if (gistUrl) {
      console.log(`📄 CSV Report: ${gistUrl}`);
    }
    
    console.log('\n🏆 TOP 10 SENDERS BY EMAIL COUNT:');
    console.log('-'.repeat(50));
    
    const top10 = sortedStats.slice(0, 10);
    top10.forEach(([email, count], index) => {
      const inList = currentCleanupList.has(email.toLowerCase()) ? '✅' : '🆕';
      console.log(`${index + 1}. ${inList} ${email}: ${count} emails`);
    });
    
    if (sortedStats.length > 10) {
      console.log(`\n... and ${sortedStats.length - 10} more senders`);
    }

    // Print new senders to add
    if (newSendersToAdd.length > 0) {
      console.log('\n🆕 NEW SENDERS TO ADD (not in cleanup list):');
      console.log('-'.repeat(50));
      
      const top20New = newSendersToAdd.slice(0, 20);
      top20New.forEach(([email, count], index) => {
        console.log(`${index + 1}. ${email}: ${count} emails`);
      });
      
      if (newSendersToAdd.length > 20) {
        console.log(`\n... and ${newSendersToAdd.length - 20} more new senders`);
      }

      console.log('\n📝 COPY-PASTE READY (append to SENDER_EMAILS_LIST):');
      console.log('-'.repeat(50));
      console.log(`,${this.generateCopyPasteList(newSendersToAdd, 20)}`);
      console.log('-'.repeat(50));
    } else {
      console.log('\n✅ All high-volume senders already in cleanup list!');
    }
  }
}

// Main execution
async function main() {
  const analyticsService = new GmailAnalyticsService();
  
  try {
    await analyticsService.initialize();
    await analyticsService.runAnalytics();
    process.exit(0);
  } catch (error) {
    console.error('💥 Gmail analytics failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = GmailAnalyticsService;
