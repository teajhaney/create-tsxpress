# **`create-tsxpress`: Rapid Express + TypeScript API Scaffolding CLI**

A powerful ⚡️ Command Line Interface (CLI) tool designed to streamline the setup of new Express.js applications with TypeScript. `create-tsxpress` rapidly generates a production-ready boilerplate, enabling developers to kickstart their backend projects with best practices built-in. This project itself is a CLI that leverages various modern Node.js tools to provide an intuitive and efficient project creation experience. 🚀

---

## 🚀 Getting Started

### Usage

To scaffold a new Express + TypeScript project, simply run:

```bash
npx create-tsxpress <app-name>
```

Replace `<app-name>` with your desired project folder name.

This command will generate a complete Express.js + TypeScript setup with best practices, dependencies, and development scripts ready to use.

---

## ✨ Features

`create-tsxpress` generates projects with a robust, opinionated structure, emphasizing developer experience and production readiness. Key features of the generated template include:

- **TypeScript Integration**: Leverage strong typing and modern ECMAScript features for robust and maintainable code.
- **Express.js Framework**: A minimal and flexible Node.js web application framework.
- **Production-Ready Structure**: An organized and scalable project layout, promoting modularity and clean architecture.
- **Enhanced Security**: Integrates `helmet` for HTTP header security, `cors` for cross-origin resource sharing, and `express-rate-limit` to protect against brute-force attacks.
- **Centralized Error Handling**: Custom middleware for elegant handling of application-specific and unexpected errors, including a `notFoundHandler` and `errorHandler`.
- **Structured Logging**: Utilizes `winston` for comprehensive and customizable logging, making debugging and monitoring easier.
- **Environment Configuration**: Seamless integration with `dotenv` for managing sensitive credentials and environment-specific settings.
- **Developer Experience**: Configured with `nodemon` for automatic server restarts on file changes and `tsconfig-paths` for cleaner import aliases.

## 🛠️ Technologies Used

| Technology             | Description                                             | Link                                                                                                       |
| :--------------------- | :------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| **Node.js**            | JavaScript runtime environment                          | [nodejs.org](https://nodejs.org/)                                                                          |
| **TypeScript**         | Superset of JavaScript with type safety                 | [typescriptlang.org](https://www.typescriptlang.org/)                                                      |
| **Express.js**         | Fast, unopinionated, minimalist web framework           | [expressjs.com](https://expressjs.com/)                                                                    |
| **Winston**            | Versatile logging library                               | [github.com/winstonjs/winston](https://github.com/winstonjs/winston)                                       |
| **Helmet**             | Secures Express apps by setting HTTP headers            | [helmetjs.github.io](https://helmetjs.github.io/)                                                          |
| **CORS**               | Middleware for enabling Cross-Origin Resource Sharing   | [expressjs.com/en/resources/middleware/cors.html](https://expressjs.com/en/resources/middleware/cors.html) |
| **Express Rate Limit** | Basic rate-limiting middleware for Express applications | [www.npmjs.com/package/express-rate-limit](https://www.npmjs.com/package/express-rate-limit)               |
| **Dotenv**             | Loads environment variables from a `.env` file          | [github.com/motdotla/dotenv](https://github.com/motdotla/dotenv)                                           |
| **Nodemon**            | Monitors for changes and automatically restarts         | [nodemon.io](https://nodemon.io/)                                                                          |
| **Commander.js**       | Node.js command-line interfaces made easy               | [www.npmjs.com/package/commander](https://www.npmjs.com/package/commander)                                 |
| **Inquirer.js**        | Common interactive command-line user interfaces         | [www.npmjs.com/package/inquirer](https://www.npmjs.com/package/inquirer)                                   |
| **Chalk**              | Terminal string styling done right                      | [www.npmjs.com/package/chalk](https://www.npmjs.com/package/chalk)                                         |
| **Ora**                | Elegant terminal spinner                                | [www.npmjs.com/package/ora](https://www.npmjs.com/package/ora)                                             |
| **Degit**              | Straightforward project scaffolding                     | [github.com/Rich-Harris/degit](https://github.com/Rich-Harris/degit)                                       |

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. We welcome contributions to `create-tsxpress`!

- ✨ Fork the repository on GitHub.
- 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`).
- 📝 Commit your changes (`git commit -m 'Add some AmazingFeature'`).
- 🚀 Push to the branch (`git push origin feature/AmazingFeature`).
- 📬 Open a Pull Request, describing your changes and their benefits.

## 📝 License

This project is licensed under the MIT License. See the `package.json` file for more details.

## 👤 Author

**Yusuf Tijani Olatunde (섭이)**

- **Email**: `teajhaney@gmail.com`
- **LinkedIn**: `https://www.linkedin.com/in/yusuf-tijani-605b04167/`
- **Twitter**: `https://x.com/teajhaney`
- **GitHub**: `https://github.com/teajhaney`

_(The template created by this CLI was originally authored by Yusuf Tijani Olatunde (섭이).)_

---

## 📊 Project Badges

[![npm version](https://badge.fury.io/js/create-tsxpress.svg)](https://www.npmjs.com/package/create-tsxpress)
[![npm downloads](https://img.shields.io/npm/dm/create-tsxpress)](https://www.npmjs.com/package/create-tsxpress)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-green?logo=nodedotjs)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Framework-Express.js-gray?logo=express)](https://expressjs.com/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
