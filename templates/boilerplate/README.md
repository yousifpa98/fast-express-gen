# Fast Express Gen

🚀 **Fast Express Gen** is a CLI tool designed to generate a complete Express.js boilerplate in seconds. It provides a robust starting point for backend development with pre-configured features like middleware, routing, and error handling.

---

## 🌟 Features

- **Express.js Setup**: Fully configured Express server with modular architecture.
- **Middlewares**: Pre-installed and configured middlewares for security, logging, and compression.
- **Customization**: Choose your project name and structure.
- **Developer-Friendly**: Includes `nodemon` for hot-reloading and a `README.md` template for your generated project.

---

## 📦 Installation

You can use `npx` to run the CLI directly or install it globally.

### Using `npx`
```bash
npx fast-express-gen
```

### Global Installation
```bash
npm install -g fast-express-gen
```

---

## 🛠️ Usage

### Create a New Project
Run the following command to generate your project:
```bash
fast-express-gen <project-name>
```

Example:
```bash
fast-express-gen my-awesome-api
```

This will create a new directory `my-awesome-api` with a ready-to-use Express.js boilerplate.

---

## 🖇️ Project Structure

Below is the structure of the generated project:

```
<project-name>/
├── nodemon.json
├── package.json
├── README.md
└── src/
    ├── app.js
    ├── controllers/
    │   └── homeController.js
    ├── middleware/
    │   └── logger.js
    ├── routes/
    │   └── index.js
    └── server.js
```

---

## ⚙️ Features in Detail

1. **Security**:
   - Integrated `helmet` for secure HTTP headers.
   - CORS (Cross-Origin Resource Sharing) enabled for flexible API usage.

2. **Error Handling**:
   - Centralized error handling middleware.

3. **Logging**:
   - Request logging with `morgan`.

4. **Hot Reload**:
   - Pre-configured `nodemon` for live reloading during development.

---

## ✨ Example Output

### Console
```
Welcome to fast-express-gen!
✔ Project name: my-awesome-api
Creating project in /path/to/my-awesome-api...
Installing dependencies...
Your Express project is ready! 🚀

Run the following commands to get started:

cd my-awesome-api
npm run dev
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this tool, feel free to fork the repository and open a pull request.

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 💬 Questions or Feedback?

If you have any questions, suggestions, or feedback, please reach out to the repository owner. Happy coding! 😊