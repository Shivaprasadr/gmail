# Gmail Email Cleanup - Setup Guide

This guide will help you set up the Gmail Email Cleanup system for your own repository.

## 🚀 Quick Setup (5 minutes)

### Step 1: Fork/Copy the Repository
1. Fork this repository or copy the `email-cleanup` folder to your repository
2. Ensure you have the `.github/workflows/email-cleanup.yml` file

### Step 2: Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the Gmail API
4. Create OAuth2 credentials (Desktop application type)
5. Generate a refresh token for your Gmail account

**Quick Auth Setup:**
```bash
cd email-cleanup
npm install
npm run setup
```

### Step 3: Configure GitHub Repository

#### Required Secrets (Settings → Secrets and variables → Actions → Secrets):
- `GMAIL_CLIENT_ID`: Your Google OAuth2 Client ID
- `GMAIL_CLIENT_SECRET`: Your Google OAuth2 Client Secret  
- `GMAIL_REFRESH_TOKEN`: Your Gmail refresh token

#### Sender List Configuration (Choose one option):

**Option A: Public Sender List (Repository Variables)**
- Go to Settings → Secrets and variables → Actions → Variables
- Add variable: `SENDER_EMAILS_LIST`
- Value: `email1@example.com,email2@example.com,email3@example.com`

**Option B: Private Sender List (Repository Secrets)**
- Go to Settings → Secrets and variables → Actions → Secrets
- Add secret: `SENDER_EMAILS_LIST`  
- Value: `email1@example.com,email2@example.com,email3@example.com`

### Step 4: Test the Setup
1. Go to Actions tab → Gmail Email Cleanup workflow
2. Click "Run workflow"
3. Enable "Dry run mode" 
4. Click "Run workflow"
5. Check the logs to verify it works

## 🎯 Usage Options

### 1. Automated Daily Cleanup
- Runs automatically at 2 AM UTC daily
- Uses your configured `SENDER_EMAILS_LIST`
- Deletes emails older than 5 days (configurable)

### 2. Manual Cleanup with Custom Settings

#### Manual Trigger Options:
- **Sender emails**: `user@company1.com,alerts@company2.com,news@site3.com`
- **Days old**: `7` (delete emails older than 7 days)
- **Dry run**: `true` (test mode, no actual deletions)
- **Max emails per sender**: `50` (safety limit)

#### Example Manual Usage:
```
Sender emails: marketing@store.com,alerts@jobsite.com
Days old: 10
Dry run: false
Max emails per sender: 200
```

### 3. One-time Cleanup for Specific Senders
```
Sender emails: old-newsletter@company.com
Days old: 1
Dry run: false
Max emails per sender: 1000
```

## 📋 Configuration Examples

### For Job Seekers:
```
SENDER_EMAILS_LIST=noreply@indeed.com,jobs@linkedin.com,alerts@glassdoor.com,careers@monster.com
```

### For Newsletter Cleanup:
```  
SENDER_EMAILS_LIST=newsletter@company1.com,marketing@store2.com,updates@service3.com
```

### For Promotional Emails:
```
SENDER_EMAILS_LIST=deals@retailer.com,offers@brand.com,sale@shop.com
```

## 🔒 Security & Privacy

### Why Use Repository Variables vs Secrets:

**Use Variables (Public) when:**
- Your sender list doesn't contain sensitive information
- You want other repository contributors to see the configuration
- The email addresses are already publicly known

**Use Secrets (Private) when:**
- Your sender list contains personal or sensitive email addresses
- You want to keep your email cleanup strategy private
- You're concerned about privacy

### Best Practices:
- Always test with dry-run mode first
- Start with small batches (low max emails per sender)
- Monitor the cleanup results
- Keep your OAuth tokens secure
- Emails are moved to trash (recoverable for 30 days)

## ⚙️ Advanced Configuration

### Environment Variables Available:
- `SENDER_EMAILS_LIST`: Comma-separated list of sender emails
- `CLEANUP_DAYS_OLD`: Number of days old (default: 5)
- `MAX_EMAILS_PER_SENDER`: Safety limit per sender (default: 100)
- `DRY_RUN`: Test mode without deletions (default: false)
- `MAX_RESULTS_PER_QUERY`: Gmail API query limit (default: 100)
- `RATE_LIMIT_DELAY_MS`: Delay between API calls (default: 1000)

### Customizing the Schedule:
Edit `.github/workflows/email-cleanup.yml`:
```yaml
schedule:
  - cron: '0 2 * * *'  # Daily at 2 AM UTC
  # - cron: '0 2 * * 1'  # Weekly on Mondays
  # - cron: '0 2 1 * *'  # Monthly on 1st day
```

## 🛠️ Local Development

For local testing and development:

1. **Create `.env` file:**
```bash
GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret
GMAIL_REFRESH_TOKEN=your_refresh_token
SENDER_EMAILS_LIST=test@example.com,demo@test.com
CLEANUP_DAYS_OLD=5
DRY_RUN=true
```

2. **Run locally:**
```bash
cd email-cleanup
npm install
npm start
```

3. **Validate configuration:**
```bash
npm run validate-config
```

## 📊 Understanding the Output

### Console Output Explanation:
```
🚀 Starting Gmail email cleanup process...
📧 Processing emails from: marketing@store.com
📊 Found 25 emails from marketing@store.com to delete
✅ Successfully deleted 25/25 emails from marketing@store.com

📊 CLEANUP SUMMARY
==================================================
📧 Total emails found: 150        # Total emails matched
🗑️  Total emails deleted: 148     # Successfully processed
⚠️  Total errors: 2              # API errors encountered
✅ Success rate: 98%             # Deletion success rate
⏱️  Duration: 45 seconds         # Total execution time

📋 DELETIONS BY SENDER:
📧 marketing@store.com: 25/25 deleted
📧 jobs@site.com: 18/18 deleted
```

## 🚨 Troubleshooting

### Common Issues:

1. **"No sender configuration found"**
   - Add `SENDER_EMAILS_LIST` to repository variables or secrets
   - Or provide manual sender list in workflow input

2. **"Missing required Gmail API credentials"**
   - Verify all three secrets are set: `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`
   - Ensure there are no extra spaces in the secret values

3. **"Authentication failed"**
   - Refresh token may have expired, re-run the setup process
   - Verify Gmail API is enabled in Google Cloud Console

4. **Rate limit errors**
   - Reduce `MAX_EMAILS_PER_SENDER` value
   - Increase `RATE_LIMIT_DELAY_MS` value

### Getting Help:
1. Enable dry-run mode to test safely
2. Check GitHub Actions logs for detailed error messages  
3. Validate your configuration with `npm run validate-config`
4. Start with a small sender list and low limits

## 📝 Tips for Success

1. **Start Small**: Begin with 1-2 senders and dry-run mode
2. **Test First**: Always use dry-run before real cleanup
3. **Monitor Results**: Check the logs after each run
4. **Gradual Limits**: Increase limits gradually as you gain confidence
5. **Regular Review**: Periodically review and update your sender list

---

**⚠️ Safety Reminder**: Emails are moved to trash, not permanently deleted. They can be recovered from Gmail trash within 30 days. Always test with dry-run mode first!
