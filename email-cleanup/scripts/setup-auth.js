#!/usr/bin/env node

/**
 * Gmail API Setup and Authentication Helper
 * 
 * This script helps set up Gmail API authentication and generates
 * the required tokens for the cleanup system.
 */

const { google } = require('googleapis');
const readline = require('readline');

class GmailAuthSetup {
  constructor() {
    this.oauth2Client = null;
  }

  /**
   * Get OAuth2 credentials from user input
   */
  async getCredentials() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (prompt) => {
      return new Promise((resolve) => {
        rl.question(prompt, resolve);
      });
    };

    console.log('🔐 Gmail API Authentication Setup');
    console.log('=================================\n');
    
    console.log('Before proceeding, ensure you have:');
    console.log('1. ✅ Created a Google Cloud Project');
    console.log('2. ✅ Enabled the Gmail API');
    console.log('3. ✅ Created OAuth2 credentials (Client ID and Client Secret)');
    console.log('4. ✅ Added your email to test users (if in testing mode)\n');

    const clientId = await question('Enter your Gmail Client ID: ');
    const clientSecret = await question('Enter your Gmail Client Secret: ');

    rl.close();

    if (!clientId || !clientSecret) {
      throw new Error('Client ID and Client Secret are required');
    }

    return { clientId, clientSecret };
  }

  /**
   * Generate authorization URL
   */
  generateAuthUrl(clientId, clientSecret) {
    this.oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'urn:ietf:wg:oauth:2.0:oob' // For installed applications
    );

    const scopes = [
      'https://www.googleapis.com/auth/gmail.modify'
    ];

    const authUrl = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent' // Force consent screen to get refresh token
    });

    return authUrl;
  }

  /**
   * Exchange authorization code for tokens
   */
  async getTokens(authCode) {
    try {
      const { tokens } = await this.oauth2Client.getToken(authCode);
      return tokens;
    } catch (error) {
      throw new Error(`Failed to exchange authorization code: ${error.message}`);
    }
  }

  /**
   * Test the authentication with a simple API call
   */
  async testAuthentication(tokens) {
    try {
      this.oauth2Client.setCredentials(tokens);
      const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
      
      const profile = await gmail.users.getProfile({ userId: 'me' });
      return profile.data;
    } catch (error) {
      throw new Error(`Authentication test failed: ${error.message}`);
    }
  }

  /**
   * Main setup process
   */
  async setup() {
    try {
      // Get credentials from user
      const { clientId, clientSecret } = await this.getCredentials();

      // Generate authorization URL
      const authUrl = this.generateAuthUrl(clientId, clientSecret);

      console.log('\n🌐 AUTHORIZATION REQUIRED');
      console.log('=========================');
      console.log('1. Open the following URL in your browser:');
      console.log(`\n${authUrl}\n`);
      console.log('2. Sign in with your Gmail account');
      console.log('3. Grant the requested permissions');
      console.log('4. Copy the authorization code from the browser');

      // Get authorization code from user
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const authCode = await new Promise((resolve) => {
        rl.question('\n🔑 Enter the authorization code: ', resolve);
      });

      rl.close();

      if (!authCode) {
        throw new Error('Authorization code is required');
      }

      console.log('\n🔄 Exchanging authorization code for tokens...');

      // Exchange code for tokens
      const tokens = await this.getTokens(authCode);

      if (!tokens.refresh_token) {
        console.log('\n⚠️  WARNING: No refresh token received!');
        console.log('This usually happens if you\'ve previously authorized this application.');
        console.log('To get a refresh token, you may need to:');
        console.log('1. Revoke access in your Google Account settings');
        console.log('2. Run this setup again');
        throw new Error('No refresh token received');
      }

      console.log('\n🧪 Testing authentication...');

      // Test authentication
      const profile = await this.testAuthentication(tokens);

      console.log('\n✅ AUTHENTICATION SUCCESSFUL!');
      console.log('=============================');
      console.log(`📧 Gmail account: ${profile.emailAddress}`);
      console.log(`📊 Total messages: ${profile.messagesTotal}`);
      console.log(`🧵 Total threads: ${profile.threadsTotal}`);

      console.log('\n🔐 CREDENTIALS FOR GITHUB SECRETS');
      console.log('==================================');
      console.log(`GMAIL_CLIENT_ID=${clientId}`);
      console.log(`GMAIL_CLIENT_SECRET=${clientSecret}`);
      console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);

      console.log('\n📋 NEXT STEPS');
      console.log('=============');
      console.log('1. Add the above credentials as GitHub repository secrets');
      console.log('2. Go to your repository → Settings → Secrets and variables → Actions');
      console.log('3. Add each credential as a new repository secret');
      console.log('4. Ensure the secret names match exactly as shown above');
      console.log('5. Test the workflow by running it manually from GitHub Actions');

      console.log('\n🛡️  SECURITY NOTES');
      console.log('==================');
      console.log('- Keep these credentials secure and never commit them to your repository');
      console.log('- The refresh token allows persistent access to your Gmail account');
      console.log('- You can revoke access anytime in your Google Account settings');
      console.log('- Monitor the cleanup logs to ensure the system works as expected');

    } catch (error) {
      console.error('\n❌ SETUP FAILED');
      console.error('===============');
      console.error(`Error: ${error.message}`);
      
      console.log('\n🔧 TROUBLESHOOTING');
      console.log('==================');
      console.log('- Ensure Gmail API is enabled in Google Cloud Console');
      console.log('- Verify OAuth2 credentials are correct');
      console.log('- Make sure OAuth consent screen is configured');
      console.log('- Check that your email is added to test users (if in testing mode)');
      console.log('- Try generating new OAuth2 credentials if issues persist');
      
      process.exit(1);
    }
  }
}

// Run setup if called directly
if (require.main === module) {
  const setup = new GmailAuthSetup();
  setup.setup().then(() => {
    console.log('\n🎉 Setup completed successfully!');
    process.exit(0);
  }).catch((error) => {
    console.error('Setup failed:', error.message);
    process.exit(1);
  });
}

module.exports = GmailAuthSetup;
