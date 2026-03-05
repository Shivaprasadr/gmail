# Gmail Inbox Analytics Setup Guide

This guide explains how to set up and use the Gmail Inbox Analytics feature to get a complete list of all senders in your inbox with email counts.

## 📋 Overview

The analytics feature scans your Gmail inbox and generates:
- Complete list of all sender email addresses
- Number of emails from each sender
- CSV report sorted by email count (descending)
- Private storage in GitHub Gists (only you can access)

## 🔧 Prerequisites

Before using analytics, ensure you have:
1. ✅ Gmail API credentials configured (same as cleanup)
2. ✅ `GMAIL_CLIENT_ID` secret set
3. ✅ `GMAIL_CLIENT_SECRET` secret set
4. ✅ `GMAIL_REFRESH_TOKEN` secret set

## 🔑 Additional Setup: GIST_TOKEN

The analytics feature saves CSV reports to **private GitHub Gists**. This requires a separate token.

### Why Private Gists?

- ✅ **Free storage** - No cost for GitHub Gists
- ✅ **Private by default** - Only you can see the reports
- ✅ **Auto-cleanup** - Old reports deleted automatically
- ✅ **Easy access** - Direct links in workflow output
- ✅ **No repo pollution** - Reports don't clutter your repository

### Creating the GIST_TOKEN

1. **Go to GitHub Token Settings**
   - Visit: https://github.com/settings/tokens
   - Or: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token**
   - Click **"Generate new token (classic)"**
   - Note: `Gmail Analytics - Gist Access`
   - Expiration: Choose based on your preference (90 days, 1 year, or no expiration)
   - **Select scope**: ✅ `gist` (Create gists)
   - Click **"Generate token"**

3. **Copy the Token**
   - ⚠️ Copy immediately - you won't see it again!

4. **Add to Repository Secrets**
   - Go to your repository → **Settings** → **Secrets and variables** → **Actions**
   - Click **"New repository secret"**
   - Name: `GIST_TOKEN`
   - Value: Paste your token
   - Click **"Add secret"**

## 🚀 Running Analytics

### Automatic Execution

The analytics workflow runs automatically:
- **After cleanup**: Triggers when Gmail Email Cleanup completes successfully
- **Weekly**: Every Sunday at 3 AM UTC

### Manual Execution

1. Go to **Actions** tab in your repository
2. Click **"Gmail Inbox Analytics"** workflow
3. Click **"Run workflow"** dropdown
4. Configure options:
   - **Max pages**: Pages to scan (500 emails/page, default: 20 = ~10,000 emails)
   - **Cleanup old gists**: Days to keep reports (default: 7)
5. Click **"Run workflow"**

## 📊 Understanding the Output

### Workflow Summary (Actions Tab)

After completion, the workflow shows:
- **Total Emails**: Number of emails analyzed
- **Unique Senders**: How many different senders found
- **Top 30 Senders**: Ranked list (emails masked for privacy in logs)

### Full CSV Report (Private Gist)

Click the **"Private CSV Report"** link to access:
- Full email addresses (not masked)
- Complete sender list
- Email counts per sender

**CSV Format:**
```csv
Email Address,Email Count,Report Date
newsletter@company.com,523,2026-03-05
alerts@service.com,412,2026-03-05
notifications@app.com,298,2026-03-05
```

## 🔒 Privacy & Security

### Who Can See the Reports?

| Location | Visibility |
|----------|------------|
| Workflow logs | Public (emails masked) |
| CSV in Gist | Private (only you) |
| Workflow outputs | Public (counts only) |

### Email Masking

In public workflow logs, emails are masked:
- `shiva@example.com` → `sh***@ex***.com`
- Full addresses only in private Gist

### Access Control

- Private Gists require GitHub login
- Only the Gist creator can see private Gists
- Even with the URL, others cannot access without your credentials

## 🧹 Automatic Cleanup

### Old Report Deletion

The workflow automatically deletes Gist reports older than 7 days (configurable):
- Prevents accumulation of old reports
- Keeps your Gist list clean
- Only deletes reports created by this workflow

### Configuring Retention

Set `cleanup_old_gists` when running manually:
- `7` = Keep last week's reports
- `14` = Keep last two weeks
- `30` = Keep last month

## 💡 Use Cases

### 1. Discover High-Volume Senders

Find which senders flood your inbox:
1. Run analytics
2. Open CSV report
3. Top senders = most emails
4. Decide which to add to cleanup list

### 2. Add Senders to Cleanup List

Use analytics to build your cleanup list:
1. Run analytics
2. Open CSV, find unwanted senders
3. Copy email addresses
4. Add to `SENDER_EMAILS_LIST` variable:
   ```
   newsletter@spam.com,alerts@noisy.com,promotions@store.com
   ```

### 3. Track Inbox Health

Monitor your inbox over time:
- Compare total emails week-to-week
- See if cleanup is effective
- Identify new high-volume senders

### 4. One-Time Deep Analysis

Analyze your full inbox:
1. Set `max_pages` to higher value (e.g., 50)
2. Run manually
3. Get comprehensive sender list
4. Plan cleanup strategy

## ⚠️ Troubleshooting

### "GIST_TOKEN not configured"

**Cause**: Missing or invalid GIST_TOKEN secret

**Fix**: 
1. Verify token is created with `gist` scope
2. Check secret name is exactly `GIST_TOKEN`
3. Regenerate token if expired

### "Failed to create Gist"

**Cause**: Token permissions issue

**Fix**:
1. Ensure token has `gist` scope
2. Token may have expired - regenerate
3. Check API rate limits

### Analytics Timeout

**Cause**: Too many emails to process

**Fix**:
1. Reduce `max_pages` to smaller number
2. Run during off-peak hours
3. Process in multiple runs

### Missing Senders in Report

**Cause**: Reached page limit before scanning all emails

**Fix**:
1. Increase `max_pages` (default: 20 = ~10,000 emails)
2. Note: Higher values = longer runtime

## 📈 Best Practices

1. **Run weekly** to keep reports current
2. **Review top senders** after each analytics run
3. **Add unwanted senders** to cleanup list promptly
4. **Keep GIST_TOKEN secure** - don't share or expose
5. **Use default page limit** unless you have a large inbox

## 🔗 Related Documentation

- [Main Setup Guide](SETUP.md) - Initial Gmail API configuration
- [Cleanup Examples](EXAMPLES.md) - Usage examples for cleanup
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues and solutions
