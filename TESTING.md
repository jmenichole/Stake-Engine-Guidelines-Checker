# Testing and Code Quality Setup

This document outlines the testing and code quality tools configured for the Stake Engine Guidelines Checker project.

## Testing with Vitest

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Files

Test files are located alongside the components they test with a `.test.tsx` extension:

- `components/Icon.test.tsx` - Icon component tests
- `components/Header.test.tsx` - Header component tests
- `components/ErrorBoundary.test.tsx` - ErrorBoundary component tests

### Writing Tests

Tests use Vitest and React Testing Library. Example:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## Linting with ESLint

### Running Linter

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Configuration

ESLint is configured with:
- TypeScript support
- React and React Hooks rules
- Prettier integration
- Strict type checking

See `eslint.config.mjs` for full configuration.

## Code Formatting with Prettier

### Running Formatter

```bash
# Format all files
npm run format

# Check formatting without making changes
npm run format:check
```

### Configuration

Prettier is configured to:
- Use single quotes
- Add semicolons
- Use 2-space indentation
- Max line width of 100 characters

See `.prettierrc.json` for full configuration.

## TypeScript Type Checking

### Running Type Check

```bash
npm run type-check
```

### Strict Mode Enabled

TypeScript strict mode is enabled with additional checks:
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedIndexedAccess: true`
- `noImplicitOverride: true`
- `noPropertyAccessFromIndexSignature: true`

See `tsconfig.json` for full configuration.

## CI/CD Integration

These scripts can be integrated into your CI/CD pipeline:

```bash
# Run all checks
npm run type-check && npm run lint && npm test -- --run && npm run build
```

## Current Test Coverage

- Icon Component: 6 tests
- Header Component: 3 tests
- ErrorBoundary Component: 4 tests
- **Total: 13 tests passing**

## Next Steps

1. Add tests for remaining components
2. Increase coverage to 70%+
3. Add integration tests
4. Set up pre-commit hooks with husky
5. Configure coverage thresholds
