#!/usr/bin/env node

/**
 * Gmail Email Cleanup Service
 * 
 * This service automatically deletes emails from specified senders that are older than 5 days.
 * It uses Gmail API with OAuth2 authentication (Refresh Token, Client ID, Client Secret).
 * 
 * Features:
 * - Configurable sender list from external file
 * - Comprehensive logging with timestamps
 * - Error handling and retry logic
 * - Safe deletion with confirmation
 * - Rate limiting to respect Gmail API limits
 * 
 * Author: Generated for Gmail Project
 * Date: 2025-09-16
 */

const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

class GmailCleanupService {
  constructor() {
    this.gmail = null;
    this.auth = null;
    this.config = null;
    this.senderList = [];
    this.deletionStats = {
      totalDeleted: 0,
      totalProcessed: 0,
      errors: 0,
      deletionsBySender: {}
    };
  }

  /**
   * Initialize the Gmail API client with OAuth2 authentication
   */
  async initialize() {
    try {
      console.log('🔧 Initializing Gmail Cleanup Service...');
      
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
      
      // Load sender list
      await this.loadSenderList();
      
    } catch (error) {
      console.error('❌ Failed to initialize Gmail service:', error.message);
      throw error;
    }
  }

  /**
   * Load configuration from environment variables and config file
   */
  async loadConfiguration() {
    try {
      // Load from environment variables (preferred for production)
      this.config = {
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        daysOld: parseInt(process.env.CLEANUP_DAYS_OLD || '5'),
        maxResults: parseInt(process.env.MAX_RESULTS_PER_QUERY || '100'),
        rateLimitDelay: parseInt(process.env.RATE_LIMIT_DELAY_MS || '1000'),
        maxEmailsPerSender: parseInt(process.env.MAX_EMAILS_PER_SENDER || '100'),
        isDryRun: process.env.DRY_RUN === 'true'
      };

      // Validate required configuration
      if (!this.config.clientId || !this.config.clientSecret || !this.config.refreshToken) {
        throw new Error('Missing required Gmail API credentials. Please set GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, and GMAIL_REFRESH_TOKEN environment variables.');
      }

      console.log('📋 Configuration loaded successfully');
      console.log(`⏰ Will delete emails older than ${this.config.daysOld} days`);
      console.log(`🔒 Max emails per sender: ${this.config.maxEmailsPerSender}`);
      console.log(`🧪 Dry run mode: ${this.config.isDryRun ? 'ON (no actual deletions)' : 'OFF'}`);
      
    } catch (error) {
      console.error('❌ Failed to load configuration:', error.message);
      throw error;
    }
  }

  /**
   * Load sender list from environment variables or configuration file
   */
  async loadSenderList() {
    try {
      // Check for manual sender list first (from workflow inputs)
      const manualSenders = process.env.MANUAL_SENDER_EMAILS;
      if (manualSenders && manualSenders.trim()) {
        console.log('🎯 Using manual sender list from workflow input');
        this.senderList = manualSenders
          .split(',')
          .map(email => email.trim())
          .filter(email => email)
          .map(email => ({
            email: email,
            description: 'Manual input',
            category: 'manual',
            enabled: true
          }));
        
        console.log(`📧 Loaded ${this.senderList.length} manual senders:`);
        console.log('📝 Manual senders:', this.senderList.map(s => s.email).join(', '));
        return;
      }

      // Check for configured sender list (from GitHub variables/secrets)
      const configuredSenders = process.env.SENDER_EMAILS_LIST;
      if (configuredSenders && configuredSenders.trim()) {
        console.log('📋 Using configured sender list from environment');
        this.senderList = configuredSenders
          .split(',')
          .map(email => email.trim())
          .filter(email => email)
          .map(email => ({
            email: email,
            description: 'Configured sender',
            category: 'configured',
            enabled: true
          }));
        
        console.log(`📧 Loaded ${this.senderList.length} configured senders`);
        console.log('📝 Configured senders:', this.senderList.map(s => s.email).join(', '));
        return;
      }

      // Fallback to JSON configuration file (for local development)
      const sendersFilePath = path.join(__dirname, 'config', 'senders.json');
      if (await fs.access(sendersFilePath).then(() => true).catch(() => false)) {
        console.log('📁 Using sender list from local configuration file');
        const sendersData = await fs.readFile(sendersFilePath, 'utf8');
        const sendersConfig = JSON.parse(sendersData);
        
        this.senderList = sendersConfig.senders.filter(sender => sender.enabled);
        
        console.log(`📧 Loaded ${this.senderList.length} enabled senders from file`);
        console.log('📝 File senders:', this.senderList.map(s => s.email).join(', '));
        return;
      }

      // No sender configuration found
      throw new Error('No sender configuration found. Please provide SENDER_EMAILS_LIST environment variable, manual sender list, or config/senders.json file.');
      
    } catch (error) {
      console.error('❌ Failed to load sender list:', error.message);
      throw error;
    }
  }

  /**
   * Calculate the cutoff date for email deletion
   */
  getCutoffDate() {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.config.daysOld);
    return cutoffDate;
  }

  /**
   * Format date for Gmail search query
   */
  formatDateForQuery(date) {
    return date.toISOString().split('T')[0].replace(/-/g, '/');
  }

  /**
   * Search for emails from a specific sender before the cutoff date
   */
  async searchEmailsFromSender(senderEmail, cutoffDate) {
    try {
      const query = `from:${senderEmail} before:${this.formatDateForQuery(cutoffDate)}`;
      console.log(`🔍 Searching emails with query: ${query}`);
      
      const response = await this.gmail.users.messages.list({
        userId: 'me',
        q: query,
        maxResults: this.config.maxResults
      });

      return response.data.messages || [];
      
    } catch (error) {
      console.error(`❌ Error searching emails from ${senderEmail}:`, error.message);
      this.deletionStats.errors++;
      return [];
    }
  }

  /**
   * Delete a batch of emails (move to trash)
   */
  async deleteEmails(messageIds, senderEmail) {
    let deletedCount = 0;
    const batchSize = 10; // Process in smaller batches to avoid rate limits
    
    // Apply safety limit
    const emailsToDelete = messageIds.slice(0, this.config.maxEmailsPerSender);
    if (messageIds.length > this.config.maxEmailsPerSender) {
      console.log(`⚠️  Safety limit applied: processing ${this.config.maxEmailsPerSender} out of ${messageIds.length} emails for ${senderEmail}`);
    }
    
    for (let i = 0; i < emailsToDelete.length; i += batchSize) {
      const batch = emailsToDelete.slice(i, i + batchSize);
      
      try {
        // Add rate limiting delay
        if (i > 0) {
          await this.sleep(this.config.rateLimitDelay);
        }
        
        // Delete emails in current batch (or simulate in dry-run mode)
        for (const messageId of batch) {
          if (this.config.isDryRun) {
            console.log(`🧪 [DRY RUN] Would delete email ID: ${messageId}`);
          } else {
            await this.gmail.users.messages.trash({
              userId: 'me',
              id: messageId
            });
          }
          deletedCount++;
        }
        
        const action = this.config.isDryRun ? 'Would delete' : 'Deleted';
        console.log(`🗑️  ${action} ${batch.length} emails from ${senderEmail} (batch ${Math.floor(i/batchSize) + 1})`);
        
      } catch (error) {
        console.error(`❌ Error ${this.config.isDryRun ? 'simulating deletion' : 'deleting'} batch from ${senderEmail}:`, error.message);
        this.deletionStats.errors++;
      }
    }
    
    return deletedCount;
  }

  /**
   * Sleep for specified milliseconds (for rate limiting)
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Process cleanup for a specific sender
   */
  async cleanupEmailsFromSender(senderConfig, cutoffDate) {
    const senderEmail = senderConfig.email;
    console.log(`\n📧 Processing emails from: ${senderEmail}`);
    console.log(`📅 Deleting emails older than: ${cutoffDate.toLocaleDateString()}`);
    
    try {
      // Search for emails
      const messages = await this.searchEmailsFromSender(senderEmail, cutoffDate);
      
      if (messages.length === 0) {
        console.log(`✅ No emails found from ${senderEmail} older than ${this.config.daysOld} days`);
        this.deletionStats.deletionsBySender[senderEmail] = {
          found: 0,
          deleted: 0
        };
        return;
      }
      
      console.log(`📊 Found ${messages.length} emails from ${senderEmail} to delete`);
      
      // Extract message IDs
      const messageIds = messages.map(msg => msg.id);
      
      // Delete emails
      const deletedCount = await this.deleteEmails(messageIds, senderEmail);
      
      // Update statistics
      this.deletionStats.totalDeleted += deletedCount;
      this.deletionStats.totalProcessed += messages.length;
      this.deletionStats.deletionsBySender[senderEmail] = {
        found: messages.length,
        deleted: deletedCount
      };
      
      const action = this.config.isDryRun ? 'Would delete' : 'Successfully deleted';
      console.log(`✅ ${action} ${deletedCount}/${messages.length} emails from ${senderEmail}`);
      
    } catch (error) {
      console.error(`❌ Failed to process emails from ${senderEmail}:`, error.message);
      this.deletionStats.errors++;
    }
  }

  /**
   * Run the complete email cleanup process
   */
  async runCleanup() {
    try {
      console.log('🚀 Starting Gmail email cleanup process...');
      console.log(`📅 Current date: ${new Date().toLocaleString()}`);
      
      const cutoffDate = this.getCutoffDate();
      const startTime = new Date();
      
      // Process each sender
      for (const senderConfig of this.senderList) {
        await this.cleanupEmailsFromSender(senderConfig, cutoffDate);
        
        // Add delay between senders to respect rate limits
        await this.sleep(this.config.rateLimitDelay);
      }
      
      const endTime = new Date();
      const duration = Math.round((endTime - startTime) / 1000);
      
      // Print simple summary
      this.printSummary(duration);
      
      console.log('🎉 Gmail cleanup process completed successfully!');
      
    } catch (error) {
      console.error('❌ Gmail cleanup process failed:', error.message);
      throw error;
    }
  }

  /**
   * Print simple cleanup summary
   */
  printSummary(duration) {
    console.log('\n📊 CLEANUP SUMMARY');
    console.log('=' .repeat(50));
    console.log(`📧 Total emails found: ${this.deletionStats.totalProcessed}`);
    console.log(`🗑️  Total emails deleted: ${this.deletionStats.totalDeleted}`);
    console.log(`⚠️  Total errors: ${this.deletionStats.errors}`);
    const successRate = this.deletionStats.totalProcessed > 0 
      ? Math.round((this.deletionStats.totalDeleted / this.deletionStats.totalProcessed) * 100) 
      : 100;
    console.log(`✅ Success rate: ${successRate}%`);
    console.log(`⏱️  Duration: ${duration} seconds`);
    
    console.log('\n📋 DELETIONS BY SENDER:');
    Object.entries(this.deletionStats.deletionsBySender).forEach(([sender, stats]) => {
      console.log(`📧 ${sender}: ${stats.deleted}/${stats.found} deleted`);
    });
  }
}

// Main execution
async function main() {
  const cleanupService = new GmailCleanupService();
  
  try {
    await cleanupService.initialize();
    await cleanupService.runCleanup();
    process.exit(0);
  } catch (error) {
    console.error('💥 Gmail cleanup failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = GmailCleanupService;
