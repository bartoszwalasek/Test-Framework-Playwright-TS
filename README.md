# Testing-Framework-Playwright-TS

Automation Testing Framework created with Playwright and TS to test GAD app  
Repository: https://github.com/jaktestowac/gad-gui-api-demo

## Prepare

### Local recommended tools:

- VS Code
- Git
- Node.js version>16

### Installation and setup

- install VSC recommended plugins (optional)
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install`
- setup husky with: `npx husky init`

## Use

Run all tests:

```
npm run test
```

Run all tests with tags:

```
npx playwright test --grep @GAD-R01-01
```

Run all tests without tags:

```
npx playwright test --grep-invert @GAD-R01-02
```

For more usage cases look in `package.json` scripts section.
