# Gmail Email Cleanup System

An automated, production-ready system to delete old emails from specified senders using Gmail API. Perfect for cleaning up promotional emails, job alerts, newsletters, and other bulk emails.

## 🚀 Features

- **Ready-to-Use**: Fork and configure in 5 minutes
- **Flexible Configuration**: Use GitHub Variables/Secrets or manual input
- **Safe & Secure**: OAuth2 authentication, moves emails to trash (recoverable)
- **Multiple Usage Modes**: Automated daily cleanup or manual on-demand cleanup
- **Privacy Options**: Keep your sender list public or private
- **Safety Limits**: Configurable limits to prevent accidental mass deletion
- **Dry Run Mode**: Test safely before actual cleanup

## 🎯 Quick Start

### For New Users:
1. **[Follow the Setup Guide](SETUP.md)** - Complete setup in 5 minutes
2. **Test with dry-run mode** to see what would be deleted
3. **Configure your sender list** via GitHub Variables or Secrets
4. **Run automated daily cleanup** or trigger manually as needed

### Usage Examples:

#### Daily Job Alert Cleanup:
Set `SENDER_EMAILS_LIST` to: `noreply@indeed.com,jobs@linkedin.com,alerts@glassdoor.com`

#### Newsletter Cleanup:
Manual trigger with: `newsletter@company1.com,updates@service2.com,marketing@brand3.com`

#### One-time Cleanup:
Use workflow inputs for specific senders and custom time ranges

## 🎮 Usage Options

### 1. Automated Daily Cleanup
- Runs automatically every day at 2 AM UTC
- Uses your configured `SENDER_EMAILS_LIST` from GitHub Variables/Secrets
- Deletes emails older than 5 days (configurable)

### 2. Manual Cleanup with Custom Parameters
Go to **Actions** → **Gmail Email Cleanup** → **Run workflow**

**Available Options:**
- **Sender emails**: `user@company1.com,alerts@company2.com` (overrides configured list)
- **Days old**: `7` (delete emails older than 7 days)  
- **Dry run**: `true` (test mode, shows what would be deleted)
- **Max emails per sender**: `50` (safety limit per sender)

### 3. Configuration Options

#### Option A: Public Sender List (Repository Variables)
- Go to **Settings** → **Secrets and variables** → **Actions** → **Variables**  
- Add variable: `SENDER_EMAILS_LIST`
- Value: `email1@example.com,email2@example.com,email3@example.com`

#### Option B: Private Sender List (Repository Secrets)
- Go to **Settings** → **Secrets and variables** → **Actions** → **Secrets**
- Add secret: `SENDER_EMAILS_LIST` 
- Value: `email1@example.com,email2@example.com,email3@example.com`

## 📊 Monitoring and Logs

### GitHub Actions Logs
- Check the Actions tab for execution logs
- All cleanup output is shown directly in the GitHub Actions console

### Console Output
The system provides clean, simple logging with:
- Processing status for each sender
- Number of emails found and deleted per sender
- Summary statistics
- Error reporting

### Example Log Output
```
🚀 Starting Gmail email cleanup process...
📧 Processing emails from: donotreply@match.indeed.com
📊 Found 25 emails from donotreply@match.indeed.com to delete
✅ Successfully deleted 25/25 emails from donotreply@match.indeed.com

📊 CLEANUP SUMMARY
==================================================
📧 Total emails found: 150
🗑️  Total emails deleted: 148
⚠️  Total errors: 2
✅ Success rate: 98%
⏱️  Duration: 45 seconds

📋 DELETIONS BY SENDER:
📧 donotreply@match.indeed.com: 25/25 deleted
📧 jobs@alerts.jobot.com: 18/18 deleted
📧 info@hirist.tech: 12/12 deleted
```

## 🔒 Security Considerations

- **OAuth2 Authentication**: Uses secure OAuth2 flow with refresh tokens
- **Rate Limiting**: Respects Gmail API rate limits to avoid blocking
- **Safe Deletion**: Emails are moved to trash, not permanently deleted
- **Secure Secrets**: All credentials stored as GitHub secrets
- **Simple Logging**: Clean console output for monitoring

## ⚙️ Configuration Options

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `GMAIL_CLIENT_ID` | Required | Google OAuth2 Client ID |
| `GMAIL_CLIENT_SECRET` | Required | Google OAuth2 Client Secret |
| `GMAIL_REFRESH_TOKEN` | Required | Gmail refresh token |
| `CLEANUP_DAYS_OLD` | 5 | Number of days old for email deletion |
| `MAX_RESULTS_PER_QUERY` | 100 | Maximum emails per search query |
| `RATE_LIMIT_DELAY_MS` | 1000 | Delay between API calls (ms) |
| `DRY_RUN` | false | Run without actual deletions |

### Sender Configuration

Each sender in `config/senders.json` supports:

- `email`: Sender email address (required)
- `description`: Human-readable description
- `category`: Grouping category
- `enabled`: Whether to include in cleanup (true/false)
- `addedDate`: Date when sender was added
- `notes`: Additional notes

## 🛠️ Maintenance

### Adding New Senders

1. Edit `config/senders.json`
2. Add new sender object with all required fields
3. Set `enabled: true` to include in cleanup
4. Commit changes to trigger next cleanup

### Disabling Senders

1. Set `enabled: false` for any sender in `config/senders.json`
2. Commit changes

### Updating Configuration

1. Modify cleanup parameters in environment variables
2. Update sender categories or descriptions
3. Review and update sender list monthly

## 🧪 Testing

### Dry Run Mode
```bash
# Test without actual deletions
DRY_RUN=true node gmail-cleanup.js
```

### Configuration Validation
```bash
# Validate sender configuration
npm run validate-config
```

### Manual Testing
```bash
# Run with custom parameters
CLEANUP_DAYS_OLD=3 node gmail-cleanup.js
```

## 📈 Monitoring and Alerts

### Success Metrics
- Email deletion success rate
- Processing duration
- Error frequency
- API rate limit compliance

### Alerting
- GitHub Actions will fail if cleanup encounters critical errors
- Check logs for warnings and errors
- Monitor artifact uploads for report availability

## 🚨 Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify Gmail API is enabled
   - Check OAuth2 credentials are correct
   - Ensure refresh token is valid

2. **Rate Limit Errors**
   - Increase `RATE_LIMIT_DELAY_MS`
   - Reduce `MAX_RESULTS_PER_QUERY`
   - Check daily quota limits

3. **No Emails Found**
   - Verify sender email addresses are correct
   - Check date range (days old setting)
   - Ensure emails exist in the specified timeframe

4. **Permission Errors**
   - Verify Gmail API scopes include necessary permissions
   - Check OAuth2 consent screen configuration

### Debug Steps

1. Enable dry-run mode to test without deletions
2. Check GitHub Actions logs for detailed error messages
3. Verify sender configuration format
4. Test authentication separately
5. Monitor API quota usage in Google Cloud Console

## 📋 API Limits and Quotas

### Gmail API Limits
- 1 billion quota units per day (default)
- 250 quota units per user per 100 seconds
- Each search operation costs ~5 units
- Each delete operation costs ~10 units

### Best Practices
- Use appropriate rate limiting delays
- Process senders in batches
- Monitor quota usage in Google Cloud Console
- Consider running during off-peak hours

## 🔄 Recovery and Rollback

### Email Recovery
- Deleted emails are moved to trash, not permanently deleted
- Users can recover emails from Gmail trash within 30 days
- Permanent deletion requires manual action in Gmail

### System Rollback
- Disable GitHub Actions workflow if needed
- Set all senders to `enabled: false` in configuration
- Use dry-run mode for testing changes

## 📞 Support

### Getting Help
1. Check GitHub Actions logs for errors
2. Review troubleshooting section above
3. Verify configuration and credentials
4. Test with dry-run mode first

### Reporting Issues
1. Gather error logs and cleanup reports
2. Note system configuration and environment
3. Include steps to reproduce the issue
4. Provide expected vs actual behavior

---

## 📄 License

This project is licensed under the MIT License - see the package.json file for details.

---

**⚠️ Important**: Always test changes in dry-run mode before enabling automatic cleanup. This system moves emails to trash, which can be recovered, but use caution when configuring sender lists and cleanup parameters.
