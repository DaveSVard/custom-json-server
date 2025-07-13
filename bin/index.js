#!/usr/bin/env node

import fs from "fs";
import path from "path";
import chalk from "chalk";
import { startServer } from "../lib/index.js";

const dbPathArg = process.argv[2];

if (!dbPathArg) {
  console.log(chalk.red("Please provide a path to db.json"));
  console.log(chalk.yellow("Example: npx json-server-by-david db.json"));
  process.exit(1);
}

const fullDbPath = path.resolve(process.cwd(), dbPathArg);

if (!fs.existsSync(fullDbPath)) {
  console.log(chalk.red(`File not found: ${fullDbPath}`));
  process.exit(1);
}

try {
  const content = fs.readFileSync(fullDbPath, "utf-8");
  const data = JSON.parse(content);

  if (!data.posts || !data.comments) {
    console.log(
      chalk.red("db.json must contain posts and comments arrays")
    );
    process.exit(1);
  }

  console.log(chalk.green("Starting JSON server..."));
  startServer(data, fullDbPath);
} catch (err) {
  console.error(chalk.red("Failed to read or parse db.json:"));
  console.error(chalk.red(err.message));
  process.exit(1);
}
