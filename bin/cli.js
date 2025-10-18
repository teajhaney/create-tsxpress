#!/usr/bin/env node


import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs, {
  existsSync,
  mkdirSync,
  cpSync,
  writeFileSync,
  readFileSync,
} from 'fs';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log(chalk.bold.cyan('\n🚀 Create Express + TypeScript App\n'));

  // Get project name from args or prompt
  let projectName = process.argv[2];

  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'What is your project name? (use . for current folder)',
      initial: 'my-express-app',
      validate: value => {
        if (!value) return 'Project name is required';

        // Allow current directory indicators
        if (value === '.' || value === './') return true;

        // Otherwise enforce normal name pattern
        if (!/^[a-z0-9-_]+$/.test(value)) {
          return 'Project name can only contain lowercase letters, numbers, hyphens, and underscores';
        }
        return true;
      },
    });

    if (!response.projectName) {
      console.log(chalk.red('\n❌ Project creation cancelled'));
      process.exit(1);
    }

    projectName = response.projectName;
  }

  const projectPath = join(process.cwd(), projectName);

  // Check if directory exists
  // Resolve the absolute target directory
  const targetDir = join(process.cwd(), projectName);

  // If projectName is "." or "./", we allow it (current dir)
  const isCurrentDir = projectName === '.' || projectName === './';

  if (existsSync(targetDir) && !isCurrentDir) {
    console.log(chalk.red(`\n❌ Directory "${projectName}" already exists!`));
    process.exit(1);
  }

  // Ask for package manager
  const { packageManager } = await prompts({
    type: 'select',
    name: 'packageManager',
    message: 'Which package manager do you want to use?',
    choices: [
      { title: 'npm', value: 'npm' },
      { title: 'yarn', value: 'yarn' },
      { title: 'pnpm', value: 'pnpm' },
    ],
    initial: 0,
  });

  if (!packageManager) {
    console.log(chalk.red('\n❌ Setup cancelled'));
    process.exit(1);
  }

  // Create project
  const spinner = ora('Creating project...').start();

  try {
    // Create project directory
    mkdirSync(projectPath, { recursive: true });

    // Copy template files
    const templatePath = join(__dirname, '../template');
    cpSync(templatePath, projectPath, { recursive: true });

    // Update package.json with project name
    const packageJsonPath = join(projectPath, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    packageJson.name = projectName;
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Create .env from .env.example
    const envExamplePath = join(projectPath, '.env.example');
    const envPath = join(projectPath, '.env');
    if (existsSync(envExamplePath)) {
      cpSync(envExamplePath, envPath);
    }

    spinner.succeed(chalk.green('Project created successfully!'));

    // Install dependencies
    const installSpinner = ora(
      `Installing dependencies with ${packageManager}...`
    ).start();

    await new Promise((resolve, reject) => {
      const installCmd =
        packageManager === 'yarn' ? 'yarn' : `${packageManager} install`;
      const child = spawn(installCmd, {
        cwd: projectPath,
        shell: true,
        stdio: 'pipe',
      });

      child.on('close', code => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Installation failed with code ${code}`));
        }
      });
    });

    installSpinner.succeed(chalk.green('Dependencies installed!'));

    // Success message
    console.log(chalk.bold.green('\n✨ All set! Your project is ready.\n'));
    console.log(chalk.cyan('Next steps:\n'));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(
      chalk.white(
        `  ${packageManager === 'npm' ? 'npm run' : packageManager} dev`
      )
    );
    console.log(
      chalk.dim('\n  Edit .env to configure your environment variables')
    );
    console.log(
      chalk.dim('  Visit http://localhost:3000 once the server starts\n')
    );
  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

main().catch(error => {
  console.error(chalk.red('An error occurred:'), error);
  process.exit(1);
});
