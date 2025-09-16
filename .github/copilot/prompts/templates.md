# AI Prompt Templates for Gmail Project

This file contains reusable prompt templates for common development tasks. These templates ensure consistency and quality in AI-assisted development.

## Code Review Prompts

### Security Review
```
Please review the following code for security vulnerabilities:
- Check for input validation issues
- Look for potential injection attacks
- Verify proper authentication/authorization
- Identify any hardcoded secrets or credentials
- Check for proper error handling that doesn't expose sensitive info
- Verify secure communication protocols are used

Code to review:
[INSERT CODE HERE]
```

### Performance Review
```
Please analyze the following code for performance optimization:
- Identify potential bottlenecks
- Suggest caching opportunities
- Look for inefficient algorithms or queries
- Check for memory leaks or excessive resource usage
- Recommend async/await patterns where beneficial
- Suggest code splitting or lazy loading opportunities

Code to review:
[INSERT CODE HERE]
```

### Code Quality Review
```
Please review this code for maintainability and best practices:
- Check adherence to project coding standards
- Identify code duplication opportunities
- Suggest improvements for readability
- Verify proper error handling
- Check for appropriate comments and documentation
- Ensure single responsibility principle is followed

Code to review:
[INSERT CODE HERE]
```

## Development Task Prompts

### New Feature Implementation
```
I need to implement a new feature with the following requirements:
- Feature description: [DESCRIBE FEATURE]
- Acceptance criteria: [LIST CRITERIA]
- Security considerations: [SECURITY REQUIREMENTS]
- Performance requirements: [PERFORMANCE NEEDS]

Please provide:
1. Architecture overview
2. Implementation plan
3. Security considerations
4. Testing strategy
5. Documentation updates needed

Follow the project's coding standards and architectural patterns.
```

### Bug Fix Request
```
I need help fixing a bug with the following details:
- Bug description: [DESCRIBE BUG]
- Steps to reproduce: [REPRODUCTION STEPS]
- Expected behavior: [EXPECTED OUTCOME]
- Current behavior: [ACTUAL OUTCOME]
- Error messages: [ERROR DETAILS]

Please provide:
1. Root cause analysis
2. Proposed fix with explanation
3. Testing recommendations
4. Prevention strategies for similar issues

Ensure the fix maintains security and performance standards.
```

### Refactoring Request
```
I need to refactor the following code:
- Current code: [INSERT CODE]
- Issues with current implementation: [LIST ISSUES]
- Goals for refactoring: [IMPROVEMENT GOALS]
- Constraints: [ANY LIMITATIONS]

Please provide:
1. Refactored code with explanations
2. Benefits of the new approach
3. Migration strategy if needed
4. Updated tests
5. Documentation changes

Maintain backward compatibility where possible.
```

## Testing Prompts

### Unit Test Generation
```
Please generate comprehensive unit tests for the following code:
- Code to test: [INSERT CODE]
- Testing framework: [FRAMEWORK NAME]
- Coverage requirements: [COVERAGE GOALS]

Include tests for:
- Happy path scenarios
- Edge cases
- Error conditions
- Boundary values
- Security validations

Provide clear test descriptions and meaningful assertions.
```

### Integration Test Planning
```
I need integration tests for the following scenario:
- Feature/API: [DESCRIBE FEATURE]
- Dependencies: [LIST DEPENDENCIES]
- Data requirements: [TEST DATA NEEDS]
- Environment setup: [SETUP REQUIREMENTS]

Please provide:
1. Test plan with scenarios
2. Test data setup strategy
3. Mock/stub requirements
4. Cleanup procedures
5. CI/CD integration approach
```

## Documentation Prompts

### API Documentation
```
Please generate comprehensive API documentation for:
- Endpoint: [API ENDPOINT]
- Method: [HTTP METHOD]
- Purpose: [ENDPOINT PURPOSE]
- Parameters: [REQUEST PARAMETERS]
- Response format: [RESPONSE STRUCTURE]
- Error scenarios: [ERROR CASES]

Include:
- Clear descriptions
- Request/response examples
- Authentication requirements
- Rate limiting information
- Security considerations
```

### Code Documentation
```
Please add appropriate documentation to the following code:
- Code: [INSERT CODE]
- Documentation style: [JSDoc/Sphinx/etc]

Include:
- Function/class descriptions
- Parameter explanations
- Return value descriptions
- Usage examples
- Error conditions
- Security notes if applicable
```

## Architecture and Design Prompts

### System Design
```
I need help designing a system with these requirements:
- Functional requirements: [LIST FUNCTIONS]
- Non-functional requirements: [PERFORMANCE, SCALABILITY, etc]
- Constraints: [TECHNICAL/BUSINESS CONSTRAINTS]
- Integration points: [EXTERNAL SYSTEMS]

Please provide:
1. High-level architecture diagram description
2. Component breakdown
3. Data flow description
4. Security architecture
5. Scalability considerations
6. Technology recommendations
```

### Database Design
```
I need help designing a database schema for:
- Use case: [DESCRIBE USE CASE]
- Data entities: [LIST MAIN ENTITIES]
- Relationships: [DESCRIBE RELATIONSHIPS]
- Query patterns: [EXPECTED QUERIES]
- Scale requirements: [DATA VOLUME/PERFORMANCE]

Please provide:
1. Entity relationship diagram description
2. Table schemas with constraints
3. Index recommendations
4. Security considerations
5. Migration strategy
```

## Troubleshooting Prompts

### Performance Issue Investigation
```
I'm experiencing performance issues with:
- Affected component: [COMPONENT NAME]
- Symptoms: [DESCRIBE SYMPTOMS]
- When it occurs: [TRIGGERING CONDITIONS]
- Current metrics: [PERFORMANCE DATA]
- Environment: [PRODUCTION/STAGING/DEV]

Please help:
1. Identify potential root causes
2. Suggest investigation steps
3. Recommend monitoring strategies
4. Propose optimization solutions
```

### Security Incident Response
```
I need help with a security concern:
- Issue type: [VULNERABILITY TYPE]
- Affected components: [LIST COMPONENTS]
- Potential impact: [RISK ASSESSMENT]
- Current status: [CURRENT STATE]

Please provide:
1. Immediate action steps
2. Investigation approach
3. Mitigation strategies
4. Prevention recommendations
5. Communication plan
```

## Maintenance Prompts

### Dependency Updates
```
I need to update dependencies:
- Current versions: [LIST CURRENT VERSIONS]
- Target versions: [DESIRED VERSIONS]
- Update scope: [MAJOR/MINOR/PATCH]
- Testing strategy: [TESTING APPROACH]

Please help with:
1. Update compatibility analysis
2. Breaking changes identification
3. Migration steps
4. Testing recommendations
5. Rollback strategy
```

### Code Cleanup
```
I want to clean up legacy code:
- Code location: [FILE/MODULE PATH]
- Issues identified: [LIST PROBLEMS]
- Modernization goals: [TARGET IMPROVEMENTS]
- Compatibility requirements: [CONSTRAINTS]

Please provide:
1. Cleanup strategy
2. Modern alternatives
3. Risk assessment
4. Testing approach
5. Deployment plan
```

---

## Usage Instructions

1. **Copy the relevant prompt template**
2. **Fill in the bracketed placeholders with specific information**
3. **Add any project-specific context**
4. **Review and customize based on current needs**
5. **Save customized prompts for reuse**

## Template Maintenance

- Review and update templates quarterly
- Add new templates as common patterns emerge
- Remove or update obsolete templates
- Keep examples current with project standards
- Gather feedback from team members on effectiveness

---

*These templates should evolve with your project needs. Regularly review and improve them based on actual usage and results.*
