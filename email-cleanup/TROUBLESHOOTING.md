# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 1. Authentication Errors

**Error:** `Error: invalid_grant` or `Error: 400`
```
Solutions:
✅ Check if refresh token is expired (regenerate in Google Cloud Console)
✅ Verify Client ID and Client Secret are correct
✅ Ensure Gmail API is enabled in Google Cloud Console
✅ Check that OAuth consent screen is configured properly
```

**Error:** `Error: 403 insufficient_scope`
```
Solutions:
✅ Regenerate OAuth tokens with correct Gmail scopes
✅ Ensure https://www.googleapis.com/auth/gmail.modify scope is included
✅ Re-authorize the application in Google Cloud Console
```

### 2. GitHub Actions Issues

**Workflow not running:**
```
Solutions:
✅ Check if workflow file is in .github/workflows/ directory
✅ Verify YAML syntax is correct (use YAML validator)
✅ Ensure repository has GitHub Actions enabled
✅ Check if secrets are set correctly (case-sensitive)
✅ Verify package-lock.json exists in email-cleanup/ directory
```

**Dependencies installation fails:**
```
Error: npm ci requires package-lock.json
Solutions:
✅ Run 'npm install' in email-cleanup/ directory to generate package-lock.json
✅ Commit package-lock.json to repository
✅ Ensure .gitignore doesn't exclude package-lock.json
✅ Use 'npm install' instead of 'npm ci' if lock file issues persist
```

**Secrets not found:**
```
Solutions:
✅ Go to Settings → Secrets and variables → Actions
✅ Ensure secret names match exactly (GMAIL_CLIENT_ID, not gmail_client_id)
✅ Re-enter secrets (copy-paste can add hidden characters)
✅ Check repository permissions for accessing secrets
```

### 3. Email Deletion Issues

**No emails being deleted:**
```
Solutions:
✅ Verify sender email addresses are exact matches
✅ Check date range (emails might be older/newer than specified)
✅ Increase max_emails_per_sender limit
✅ Run with dry_run: true to see what would be deleted
```

**Too many emails being deleted:**
```
Safety measures:
✅ Always test with dry_run: true first
✅ Use conservative limits (start with 10-20 per sender)
✅ Check date range carefully
✅ Monitor GitHub Actions logs
```

### 4. Configuration Problems

**Environment variables not working:**
```
Solutions:
✅ Check variable names match exactly in all places
✅ Verify GitHub Variables are set in repository settings
✅ Ensure no extra spaces in variable values
✅ Use GitHub Secrets for sensitive data, Variables for non-sensitive
```

**Config file not found:**
```
Solutions:
✅ Ensure config/gmail-config.json exists if not using env vars
✅ Check JSON syntax (use JSON validator)
✅ Verify file paths are correct
✅ Make sure file is committed to repository
```

### 5. Rate Limiting

**Error:** `Error: 429 quotaExceeded`
```
Solutions:
✅ Reduce batch size (currently set to 100)
✅ Increase delay between API calls
✅ Check Gmail API quota in Google Cloud Console
✅ Wait and retry later (quota resets daily)
```

### 6. Analytics Issues (NEW)

**GIST_TOKEN not configured:**
```
Solutions:
✅ Create a Personal Access Token at https://github.com/settings/tokens
✅ Select 'gist' scope when creating the token
✅ Add token as secret named 'GIST_TOKEN' in repository settings
✅ Token may have expired - regenerate if needed
```

**Failed to create Gist:**
```
Solutions:
✅ Verify GIST_TOKEN has 'gist' scope
✅ Check if token has expired
✅ Ensure token is correctly copied (no extra spaces)
✅ Check GitHub API rate limits
```

**Analytics Timeout:**
```
Solutions:
✅ Reduce max_pages parameter (default: 20 = ~10,000 emails)
✅ Run during off-peak hours
✅ Split into multiple runs with different date ranges
```

**Cannot access private Gist:**
```
Solutions:
✅ Ensure you're logged into the same GitHub account that created the Gist
✅ Private Gists are only accessible to the creator
✅ Check the Gist URL is correct (starts with gist.github.com)
```

**Missing senders in analytics report:**
```
Solutions:
✅ Increase max_pages to scan more emails
✅ Default 20 pages = ~10,000 emails analyzed
✅ Very large inboxes may need higher limits
```

## Debugging Steps

### Step 1: Enable Debug Mode
Add this to your GitHub workflow for more detailed logs:
```yaml
- name: Debug Gmail Cleanup
  run: |
    echo "Sender emails: ${{ github.event.inputs.sender_emails || vars.SENDER_EMAILS }}"
    echo "Days old: ${{ github.event.inputs.days_old || '5' }}"
    echo "Dry run: ${{ github.event.inputs.dry_run || 'true' }}"
```

### Step 2: Test Locally
1. Clone the repository
2. Install dependencies: `npm install`
3. Create local config file with your credentials
4. Run with dry mode: `node gmail-cleanup.js`

### Step 3: Check Gmail API Status
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Check API & Services → Dashboard
4. Verify Gmail API is enabled and not over quota

### Step 4: Verify Permissions
1. Go to Gmail
2. Check Settings → Filters and Blocked Addresses
3. Ensure no filters are interfering
4. Check if emails are in Trash (they may already be processed)

## Getting Help

### Check Logs
- GitHub Actions: Go to Actions tab → Click on workflow run
- Local testing: Check console output
- Gmail API: Check Google Cloud Console logs

### Verify Setup
- [ ] Google Cloud Console project created
- [ ] Gmail API enabled
- [ ] OAuth credentials configured
- [ ] GitHub secrets set correctly
- [ ] Sender list configured
- [ ] Workflow file syntax correct

### Test Environment
1. **Start with dry run:** Always use `dry_run: true` first
2. **Small batch:** Test with 1-2 sender emails
3. **Recent emails:** Use 1-2 days old initially
4. **Low limits:** Start with 5-10 max emails per sender

### Contact Support
If you're still having issues:
1. Check the repository's Issues section
2. Create a new issue with:
   - Error message (remove sensitive data)
   - Steps you've tried
   - Configuration (anonymized)
   - GitHub Actions logs (if applicable)

## Security Notes

### Never Share These:
- Client Secret
- Refresh Token  
- Access Token
- Personal email addresses (if sensitive)

### Safe to Share:
- Client ID (already public when you use OAuth)
- Error messages (after removing sensitive data)
- Configuration structure
- Workflow logs (GitHub Actions automatically hides secrets)

## Performance Tips

### Optimize for Large Cleanups
```javascript
// Increase batch size for faster processing
const BATCH_SIZE = 200; // Default is 100

// Reduce delay for premium accounts
const DELAY_MS = 100; // Default is 200
```

### Schedule Optimization
```yaml
# Run during low-traffic hours
schedule:
  - cron: '0 2 * * *'  # 2 AM daily
```

### Memory Usage
For very large cleanups (1000+ emails), the script automatically processes in batches to prevent memory issues.
