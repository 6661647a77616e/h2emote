

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and ESLint rules for a smooth development experience.

## Plugins Available

Currently, there are two official plugins to enable React in Vite:

1. **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)**  
   Uses [Babel](https://babeljs.io/) for Fast Refresh.

2. **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**  
   Uses [SWC](https://swc.rs/) for Fast Refresh.

## Expanding ESLint Configuration

If you're developing a production-grade application, we recommend expanding the ESLint configuration to enable type-aware lint rules. Here’s how you can do that:

1. **Configure `parserOptions` in your ESLint config:**

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

2. **Switch to type-checked linting rules:**

Update `tseslint.configs.recommended` to use type-checked configurations:

```js
tseslint.configs.recommendedTypeChecked
// or
tseslint.configs.strictTypeChecked
```

Optionally, you can add stylistic rules:

```js
...tseslint.configs.stylisticTypeChecked
```

3. **Install React ESLint Plugin:**

Install the `eslint-plugin-react` and update your ESLint config:

```bash
npm install eslint-plugin-react --save-dev
```

Then, update your ESLint configuration file:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the React version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the React plugin
    react,
  },
  rules: {
    // Enable recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Modules Used

To add the necessary modules and components for your project, you can use the following commands:

```bash
# Install moji-translate for emoji translation
npm install moji-translate

# Install the Button component from ShadCN UI
npx shadcn@latest add button

# Install the Skeleton component from ShadCN UI
npx shadcn@latest add skeleton

# Install the Card component from ShadCN UI
npx shadcn@latest add card
```

