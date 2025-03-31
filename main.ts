#!/usr/bin/env node

import { join } from 'path';
import { Eta } from 'eta';
import { glob } from 'glob';
import { runCommand } from './common/run';
import { initGitRepo } from './common/git';
import {
  intro,
  outro,
  log,
  spinner,
  text,
  confirm,
  select
} from '@clack/prompts';
import Haikunator from 'haikunator';
import {
  createProjectDir,
  renderTemplateFile,
  writeTemplateFile
} from './common/templates';
import { GrowOptions } from './common/models';

// Setup
const haikunator = new Haikunator();
const spin = spinner();

async function main() {
  intro('🌱 @sprout-lab/grow');

  const defaultProjectName = haikunator.haikunate({ tokenLength: 0 })
  const projectName = await text({
    message: 'Enter a name for your project:',
    defaultValue: defaultProjectName,
    placeholder: defaultProjectName
  }) as string;

  const projectType = await select<string>({
    message: 'Select a project type:',
    options: [
      { value: 'typescript', label: 'TypeScript' },
    ]
  }) as string;

  const defaultDescription = `@sprout-lab ${projectType} project`
  const projectDescription = await text({
    message: 'Enter a project description:',
    defaultValue: defaultDescription,
    placeholder: defaultDescription
  }) as string;

  const skipInstall = await confirm({
    message: 'Do you want to skip dependency installation?',
    initialValue: false
  }) as boolean;

  const skipTest = await confirm({
    message: 'Do you want to skip running tests?',
    initialValue: false
  }) as boolean;

  log.info(`Generating TypeScript project ${projectName}`);

  // Generate project files
  spin.start('Creating project files');
  const templateDir = join(
    __dirname,
    'templates',
    projectType
  );
  const projectPath = await createProjectDir(projectName);

  if (!projectPath) {
    console.error('Error creating project directory.');
    process.exit(1);
  }

  const templateFiles: string[] = await glob('**/*', {
    cwd: templateDir,
    nodir: true,
    dot: true,
    ignore: ['**/node_modules/**', '**/pnpm-lock.yaml'],
  });

  // Build options for templating
  const options: GrowOptions = {
    projectType,
    projectName,
    projectDescription,
    skipInstall,
    skipTest
  };

  // Render template files and write them to the directory
  await Promise.all(
    templateFiles.map(async (file: string) => {
      try {
        const template = await renderTemplateFile(join(templateDir, file), options);
        return await writeTemplateFile(join(projectPath, file), template);
      } catch (err) {
        console.error(err);
      }
    })
  );
  spin.stop('Project files created');

  // Install dependencies if not skipped
  if (!skipInstall) {
    spin.start("Installing dependencies with pnpm...");
    runCommand('pnpm install', projectPath);
    spin.stop('Installed dependencies');
  } else {
    log.info("Skipping dependency installation.");
  }

  // Run tests if not skipped
  if (!skipTest) {
    spin.start("Running tests with vitest...");
    runCommand('pnpm test --silent', projectPath);
    spin.stop("Tests passed");
  } else {
    log.info("Skipping tests.");
  }

  // Initialize a new git repository and make an initial commit
  spin.start("Creating git repository...");
  initGitRepo(projectPath);
  spin.stop("Git repo created");

  outro(`🌿 Finished generating application ${options.projectName}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
