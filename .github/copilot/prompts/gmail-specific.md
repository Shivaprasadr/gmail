# Gmail Project Specific Prompts

These prompts are tailored specifically for Gmail-related functionality and common email processing tasks.

## Email Processing Prompts

### Email Parsing
```
I need to parse email content with the following requirements:
- Email format: [MIME/Plain text/HTML]
- Data to extract: [Headers/Body/Attachments/Metadata]
- Security considerations: [Malware scanning/Content filtering]
- Performance needs: [Batch processing/Real-time]

Please provide:
1. Parsing logic with security validations
2. Error handling for malformed emails
3. Performance optimization strategies
4. Data sanitization procedures
5. Testing approach for various email formats

Follow Gmail project security standards and include proper input validation.
```

### Email Authentication
```
I need to implement email authentication with:
- Authentication method: [OAuth2/IMAP/POP3/API]
- Provider: [Gmail/Outlook/Custom]
- Security requirements: [2FA/App passwords/Token refresh]
- Scope needed: [Read-only/Full access/Specific folders]

Please provide:
1. Secure authentication flow
2. Token management strategy
3. Error handling for auth failures
4. Session management approach
5. Security best practices implementation
```

### Email Search and Filtering
```
I need to implement email search with:
- Search criteria: [Subject/From/Date range/Content/Labels]
- Performance requirements: [Response time/Result count]
- Security filters: [Spam detection/Malware scanning]
- User experience: [Auto-complete/Saved searches/Filters]

Please provide:
1. Efficient search algorithm
2. Indexing strategy (if applicable)
3. Security validations
4. Caching implementation
5. Pagination and sorting logic
```

## Gmail API Integration Prompts

### Gmail API Setup
```
I need to integrate with Gmail API for:
- Use case: [Email reading/Sending/Management]
- Authentication type: [Service account/User auth]
- Required scopes: [Specific Gmail permissions]
- Rate limiting considerations: [Request frequency/Batch operations]

Please provide:
1. Complete setup instructions
2. Authentication implementation
3. Rate limiting and retry logic
4. Error handling for API responses
5. Security considerations for API keys
```

### Batch Email Operations
```
I need to implement batch email operations:
- Operation type: [Mark read/Delete/Move/Label]
- Batch size: [Number of emails per batch]
- Performance requirements: [Processing speed/Memory usage]
- Error handling: [Partial failures/Rollback strategy]

Please provide:
1. Efficient batch processing logic
2. Progress tracking implementation
3. Error recovery mechanisms
4. Memory optimization strategies
5. User feedback during long operations
```

## Security-Specific Prompts

### Email Security Scanning
```
I need to implement email security scanning for:
- Threat types: [Malware/Phishing/Spam/Suspicious links]
- Scanning approach: [Real-time/Batch/Scheduled]
- Integration points: [Incoming/Outgoing/Stored emails]
- Performance impact: [Acceptable latency/Resource usage]

Please provide:
1. Multi-layered security implementation
2. Threat detection algorithms
3. Quarantine and reporting mechanisms
4. Performance optimization strategies
5. False positive handling procedures
```

### Data Privacy and Compliance
```
I need to ensure email data privacy with:
- Compliance requirements: [GDPR/HIPAA/SOX/Custom]
- Data handling: [Storage/Processing/Transmission]
- User consent management: [Opt-in/Opt-out/Data deletion]
- Audit requirements: [Logging/Reporting/Retention]

Please provide:
1. Privacy-by-design implementation
2. Data encryption strategies
3. Audit logging mechanisms
4. User consent management system
5. Data retention and deletion policies
```

## Performance Optimization Prompts

### Email Sync Optimization
```
I need to optimize email synchronization:
- Sync frequency: [Real-time/Periodic/On-demand]
- Data volume: [Number of emails/Attachment sizes]
- Network conditions: [Offline support/Slow connections]
- Battery considerations: [Mobile optimization/Background sync]

Please provide:
1. Efficient synchronization algorithm
2. Incremental sync implementation
3. Offline support strategy
4. Battery optimization techniques
5. Network error recovery
```

### Large Attachment Handling
```
I need to handle large email attachments:
- Attachment sizes: [Maximum size limits]
- Storage strategy: [Local/Cloud/Hybrid]
- User experience: [Progress indicators/Pause-resume]
- Security scanning: [Virus scanning/Content validation]

Please provide:
1. Streaming upload/download implementation
2. Progress tracking system
3. Error recovery mechanisms
4. Security validation pipeline
5. Storage optimization strategies
```

## User Interface Prompts

### Email List Interface
```
I need to create an email list interface with:
- Display requirements: [Threading/Sorting/Filtering]
- Performance needs: [Virtual scrolling/Lazy loading]
- User interactions: [Selection/Actions/Search]
- Accessibility: [Screen readers/Keyboard navigation]

Please provide:
1. Responsive list component
2. Virtual scrolling implementation
3. Accessibility features
4. Performance optimization
5. User interaction handling
```

### Email Composer
```
I need to implement an email composer with:
- Features: [Rich text/Attachments/Templates/Auto-save]
- Security: [Content sanitization/Attachment scanning]
- User experience: [Auto-complete/Spell check/Formatting]
- Integration: [Contacts/Signatures/Drafts]

Please provide:
1. Rich text editor integration
2. Auto-save mechanism
3. Attachment handling system
4. Security validations
5. User experience enhancements
```

## Integration and Migration Prompts

### Email Provider Migration
```
I need to migrate emails between providers:
- Source: [Current email provider/format]
- Destination: [Target provider/format]
- Data preservation: [Metadata/Folders/Labels]
- Migration scope: [Full/Partial/Incremental]

Please provide:
1. Migration strategy and timeline
2. Data mapping and conversion
3. Error handling and recovery
4. Progress tracking and reporting
5. Data integrity verification
```

### Third-Party Integration
```
I need to integrate with external services:
- Service type: [CRM/Calendar/Task management/Analytics]
- Integration method: [API/Webhook/File export]
- Data synchronization: [Real-time/Batch/Manual]
- Security requirements: [Authentication/Encryption/Permissions]

Please provide:
1. Integration architecture
2. Authentication and security implementation
3. Data synchronization logic
4. Error handling and monitoring
5. Configuration management system
```

## Monitoring and Analytics Prompts

### Email Analytics
```
I need to implement email analytics for:
- Metrics: [Open rates/Click rates/Response times/User behavior]
- Privacy compliance: [Anonymization/User consent/Data retention]
- Reporting: [Dashboards/Exports/Scheduled reports]
- Performance: [Real-time/Batch processing/Data aggregation]

Please provide:
1. Analytics tracking implementation
2. Privacy-compliant data collection
3. Reporting and visualization system
4. Performance optimization
5. Data retention and cleanup procedures
```

### System Health Monitoring
```
I need to monitor Gmail system health:
- Metrics: [API response times/Error rates/User activity/Resource usage]
- Alerting: [Threshold-based/Anomaly detection/Escalation procedures]
- Logging: [Structured logs/Correlation IDs/Security events]
- Dashboards: [Real-time/Historical/Custom views]

Please provide:
1. Comprehensive monitoring setup
2. Alerting and notification system
3. Log aggregation and analysis
4. Dashboard and visualization
5. Incident response procedures
```

## Testing Prompts

### Email Processing Tests
```
I need comprehensive tests for email processing:
- Test scenarios: [Various email formats/Edge cases/Error conditions]
- Test data: [Sample emails/Malicious content/Large attachments]
- Security testing: [Injection attacks/Malware detection/Privacy violations]
- Performance testing: [Load testing/Stress testing/Memory usage]

Please provide:
1. Complete test suite
2. Test data generation
3. Security test scenarios
4. Performance benchmarking
5. Continuous testing integration
```

---

## Usage Guidelines

1. **Select the appropriate prompt** based on your current task
2. **Customize the bracketed sections** with your specific requirements
3. **Add project context** from the config file
4. **Include security considerations** for all email-related functionality
5. **Consider performance implications** for all solutions

## Prompt Evolution

As your Gmail project grows, remember to:
- Add new prompt templates for emerging patterns
- Update existing prompts based on lessons learned
- Remove or consolidate obsolete prompts
- Share effective prompts with the team
- Document successful prompt variations

---

*These prompts are specifically designed for Gmail projects and should be updated as your understanding of email processing requirements evolves.*
