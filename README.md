# Test-Framework-Playwright-TS

Test Automation Framework created with Playwright and TS to test GAD app  
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
- prepare local env file: `cp .env-template .env`
- copy application main URL as value of `BASE_URL` in `.env` file

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
