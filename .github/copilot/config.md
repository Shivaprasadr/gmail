# AI Assistant Configuration

This configuration helps maintain consistency across all AI interactions for the Gmail project.

## Project Context
- **Project Name**: AI-Powered Development Toolkit & Gmail Automation Suite  
- **Repository**: [Your-Username]/gmail-automation-toolkit
- **Primary Language**: JavaScript/Node.js
- **Framework**: Gmail API, GitHub Actions, OAuth2
- **Development Stage**: Production Ready - Expandable Foundation
- **Team Size**: Individual/Small Team  
- **Security Level**: High (Email and API access)

## AI Interaction Guidelines

### Default Behavior
- Always prioritize security in suggestions
- Focus on maintainable, scalable solutions
- Prefer standard libraries and well-established patterns
- Consider performance implications and Gmail API quotas
- Provide clear explanations for email automation solutions
- Focus on security and privacy for email-related features
- Suggest scalable patterns for additional Gmail functionality

### Code Generation Preferences  
- Use descriptive variable names (especially for email-related data)
- Include comprehensive error handling and API retry logic
- Add security-focused comments for sensitive operations
- Follow OAuth2 and Gmail API best practices
- Include rate limiting and batch processing patterns
- Implement secure token management

### Documentation Requirements
- Generate comprehensive JSDoc comments for all Gmail API functions
- Include security considerations for all email operations
- Document OAuth2 flow and token management
- Provide usage examples for email automation scenarios  
- Explain rate limiting and API quota considerations
- Update setup guides when adding new Gmail features

## Technology Stack Guidelines

### Core Technologies
- **JavaScript/Node.js**: Primary runtime for Gmail API integration
- **Gmail API**: Official Google API for email operations
- **OAuth2**: Secure authentication and authorization
- **GitHub Actions**: Automation workflows and scheduling

### Development Patterns
- Use async/await for all Gmail API operations
- Implement comprehensive error handling and retry logic
- Use environment variables for sensitive configuration
- Follow Gmail API rate limiting guidelines
- Implement secure token refresh patterns

### API Integration Best Practices
- Always validate API responses and handle errors gracefully
- Implement exponential backoff for rate limit handling
- Use batch operations where possible for efficiency  
- Never log or expose sensitive email data or tokens
- Follow least-privilege principle for OAuth2 scopes
- Include rate limiting and security middleware

### Database (if applicable)
- Use prepared statements to prevent SQL injection
- Implement proper indexing strategies
- Include data validation at the database level
- Plan for data encryption where necessary
- Consider backup and recovery strategies

## Quality Assurance

### Testing Requirements
- Minimum 80% code coverage
- Include integration tests for critical paths
- Test error scenarios and edge cases
- Use meaningful test descriptions
- Mock external dependencies appropriately

### Security Checklist
- Input validation and sanitization
- Proper authentication and authorization
- Secure data storage and transmission
- Regular security dependency updates
- Logging of security-relevant events

### Performance Standards
- Page load times under 3 seconds
- API response times under 500ms for simple queries
- Efficient database query patterns
- Appropriate caching strategies
- Monitor and optimize bundle sizes

## Development Workflow

### Branch Strategy
- Use feature branches for all changes
- Follow conventional commit messages
- Require code review before merging
- Implement automated testing in CI/CD
- Use semantic versioning for releases

### Code Review Focus Areas
1. Security implications
2. Performance impact
3. Code maintainability
4. Test coverage
5. Documentation completeness

## Error Handling Strategy

### Client-Side
- User-friendly error messages
- Graceful degradation for failures
- Proper loading states
- Offline functionality considerations
- Error boundary implementations

### Server-Side
- Structured error logging
- Appropriate HTTP status codes
- No sensitive information in error responses
- Proper error recovery mechanisms
- Circuit breaker patterns for external services

## Monitoring and Logging

### Logging Requirements
- Structured logging format (JSON preferred)
- Include request IDs for tracing
- Log security events
- Monitor performance metrics
- Set up alerts for critical errors

### Metrics to Track
- Application performance
- User engagement
- Error rates
- Security events
- Resource utilization

## Deployment Guidelines

### Environment Configuration
- Development, staging, production environments
- Environment-specific configuration
- Secure secrets management
- Database migration strategies
- Rollback procedures

### Security in Deployment
- HTTPS enforcement
- Security headers configuration
- Regular security scanning
- Dependency vulnerability monitoring
- Access control and permissions

## Maintenance Procedures

### Regular Tasks
- Dependency updates (monthly)
- Security patches (as needed)
- Performance optimization reviews (quarterly)
- Code quality reviews (monthly)
- Documentation updates (ongoing)

### Emergency Procedures
- Security incident response plan
- System failure recovery procedures
- Data backup and restore processes
- Emergency contact information
- Rollback procedures

## AI Assistant Prompts Quick Reference

### For New Features
"I need to implement [feature] following our security-first approach. Please provide a solution that is maintainable, well-tested, and follows our established patterns."

### For Bug Fixes
"I have a bug in [component]. Please help me identify the root cause and provide a fix that includes proper error handling and tests."

### For Code Review
"Please review this code for security, performance, and maintainability issues. Check against our project standards and suggest improvements."

### For Documentation
"Please generate comprehensive documentation for this code, including security considerations and usage examples."

## Customization Guidelines

This configuration should be updated as the project evolves:

1. **Add new sections** as technology choices are made
2. **Update preferences** based on team feedback
3. **Refine standards** as the codebase grows
4. **Add project-specific patterns** as they emerge
5. **Regular reviews** to ensure relevance

## Integration with IDE

### VS Code Settings
Consider adding these to your workspace settings:
- Copilot suggestions enabled
- Security-focused extensions
- Code quality tools integration
- Auto-formatting on save
- Test runner integration

### GitHub Codespaces
If using Codespaces, ensure this configuration is available in the development container setup.

---

*This configuration should be reviewed and updated monthly or after significant project changes.*
