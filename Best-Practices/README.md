# User Profile Card (React + TypeScript)

A simple and reusable User Profile Card component built using React and TypeScript, following modern best practices for:

- Naming Conventions
- Type Safety
- Linting with ESLint
- Formatting with Prettier

---

## Features

- Displays a user avatar, name, email, and online status.
- Reusable and customizable component.
- Type-safe props using TypeScript interfaces.
- Enforces code quality and consistency using ESLint and Prettier.

---

## Project Structure

```
user-profile-card/
  ├── public/
        ├── src/
        │     ├── components/
        |     |        └── UserProfileCard.tsx
        |     ├── App.tsx
        |     ├── index.css
        |     ├── main.tsx
        |
        ├── eslint.config.js # ESLint Flat Config
        ├── .prettierrc # Prettier Configuration
        ├── package.json

```

---

## Tech Stack

```
- React (with JSX)
- TypeScript
- ESLint (Flat Config - ESLint v9+)
- Prettier
```

---

## Available Scripts

### `npm run lint`

```
Runs ESLint on all `.ts` and `.tsx` files in the `src` folder.
```

### `npm run lint:fix`

```
Runs ESLint and automatically fixes problems where possible.
```

### `npm run format`

```
Runs Prettier to format the code.
```

## ESLint Highlights

```
Flat config structure using eslint.config.js

TypeScript and React plugin support

Custom rules:

Warns on unused variables

Enforces strict equality (===)

Warns on console.log usage

Enforces camelCase naming

```
