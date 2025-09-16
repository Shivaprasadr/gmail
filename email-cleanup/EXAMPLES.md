# 📧 Email Cleanup Examples

## Common Sender Lists

### Job Alerts & Recruiting
```
noreply@indeed.com,jobs@linkedin.com,no-reply@glassdoor.com,hiring@ziprecruiter.com,noreply@monster.com,alerts@careerbuilder.com,jobs@dice.com
```

### Social Media & Networking
```
notification@linkedin.com,noreply@facebook.com,no-reply@twitter.com,notifications@instagram.com,updates@youtube.com,noreply@reddit.com
```

### E-commerce & Deals
```
deals@amazon.com,offers@ebay.com,promotions@walmart.com,sales@target.com,coupons@retailer.com,deals@bestbuy.com,offers@costco.com
```

### Newsletters & Updates
```
newsletter@company.com,updates@service.com,digest@news.com,weekly@brand.com
```

### Banking & Finance
```
alerts@bank.com,statements@creditcard.com,notifications@paypal.com
```

### Travel & Transportation
```
no-reply@uber.com,noreply@lyft.com,deals@expedia.com,offers@hotels.com
```

### Food & Delivery
```
no-reply@doordash.com,noreply@ubereats.com,offers@dominos.com,deals@restaurant.com
```

## Configuration Examples

### GitHub Variables (Public - Safe for public repos)
```
Name: SENDER_EMAILS
Value: noreply@indeed.com,jobs@linkedin.com,deals@amazon.com
```

### GitHub Secrets (Private - For sensitive sender lists)
```
Name: SENDER_EMAILS
Value: alerts@mybank.com,statements@mycreditcard.com
```

### Manual Cleanup Examples

**Quick job alert cleanup:**
```
Sender emails: noreply@indeed.com,jobs@linkedin.com
Days old: 3
Dry run: true
Max emails per sender: 50
```

**Newsletter cleanup:**
```
Sender emails: newsletter@tech.com,weekly@news.com,digest@media.com
Days old: 7
Dry run: false
Max emails per sender: 100
```

## Tips for Building Your Sender List

### 1. Check Your Gmail
- Go to Gmail → Search for promotional emails
- Look for common patterns: `noreply@`, `no-reply@`, `notifications@`
- Check your "Promotions" tab for frequent senders

### 2. Start Small
- Begin with 3-5 obvious senders
- Test with `dry_run: true` first
- Gradually add more senders

### 3. Common Patterns
- Job sites: `*@indeed.com`, `*@linkedin.com`
- Social media: `*@facebook.com`, `*@twitter.com`
- E-commerce: `*@amazon.com`, `*@retailer.com`
- No-reply addresses: `noreply@*`, `no-reply@*`

### 4. Safety First
- Always test with dry run mode
- Start with short retention (3-5 days)
- Use low limits (10-50 emails per sender) initially
- Monitor the GitHub Actions logs

## Advanced Usage

### Multiple Categories
You can create different workflows for different types of cleanup:

**Daily promotional cleanup:**
- Senders: E-commerce, deals, newsletters
- Days old: 3
- Max per sender: 50

**Weekly job alert cleanup:**
- Senders: Job sites, recruiting
- Days old: 7
- Max per sender: 100

**Monthly banking cleanup:**
- Senders: Bank statements, alerts
- Days old: 30
- Max per sender: 200
