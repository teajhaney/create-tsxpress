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
import { rmSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to check if package manager is available
async function checkPackageManager(packageManager) {
  return new Promise(resolve => {
    const checkCmd =
      packageManager === 'npm'
        ? 'npm --version'
        : `${packageManager} --version`;
    const child = spawn(checkCmd, { shell: true, stdio: 'pipe' });

    child.on('close', code => {
      resolve(code === 0);
    });

    child.on('error', () => {
      resolve(false);
    });
  });
}

// Helper function to clean up project directory on failure
function cleanupProject(projectPath, isCurrentDir) {
  try {
    if (!isCurrentDir && existsSync(projectPath)) {
      rmSync(projectPath, { recursive: true, force: true });
    }
  } catch (error) {
    console.log(
      chalk.yellow(
        `\n⚠️  Warning: Could not clean up project directory: ${error.message}`
      )
    );
  }
}

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

  // Handle current directory case
  const isCurrentDir = projectName === '.' || projectName === './';
  const projectPath = isCurrentDir
    ? process.cwd()
    : join(process.cwd(), projectName);

  // Check if directory exists (only for non-current directory)
  if (!isCurrentDir && existsSync(projectPath)) {
    console.log(chalk.red(`\n❌ Directory "${projectName}" already exists!`));
    process.exit(1);
  }

  // For current directory, check if it's empty or has only git files
  if (isCurrentDir) {
    const files = fs.readdirSync(projectPath);
    const nonGitFiles = files.filter(
      file =>
        !file.startsWith('.git') &&
        file !== '.gitignore' &&
        file !== '.gitattributes'
    );

    if (nonGitFiles.length > 0) {
      console.log(
        chalk.yellow(
          `\n⚠️  Directory is not empty. Files will be added to existing directory.`
        )
      );
      console.log(chalk.dim('Non-git files found:'), nonGitFiles.join(', '));

      const { proceed } = await prompts({
        type: 'confirm',
        name: 'proceed',
        message: 'Do you want to continue?',
        initial: true,
      });

      if (!proceed) {
        console.log(chalk.red('\n❌ Setup cancelled'));
        process.exit(1);
      }
    }
  }

  // Check available package managers
  const checkSpinner = ora('Checking available package managers...').start();
  const availableManagers = [];

  const managers = ['npm', 'yarn', 'pnpm'];
  for (const manager of managers) {
    const isAvailable = await checkPackageManager(manager);
    if (isAvailable) {
      availableManagers.push({ title: manager, value: manager });
    }
  }

  checkSpinner.stop();

  if (availableManagers.length === 0) {
    console.log(
      chalk.red(
        '\n❌ No package managers found! Please install npm, yarn, or pnpm.'
      )
    );
    process.exit(1);
  }

  // Ask for package manager
  const { packageManager } = await prompts({
    type: 'select',
    name: 'packageManager',
    message: 'Which package manager do you want to use?',
    choices: availableManagers,
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
    if (!isCurrentDir) {
      mkdirSync(projectPath, { recursive: true });
    }

    // Copy template files
    const templatePath = join(__dirname, '../template');
    if (!existsSync(templatePath)) {
      throw new Error(
        'Template directory not found. Please reinstall the CLI tool.'
      );
    }

    cpSync(templatePath, projectPath, { recursive: true });

    // Update package.json with project name
    const packageJsonPath = join(projectPath, 'package.json');
    if (!existsSync(packageJsonPath)) {
      throw new Error('package.json not found in template');
    }

    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    packageJson.name = projectName;
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Create .env from env.example
    const envExamplePath = join(projectPath, 'env.example');
    const envPath = join(projectPath, '.env');
    if (existsSync(envExamplePath)) {
      cpSync(envExamplePath, envPath);
    }

    spinner.succeed(chalk.green('Project created successfully!'));

    // Install dependencies
    const installSpinner = ora(
      `Installing dependencies with ${packageManager}...`
    ).start();

    try {
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

        child.on('error', error => {
          reject(new Error(`Failed to start installation: ${error.message}`));
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
    } catch (installError) {
      installSpinner.fail(chalk.red('Failed to install dependencies'));
      console.error(chalk.red(`Installation error: ${installError.message}`));
      console.log(
        chalk.yellow('\nYou can manually install dependencies later:')
      );
      console.log(chalk.white(`  cd ${projectName}`));
      console.log(chalk.white(`  ${packageManager} install`));
      console.log(
        chalk.white(
          `  ${packageManager === 'npm' ? 'npm run' : packageManager} dev`
        )
      );
    }
  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    console.error(chalk.red(`Error: ${error.message}`));

    // Clean up on failure
    cleanupProject(projectPath, isCurrentDir);
    process.exit(1);
  }
}

main().catch(error => {
  console.error(chalk.red('An error occurred:'), error);
  process.exit(1);
});
