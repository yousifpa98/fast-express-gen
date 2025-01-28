#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { execSync } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";

const TEMPLATE_DIR = path
  .resolve(
    path.dirname(new URL(import.meta.url).pathname),
    "../templates/boilerplate"
  )
  .replace(/^\/([a-zA-Z]:)/, "$1");

async function main() {
  console.log(chalk.cyan("Welcome to fast-express-gen!"));

  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-app",
    },
  ]);

  const targetDir = path.join(process.cwd(), projectName);
  console.log(chalk.green(`Creating project in ${targetDir}...`));
  await fs.mkdir(targetDir, { recursive: true });
  await copyTemplateFiles(TEMPLATE_DIR, targetDir);

  console.log(chalk.yellow("Installing dependencies..."));
  execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });

  console.log(chalk.green("Your Express project is ready! 🚀"));
  console.log(`\nRun the following commands to get started:\n`);
  console.log(chalk.blue(`cd ${projectName}`));
  console.log(chalk.blue("npm run dev"));
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

main().catch((err) => console.error(chalk.red(err)));
