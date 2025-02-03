#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { spawn } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";

const TEMPLATE_DIR_JS = path
  .resolve(
    path.dirname(new URL(import.meta.url).pathname),
    "../templates/boilerplate"
  )
  .replace(/^\/([a-zA-Z]:)/, "$1");

const TEMPLATE_DIR_TS = path
  .resolve(
    path.dirname(new URL(import.meta.url).pathname),
    "../templates/boilerplate-ts"
  )
  .replace(/^\/([a-zA-Z]:)/, "$1");

async function main() {
  console.log(chalk.cyan("Welcome to fast-express-gen!"));

  const { projectName, language } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-app",
    },
    {
      type: "list",
      name: "language",
      message: "Choose your project language:",
      choices: [
        { name: chalk.yellow("JavaScript"), value: "js" },
        { name: chalk.blue("TypeScript"), value: "ts" }
      ],
    },
  ]);

  const targetDir = path.join(process.cwd(), projectName);
  const templateDir = language === "ts" ? TEMPLATE_DIR_TS : TEMPLATE_DIR_JS;

  console.log(chalk.green(`Creating ${language === "ts" ? "TypeScript" : "JavaScript"} project in ${targetDir}...`));
  await fs.mkdir(targetDir, { recursive: true });
  await copyTemplateFiles(templateDir, targetDir);

  try {
    await installDependencies(targetDir);
  } catch {
    await fs.rm(targetDir, { recursive: true, force: true });
    process.exit(1);
  }

  console.log(chalk.green("Your Express project is ready! 🚀"));
  console.log(`\nRun the following commands to get started:\n`);
  console.log(chalk.blue(`cd ${projectName}`));
  console.log(chalk.blue("npm run dev"));
  console.log(chalk.cyan("\nYour server will be running on http://localhost:3000"));
}

async function copyTemplateFiles(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await copyTemplateFiles(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function installDependencies(projectName) {
  const spinner = ora("Installing dependencies...").start();

  return new Promise((resolve, reject) => {
    const process = spawn("npm", ["install", "--silent"], {
      cwd: projectName,
      stdio: "ignore",
    });

    process.on("close", (code) => {
      if (code === 0) {
        spinner.succeed("Dependencies installed successfully! 🚀");
        resolve();
      } else {
        spinner.fail("Failed to install dependencies. Please run `npm install` manually.");
        reject(new Error("Dependency installation failed"));
      }
    });
  });
}

main().catch((err) => console.error(chalk.red(err)));
