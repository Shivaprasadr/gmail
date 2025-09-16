# GitHub Copilot Instructions for AI-Powered Development Toolkit & Gmail Automation Suite

## Project Overview
This repository is a **comprehensive development framework** that combines AI-powered coding assistance with production-ready Gmail automation capabilities. The current email cleanup system serves as the foundation for an expandable suite of Gmail management tools.

### Project Architecture
- **Core Foundation**: AI development assistance and intelligent project structure
- **Primary Feature**: Automated Gmail email cleanup with OAuth2 authentication
- **Automation Layer**: GitHub Actions workflows for scheduled operations  
- **Security Layer**: Comprehensive token management and API protection
- **Expansion Ready**: Designed to support additional Gmail automation features

## Development Philosophy
## Development Philosophy
- **Security First**: All email operations must prioritize user privacy and data protection
- **Production Ready**: Code should be robust, well-tested, and deployment-ready
- **Scalable Design**: Architecture should support additional Gmail features and integrations
- **User Experience**: Focus on simple setup and intuitive configuration
- **API Best Practices**: Follow Gmail API guidelines, rate limiting, and error handling standards

## Code Style Guidelines

### General Rules
- Use clear, descriptive variable and function names
- Write self-documenting code with meaningful comments
- Follow consistent indentation (2 spaces for web technologies, 4 for Python)
- Keep functions small and focused on single responsibility
- Use error handling and validation everywhere

### Language-Specific Guidelines

#### JavaScript/TypeScript
- Use `const` by default, `let` when reassignment is needed
- Prefer arrow functions for short functions
- Use async/await over promises when possible
- Always handle errors in async functions
- Use TypeScript for type safety when possible

#### Python
- Follow PEP 8 style guidelines
- Use type hints for function parameters and return values
- Use descriptive docstrings for all functions and classes
- Prefer f-strings for string formatting
- Use virtual environments for dependency management

#### HTML/CSS
- Use semantic HTML elements
- Write accessible markup (ARIA labels, alt text)
- Use CSS custom properties for theming
- Mobile-first responsive design
- Optimize for performance (minimize CSS, use efficient selectors)

## Security Guidelines
- Never hardcode sensitive information (API keys, passwords, tokens)
- Use environment variables for configuration
- Validate all user inputs
- Implement proper authentication and authorization
- Use HTTPS for all communications
- Sanitize data before displaying or storing
- Follow OWASP security guidelines

## File Organization
```
project-root/
├── .github/
│   ├── copilot/
│   │   ├── instructions.md
│   │   ├── prompts/
│   │   └── templates/
│   └── workflows/
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── types/
├── docs/
├── tests/
└── config/
```

## Development Workflow
1. Always create feature branches from main
2. Write tests for new functionality
3. Update documentation when adding features
4. Follow the established code review process
5. Ensure all security checks pass before merging

## Testing Strategy
- Write unit tests for all business logic
- Include integration tests for API endpoints
- Test error scenarios and edge cases
- Maintain minimum 80% test coverage
- Use meaningful test descriptions

## Documentation Requirements
- README.md with clear setup instructions
- API documentation for all endpoints
- Code comments for complex logic
- Architecture decisions recorded
- Change log for major updates

## Performance Guidelines
- Optimize database queries
- Use caching strategically
- Minimize bundle sizes
- Implement lazy loading where appropriate
- Monitor and profile performance regularly

## Error Handling
- Use structured error handling
- Log errors with appropriate context
- Provide meaningful error messages to users
- Implement proper error recovery mechanisms
- Never expose internal errors to end users

## Accessibility
- Follow WCAG 2.1 AA guidelines
- Test with screen readers
- Ensure keyboard navigation works
- Use appropriate color contrast
- Provide alternative text for images

## AI Assistant Guidelines
When working with this codebase:
1. Always check existing patterns before creating new ones
2. Ask for clarification on requirements if ambiguous
3. Suggest improvements when you see opportunities
4. Consider the long-term maintainability of solutions
5. Prioritize security and performance in recommendations
6. Follow the established architectural patterns
7. Update relevant documentation when making changes

## Review Checklist
Before submitting code:
- [ ] Code follows style guidelines
- [ ] Security considerations addressed
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Performance impact considered
- [ ] Accessibility requirements met
- [ ] Error handling implemented
- [ ] Code is self-documenting

## Contact and Support
- Check the project documentation first
- Review existing issues before creating new ones
- Follow the issue templates when reporting bugs
- Provide clear reproduction steps for problems

---

*This file should be updated as the project evolves. Keep it current and relevant.*
