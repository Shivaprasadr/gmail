# 🔑 Gmail API Setup Guide

## Complete Guide: Getting Gmail API Credentials

### Step 1: Create Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "Select a project" → "New Project"
   - Name: `Gmail Automation` (or any name you prefer)
   - Click "Create"

3. **Enable Gmail API**
   - Go to "APIs & Services" → "Library"
   - Search for "Gmail API"
   - Click on "Gmail API" → "Enable"

### Step 2: Create OAuth2 Credentials

1. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" → "Create"
   - Fill required fields:
     - App name: `Gmail Cleanup Tool`
     - User support email: Your email
     - Developer contact: Your email
   - Click "Save and Continue"

2. **Add Scopes**
   - Click "Add or Remove Scopes"
   - Add: `https://www.googleapis.com/auth/gmail.modify`
   - Click "Save and Continue"

3. **Add Test Users**
   - Add your Gmail address as a test user
   - Click "Save and Continue"

### Step 3: Create OAuth2 Client

1. **Create Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "+ Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: `Gmail Cleanup Client`

2. **Configure Redirect URIs**
   - Add authorized redirect URIs:
     - `http://localhost:3000/oauth2callback`
     - `https://developers.google.com/oauthplayground`
   - Click "Create"

3. **Save Your Credentials**
   - Copy the **Client ID** and **Client Secret**
   - Keep these secure!

### Step 4: Generate Refresh Token

**Method 1: Using OAuth2 Playground (Recommended)**

1. **Go to OAuth2 Playground**
   - Visit: https://developers.google.com/oauthplayground

2. **Configure Settings**
   - Click the gear icon (⚙️) in top-right
   - Check "Use your own OAuth credentials"
   - Enter your Client ID and Client Secret
   - Close settings

3. **Authorize APIs**
   - In "Step 1", find "Gmail API v1"
   - Select: `https://www.googleapis.com/auth/gmail.modify`
   - Click "Authorize APIs"

4. **Sign In & Authorize**
   - Sign in with your Gmail account
   - Click "Allow" to grant permissions

5. **Get Refresh Token**
   - Click "Exchange authorization code for tokens"
   - Copy the **refresh_token** value
   - Keep this secure!

**Method 2: Using Node.js Script**

Create `get-tokens.js`:
```javascript
const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Visit this URL:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Refresh Token:', tokens.refresh_token);
    console.log('Access Token:', tokens.access_token);
  } catch (error) {
    console.error('Error getting tokens:', error);
  }
  rl.close();
});
```

Run with:
```bash
npm install googleapis
node get-tokens.js
```

### Step 5: Configure GitHub Repository

1. **Go to Repository Settings**
   - Your GitHub repo → Settings → Secrets and variables → Actions

2. **Add Repository Secrets**
   ```
   GMAIL_CLIENT_ID = your-client-id-here
   GMAIL_CLIENT_SECRET = your-client-secret-here  
   GMAIL_REFRESH_TOKEN = your-refresh-token-here
   ```

3. **Add Repository Variable (Optional)**
   ```
   SENDER_EMAILS = email1@domain.com,email2@domain.com
   ```

### Step 6: Test Your Setup

1. **Test Locally**
   ```bash
   cd email-cleanup
   npm install
   node gmail-cleanup.js
   ```

2. **Test with GitHub Actions**
   - Go to Actions tab → "Gmail Email Cleanup"
   - Click "Run workflow"
   - Use dry run mode first: `dry_run: true`

## 🔒 Security Best Practices

### What to Keep Secret ⚠️
- **Client Secret** (never share publicly)
- **Refresh Token** (gives access to your Gmail)
- **Access Token** (temporary but sensitive)

### What's Safe to Share ✅
- **Client ID** (already visible in OAuth flows)
- **Project ID** (not sensitive)
- **Error messages** (after removing tokens)

### Repository Security
- Always use GitHub Secrets for sensitive data
- Use GitHub Variables for non-sensitive configuration
- Never commit credentials to git
- Use `.gitignore` for local config files

## 🛠️ Troubleshooting

### Common Issues

**"invalid_client" Error**
- Check Client ID and Secret are correct
- Ensure OAuth consent screen is configured
- Verify redirect URIs match exactly

**"invalid_grant" Error**
- Refresh token expired (regenerate)
- Clock synchronization issues
- Wrong Google account used

**"access_denied" Error**
- Check Gmail API is enabled
- Verify correct scopes granted
- Ensure test user is added (for external apps)

**"insufficient_scope" Error**
- Missing Gmail API scopes
- Re-authorize with correct permissions
- Check `gmail.modify` scope is included

### Getting Help

1. **Check Google Cloud Console**
   - API quotas and usage
   - Error logs and metrics
   - OAuth consent screen status

2. **Verify Setup**
   - [ ] Google Cloud project created
   - [ ] Gmail API enabled  
   - [ ] OAuth consent configured
   - [ ] Client credentials created
   - [ ] Refresh token generated
   - [ ] GitHub secrets set

3. **Test Components**
   ```bash
   # Test API access
   curl -H "Authorization: Bearer $ACCESS_TOKEN" \
        https://gmail.googleapis.com/gmail/v1/users/me/profile
   
   # Test refresh token
   curl -d "client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&refresh_token=$REFRESH_TOKEN&grant_type=refresh_token" \
        https://oauth2.googleapis.com/token
   ```

## 🎯 Next Steps

After completing this setup:

1. **Configure your sender list** in GitHub Variables or Secrets
2. **Test with dry run mode** to verify everything works
3. **Enable automated cleanup** by setting `dry_run: false`
4. **Monitor GitHub Actions logs** for successful runs
5. **Customize schedule and limits** as needed

Your Gmail API credentials will now work with the automated email cleanup system! 🎉
