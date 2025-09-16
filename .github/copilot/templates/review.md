# Code Review Template

Use this template when conducting code reviews for the Gmail project.

## Review Information

### Pull Request Details
**PR ID**: [Pull Request Number]
**Author**: [Developer Name]
**Reviewer(s)**: [Reviewer Name(s)]
**Review Date**: [Date]
**Branch**: [feature/bug-branch-name]
**Target**: [main/develop]

### Change Overview
**Type**: [Feature/Bug Fix/Refactor/Documentation/Security Fix]
**Scope**: [Small/Medium/Large/Breaking Change]
**Files Changed**: [Number] files, [Number] insertions, [Number] deletions

### Related Issues
- Fixes: [Issue Number]
- Related to: [Issue Numbers]
- Blocks: [Issue Numbers]

## Functionality Review

### Feature Completeness
- [ ] All acceptance criteria met
- [ ] Edge cases handled appropriately
- [ ] Error conditions handled
- [ ] User experience is intuitive
- [ ] Accessibility requirements met

### Business Logic
- [ ] Logic is correct and complete
- [ ] Calculations are accurate
- [ ] Data validation is appropriate
- [ ] Business rules are enforced
- [ ] Integration points work correctly

### API Design (if applicable)
- [ ] RESTful design principles followed
- [ ] Consistent with existing API patterns
- [ ] Appropriate HTTP status codes
- [ ] Request/response formats are clear
- [ ] Versioning strategy considered

## Code Quality Review

### Architecture and Design
- [ ] Follows established architectural patterns
- [ ] Separation of concerns is maintained
- [ ] Dependencies are appropriate
- [ ] Single Responsibility Principle followed
- [ ] Open/Closed Principle considered
- [ ] Interface design is clean

### Code Style and Standards
- [ ] Follows project coding conventions
- [ ] Consistent naming conventions
- [ ] Appropriate code organization
- [ ] No code duplication
- [ ] Comments are meaningful and necessary
- [ ] No dead or commented-out code

### Best Practices
- [ ] DRY principle followed
- [ ] KISS principle applied
- [ ] YAGNI principle considered
- [ ] Proper abstraction levels
- [ ] No premature optimization
- [ ] Appropriate design patterns used

## Security Review

### Input Validation
- [ ] All inputs are validated
- [ ] SQL injection prevention
- [ ] XSS prevention measures
- [ ] Command injection prevention
- [ ] Path traversal prevention
- [ ] File upload security (if applicable)

### Authentication and Authorization
- [ ] Proper authentication checks
- [ ] Authorization is enforced
- [ ] Session management is secure
- [ ] Token handling is secure
- [ ] Password handling follows best practices
- [ ] Rate limiting implemented where needed

### Data Protection
- [ ] Sensitive data is encrypted
- [ ] Secrets are not hardcoded
- [ ] Environment variables used appropriately
- [ ] Data sanitization is performed
- [ ] Audit logging is implemented
- [ ] Privacy requirements met

### Security Best Practices
- [ ] HTTPS enforced where required
- [ ] Security headers implemented
- [ ] CORS policies are appropriate
- [ ] Error messages don't leak information
- [ ] Dependency vulnerabilities checked
- [ ] Security testing considerations

## Performance Review

### Efficiency
- [ ] Algorithms are efficient
- [ ] Database queries are optimized
- [ ] N+1 query problems avoided
- [ ] Appropriate indexing used
- [ ] Caching strategy is sound
- [ ] Lazy loading implemented where beneficial

### Scalability
- [ ] Code can handle expected load
- [ ] Memory usage is reasonable
- [ ] CPU usage is optimized
- [ ] Concurrent access handled properly
- [ ] Resource cleanup is performed
- [ ] Batch processing used appropriately

### Frontend Performance (if applicable)
- [ ] Bundle size impact considered
- [ ] Code splitting implemented
- [ ] Images optimized
- [ ] Lazy loading for components
- [ ] Efficient rendering patterns
- [ ] Memory leaks prevented

## Testing Review

### Test Coverage
- [ ] Unit tests are comprehensive
- [ ] Integration tests cover key paths
- [ ] Edge cases are tested
- [ ] Error conditions are tested
- [ ] Mocking is used appropriately
- [ ] Test coverage meets project standards

### Test Quality
- [ ] Tests are readable and maintainable
- [ ] Test names are descriptive
- [ ] Tests are isolated and independent
- [ ] Proper setup and teardown
- [ ] Assertions are meaningful
- [ ] No flaky tests introduced

### Testing Strategy
- [ ] Appropriate testing levels used
- [ ] Security testing included
- [ ] Performance testing considered
- [ ] Accessibility testing included
- [ ] Browser compatibility tested (if applicable)
- [ ] Mobile testing considered (if applicable)

## Documentation Review

### Code Documentation
- [ ] Public APIs are documented
- [ ] Complex logic is explained
- [ ] Comments are up to date
- [ ] Documentation is accurate
- [ ] Examples are provided where helpful
- [ ] Architecture decisions are documented

### User Documentation
- [ ] User-facing features documented
- [ ] API documentation updated
- [ ] README updated if needed
- [ ] Migration guides provided
- [ ] Troubleshooting info included
- [ ] Configuration options documented

## Deployment and Operations

### Deployment Readiness
- [ ] Configuration management handled
- [ ] Environment variables documented
- [ ] Database migrations included
- [ ] Backward compatibility maintained
- [ ] Feature flags used appropriately
- [ ] Rollback strategy considered

### Monitoring and Observability
- [ ] Appropriate logging implemented
- [ ] Metrics and monitoring added
- [ ] Error tracking included
- [ ] Performance monitoring considered
- [ ] Alert thresholds defined
- [ ] Debugging information available

### Maintenance Considerations
- [ ] Code is maintainable
- [ ] Technical debt is minimal
- [ ] Dependencies are up to date
- [ ] Deprecation warnings addressed
- [ ] Upgrade path is clear
- [ ] Support documentation provided

## Review Comments and Feedback

### Major Issues (Must Fix)
1. **[Issue Category]**: [Description of issue]
   - **Location**: [File:line or general area]
   - **Recommendation**: [Specific fix needed]
   - **Rationale**: [Why this is important]

2. **[Issue Category]**: [Description of issue]
   - **Location**: [File:line or general area]
   - **Recommendation**: [Specific fix needed]
   - **Rationale**: [Why this is important]

### Minor Issues (Should Fix)
1. **[Issue Category]**: [Description of issue]
   - **Location**: [File:line or general area]
   - **Recommendation**: [Suggested improvement]

2. **[Issue Category]**: [Description of issue]
   - **Location**: [File:line or general area]
   - **Recommendation**: [Suggested improvement]

### Suggestions (Nice to Have)
1. **[Improvement Category]**: [Description of suggestion]
   - **Location**: [File:line or general area]
   - **Suggestion**: [Potential improvement]

2. **[Improvement Category]**: [Description of suggestion]
   - **Location**: [File:line or general area]
   - **Suggestion**: [Potential improvement]

### Positive Feedback
- [What was done well]
- [Good practices observed]
- [Creative solutions appreciated]

## AI Assistance for Code Review

### Security Review Prompt
```
Please review the following code for security vulnerabilities in a Gmail project:

[Paste code here]

Check specifically for:
1. Input validation issues
2. Authentication/authorization problems
3. Data exposure risks
4. Injection vulnerabilities
5. Email-specific security concerns (if applicable)
6. Compliance with security best practices

Provide specific recommendations for any issues found.
```

### Performance Review Prompt
```
Please analyze this code for performance issues in a Gmail project:

[Paste code here]

Focus on:
1. Algorithm efficiency
2. Database query optimization
3. Memory usage patterns
4. Caching opportunities
5. Email processing efficiency (if applicable)
6. Scalability considerations

Suggest specific optimizations where applicable.
```

### Code Quality Review Prompt
```
Please review this code for maintainability and best practices:

[Paste code here]

Evaluate:
1. Code organization and structure
2. Adherence to SOLID principles
3. Design pattern usage
4. Code readability and clarity
5. Error handling completeness
6. Testing adequacy

Provide constructive feedback for improvement.
```

## Review Decision

### Overall Assessment
**Quality Score**: [1-10] (10 being excellent)
**Security Score**: [1-10] (10 being very secure)
**Performance Score**: [1-10] (10 being highly optimized)
**Maintainability Score**: [1-10] (10 being very maintainable)

### Decision
- [ ] **Approve**: Ready to merge
- [ ] **Approve with Minor Changes**: Can merge after small fixes
- [ ] **Request Changes**: Needs significant work before approval
- [ ] **Needs Discussion**: Requires team discussion before proceeding

### Next Steps
1. [Action item 1] - Owner: [Name]
2. [Action item 2] - Owner: [Name]
3. [Action item 3] - Owner: [Name]

### Follow-up Required
- [ ] Security team review needed
- [ ] Performance testing required
- [ ] Documentation team input needed
- [ ] Architecture review required
- [ ] Product owner approval needed

## Learning and Improvement

### Patterns to Promote
- [Good pattern observed that should be used elsewhere]
- [Effective technique that could be standardized]

### Patterns to Avoid
- [Anti-pattern observed that should be avoided]
- [Common mistake that needs team awareness]

### Process Improvements
- [Suggestion for improving the review process]
- [Tool or automation opportunity identified]

---

## Review Checklist Summary

Use this quick checklist for efficient reviews:

### Quick Security Check
- [ ] Input validation present
- [ ] No hardcoded secrets
- [ ] Authentication/authorization proper
- [ ] Error handling doesn't leak info

### Quick Performance Check
- [ ] No obvious inefficiencies
- [ ] Database queries optimized
- [ ] Appropriate caching
- [ ] Resource cleanup handled

### Quick Quality Check
- [ ] Code is readable
- [ ] Tests are adequate
- [ ] Documentation is sufficient
- [ ] Follows project standards

---

## Template Usage Instructions

1. **Copy this template** for each code review
2. **Focus on relevant sections** based on the change type
3. **Be constructive** in feedback and suggestions
4. **Provide specific examples** when pointing out issues
5. **Balance thoroughness with efficiency**
6. **Update the template** based on review experience

---

*Effective code reviews are crucial for maintaining code quality, security, and team knowledge sharing in the Gmail project.*
