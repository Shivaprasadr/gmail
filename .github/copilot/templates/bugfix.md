# Bug Fix Template

Use this template when fixing bugs in the Gmail project.

## Bug Information

### Bug Description
**Bug ID**: [Ticket/Issue Number]
**Severity**: [Critical/High/Medium/Low]
**Priority**: [P1/P2/P3/P4]
**Reporter**: [Who reported the bug]
**Date Reported**: [Date]

### Problem Statement
**Summary**: [Brief description of the problem]
**Impact**: [How this affects users/system]
**Frequency**: [How often this occurs]
**Environment**: [Where the bug occurs - dev/staging/production]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Additional steps...]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Error Messages/Logs
```
[Paste relevant error messages, stack traces, or log entries]
```

### Screenshots/Videos
[Attach or link to visual evidence if applicable]

## Investigation

### Root Cause Analysis
**Primary Cause**: [Main reason for the bug]
**Contributing Factors**: [Other factors that led to the issue]
**Code Location**: [Files and line numbers involved]

### Investigation Steps Taken
- [ ] Reproduced the issue locally
- [ ] Analyzed error logs and stack traces
- [ ] Reviewed related code and recent changes
- [ ] Checked for similar issues in the past
- [ ] Identified all affected components
- [ ] Determined scope of impact

### Technical Details
**Affected Components**:
- [Component 1]: [How it's affected]
- [Component 2]: [How it's affected]

**Data Analysis**:
- Records affected: [Number/scope]
- Time range: [When the issue occurred]
- User impact: [How many users affected]

**System State**:
- Database state: [Relevant database information]
- Cache state: [Cache-related issues]
- External dependencies: [Third-party service issues]

## Solution Design

### Fix Strategy
**Approach**: [High-level approach to fixing the bug]
**Rationale**: [Why this approach was chosen]
**Alternatives Considered**: [Other approaches that were considered]

### Implementation Plan
1. **Immediate Fix**: [Quick fix to stop the bleeding]
2. **Root Cause Fix**: [Permanent solution]
3. **Prevention Measures**: [How to prevent similar issues]

### Code Changes Required
**Files to Modify**:
- `[file-path]`: [Description of changes]
- `[file-path]`: [Description of changes]

**New Files** (if any):
- `[file-path]`: [Purpose of new file]

**Configuration Changes**:
- [Config file]: [What needs to change]
- [Environment variable]: [New or modified values]

## Risk Assessment

### Change Impact
**Risk Level**: [Low/Medium/High]
**Scope**: [What parts of the system are affected]
**Backward Compatibility**: [Any breaking changes]

### Potential Side Effects
- [ ] [Potential side effect 1]
- [ ] [Potential side effect 2]
- [ ] [Potential side effect 3]

### Mitigation Strategies
- [Risk]: [How to mitigate]
- [Risk]: [How to mitigate]

## Testing Strategy

### Test Plan
**Pre-fix Testing**:
- [ ] Confirm bug reproduction in test environment
- [ ] Document current broken behavior
- [ ] Identify all affected scenarios

**Post-fix Testing**:
- [ ] Verify the specific bug is fixed
- [ ] Test related functionality for regressions
- [ ] Perform integration testing
- [ ] Test edge cases and error conditions

### Test Cases
1. **Primary Fix Verification**
   - Steps: [Test steps]
   - Expected: [Expected result]
   - Status: [Pass/Fail]

2. **Regression Testing**
   - Scope: [What to test for regressions]
   - Critical paths: [Most important flows to verify]
   - Status: [Pass/Fail]

3. **Edge Cases**
   - [Edge case 1]: [Test approach]
   - [Edge case 2]: [Test approach]

### Security Testing
- [ ] Input validation testing
- [ ] Authentication/authorization testing
- [ ] Data exposure verification
- [ ] Injection attack prevention

### Performance Testing
- [ ] Response time verification
- [ ] Memory usage check
- [ ] Database performance impact
- [ ] Caching behavior verification

## Implementation

### Code Review Checklist
- [ ] Fix addresses the root cause
- [ ] No introduction of new vulnerabilities
- [ ] Code follows project standards
- [ ] Appropriate error handling added
- [ ] Logging added for debugging
- [ ] Comments explain complex logic
- [ ] No hardcoded values
- [ ] Backward compatibility maintained

### Security Checklist
- [ ] Input validation is secure
- [ ] No sensitive data exposure
- [ ] Authentication/authorization proper
- [ ] SQL injection prevention
- [ ] XSS prevention measures
- [ ] CSRF protection maintained

### Performance Checklist
- [ ] No performance degradation
- [ ] Efficient algorithms used
- [ ] Database queries optimized
- [ ] Memory usage acceptable
- [ ] Caching strategy appropriate

## Deployment Plan

### Deployment Strategy
**Environment Order**: [dev → staging → production]
**Rollout Type**: [Blue-green/Rolling/Canary]
**Timing**: [When to deploy]

### Pre-deployment
- [ ] Code review completed and approved
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Deployment checklist reviewed
- [ ] Rollback plan confirmed

### Deployment Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Verification steps]

### Post-deployment
- [ ] Monitor error rates
- [ ] Verify fix is working in production
- [ ] Check performance metrics
- [ ] Monitor user feedback
- [ ] Update issue status

### Rollback Plan
**Rollback Triggers**:
- [Condition that would trigger rollback]
- [Another condition]

**Rollback Steps**:
1. [Rollback step 1]
2. [Rollback step 2]
3. [Verification of rollback]

## Monitoring and Verification

### Success Metrics
- [ ] Error rate returns to baseline
- [ ] User reports decrease
- [ ] Performance metrics stable
- [ ] No new related issues

### Monitoring Plan
**Immediate (First 24 hours)**:
- [ ] Error rate monitoring
- [ ] Performance metric tracking
- [ ] User feedback monitoring
- [ ] System stability check

**Short-term (First week)**:
- [ ] Trend analysis
- [ ] User satisfaction monitoring
- [ ] Related issue tracking
- [ ] Performance optimization opportunities

### Alert Configuration
- [Metric]: [Threshold for alerting]
- [Metric]: [Threshold for alerting]

## Documentation Updates

### Technical Documentation
- [ ] Code comments updated
- [ ] Architecture documentation
- [ ] API documentation (if applicable)
- [ ] Troubleshooting guide updates

### User Documentation
- [ ] User guide updates (if user-facing)
- [ ] FAQ updates
- [ ] Known issues list
- [ ] Release notes

## Post-Mortem (for significant bugs)

### Timeline
- [Date/Time]: [Event]
- [Date/Time]: [Event]
- [Date/Time]: [Resolution]

### What Went Well
- [What worked well during the incident]
- [Effective processes or tools]

### What Could Be Improved
- [Areas for improvement]
- [Process gaps identified]

### Action Items
- [ ] [Action item 1] - Owner: [Name] - Due: [Date]
- [ ] [Action item 2] - Owner: [Name] - Due: [Date]

### Lessons Learned
- [Key lesson 1]
- [Key lesson 2]

## Prevention Measures

### Immediate Prevention
- [ ] Add validation to prevent similar input
- [ ] Add monitoring for early detection
- [ ] Update error handling patterns
- [ ] Add automated tests for this scenario

### Long-term Prevention
- [ ] Architectural changes to prevent class of issues
- [ ] Process improvements
- [ ] Tool improvements
- [ ] Training or knowledge sharing

## AI Assistance Prompts for Bug Fixes

### Root Cause Analysis Prompt
```
I have a bug in my Gmail project with the following symptoms:
- Error: [Error message]
- Context: [When it occurs]
- Environment: [Where it occurs]
- Recent changes: [Any recent changes]

Please help me:
1. Identify potential root causes
2. Suggest investigation steps
3. Recommend debugging approaches
4. Consider security implications
5. Plan testing strategy

Code involved:
[Paste relevant code]
```

### Fix Implementation Prompt
```
I need to fix a bug caused by [root cause] in my Gmail project.
Requirements:
- Fix the immediate issue: [Issue description]
- Maintain security: [Security requirements]
- Avoid breaking changes: [Compatibility needs]
- Include proper testing: [Testing needs]

Please provide:
1. Secure fix implementation
2. Error handling improvements
3. Test cases to prevent regression
4. Monitoring recommendations

Current problematic code:
[Paste code to fix]
```

### Testing Verification Prompt
```
I've implemented a bug fix for [bug description].
Please help me create comprehensive tests to verify:
1. The bug is actually fixed
2. No regressions are introduced
3. Edge cases are covered
4. Security isn't compromised
5. Performance isn't degraded

Fix implemented:
[Paste fix code]

Original problematic behavior:
[Describe the bug]
```

---

## Template Usage Instructions

1. **Copy this template** for each bug fix
2. **Fill in all relevant sections** - remove sections that don't apply
3. **Keep it updated** throughout the investigation and fix process
4. **Use it for post-mortem** learning and process improvement
5. **Share learnings** with the team

---

*This template helps ensure thorough and systematic bug fixing that prevents similar issues in the future.*
