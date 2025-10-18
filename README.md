# ✨ create-expts: Scaffold Your Next Express + TypeScript API in Seconds

`create-expts` is a powerful Command Line Interface (CLI) tool designed to streamline the setup of new Express.js and TypeScript API projects. It provides a robust, production-ready starter template, focusing on best practices, developer experience, and high-performance architecture. Get your backend API up and running with essential features like error handling, security, and structured logging in moments! 🚀

## Features

-   **Rapid Project Scaffolding**: Quickly generate a new Express + TypeScript project with a single command.
-   **Production-Ready Template**: Comes pre-configured with essential middleware and utilities for robust backend development.
-   **Robust Error Handling**: Centralized error handling for both operational and unexpected errors, improving API reliability.
-   **API Security Best Practices**: Includes `helmet` for HTTP header security, `cors` for cross-origin resource sharing, and `express-rate-limit` to protect against brute-force attacks.
-   **Structured Logging**: Integrates `winston` for intelligent, customizable logging across different environments (console, file).
-   **TypeScript Support**: Fully configured for TypeScript development, offering type safety and improved code maintainability.
-   **Environment Configuration**: Seamless `dotenv` integration for managing environment-specific variables.
-   **Path Aliases**: Pre-configured `tsconfig-paths` for cleaner import statements.

## Technologies Used

| Category         | Technology                 | Description                                                                 |
| :--------------- | :------------------------- | :-------------------------------------------------------------------------- |
| **CLI Core**     | [Node.js](https://nodejs.org/)             | JavaScript runtime environment.                                             |
|                  | [TypeScript](https://www.typescriptlang.org/)     | Statically typed superset of JavaScript.                                    |
|                  | [Commander](https://github.com/tj/commander.js) | Node.js command-line interfaces.                                            |
|                  | [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) | Interactive command-line prompts.                                           |
|                  | [Chalk](https://github.com/chalk/chalk)       | Terminal string styling.                                                    |
|                  | [Ora](https://github.com/sindresorhus/ora)         | Elegant terminal spinner.                                                  |
|                  | [Degit](https://github.com/Rich-Harris/degit)   | Download git repositories.                                                  |
| **API Template** | [Express.js](https://expressjs.com/)       | Fast, unopinionated, minimalist web framework for Node.js.                  |
|                  | [Dotenv](https://github.com/motdotla/dotenv)   | Loads environment variables from a `.env` file.                             |
|                  | [Helmet](https://helmetjs.github.io/)     | Helps secure Express apps by setting various HTTP headers.                  |
|                  | [CORS](https://github.com/expressjs/cors)     | Provides a Connect/Express middleware for enabling CORS.                    |
|                  | [Express Rate Limit](https://github.com/express-rate-limit/express-rate-limit) | Basic rate-limiting middleware for Express.                                 |
|                  | [Winston](https://github.com/winstonjs/winston) | A versatile logging library.                                                |
|                  | [Nodemon](https://nodemon.io/)     | Monitors for any changes in your source and automatically restarts your server. |
|                  | [TS-Node](https://github.com/TypeStrong/ts-node) | TypeScript execution environment for Node.js.                               |
|                  | [TSConfig Paths](https://github.com/dividab/tsconfig-paths) | Enable absolute module imports in TypeScript.                               |

## Getting Started

Follow these steps to set up and use `create-expts` to generate your new API project.

### Installation

To use `create-expts` as a global CLI tool:

```bash
npm install -g create-expts
```

Alternatively, you can use `npx` to run it without global installation:

```bash
npx create-expts
```

To contribute to `create-expts` development:

```bash
# 👯 Clone the repository
git clone https://github.com/teajhaney/express-typescript-template.git
cd express-typescript-template

# 📦 Install dependencies for the CLI tool
npm install

# 🛠️ Build the CLI tool
npm run build

# 🚀 Run the CLI tool locally for testing
npm run dev
```

### Usage

Once installed, you can generate a new Express + TypeScript project by running:

```bash
npx create-expts my-api-project
```

Or if installed globally:

```bash
create-expts my-api-project
```

The CLI will prompt you to confirm the project name and then scaffold the directory.

```
? Project name: my-api-project
✨ Scaffolding project...
```

After successful scaffolding, navigate into your new project directory:

```bash
cd my-api-project
```

Then, install its dependencies:

```bash
npm install
```

### Running Your Generated API Project

Your newly generated project comes with convenient scripts:

1.  **Environment Variables**: Create a `.env` file in the root of your `my-api-project` directory.

    ```dotenv
    PORT=5000
    NODE_ENV=development
    ```

    *   `PORT`: The port your API server will listen on.
    *   `NODE_ENV`: The environment your application is running in (e.g., `development`, `production`).

2.  **Development Mode**:
    ```bash
    npm run dev
    ```
    This will start the server with `nodemon`, automatically restarting on file changes.

3.  **Build for Production**:
    ```bash
    npm run build
    ```
    This compiles your TypeScript code to JavaScript.

4.  **Start Production Server**:
    ```bash
    npm run start
    ```
    This runs the compiled JavaScript code from the `dist` directory.

## Contributing

We welcome contributions to `create-expts`! If you have suggestions for improvements or new features, please follow these guidelines:

*   🐛 **Bug Reports**: Open an issue detailing the bug, including steps to reproduce it.
*   💡 **Feature Requests**: Open an issue to propose new features or enhancements.
*   🚀 **Pull Requests**:
    *   Fork the repository.
    *   Create a new branch (`git checkout -b feature/your-feature`).
    *   Make your changes and ensure the code adheres to existing style.
    *   Commit your changes (`git commit -m 'feat: Add new feature'`).
    *   Push to the branch (`git push origin feature/your-feature`).
    *   Open a pull request.

Please ensure your code is well-tested and follows the project's coding standards.

## License

This project is licensed under the MIT License. See the `package.json` file for details.

## Author

**Yusuf Tijani Olatunde (섭이)**

Connect with me:

*   LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)
*   Twitter: [@your_twitter](https://twitter.com/your_twitter)
*   Portfolio: [your-portfolio.com](https://your-portfolio.com)

---

[![Node.js Version](https://img.shields.io/badge/Node.js-18.x+-blue.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/create-expts?style=flat)](https://www.npmjs.com/package/create-expts)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)