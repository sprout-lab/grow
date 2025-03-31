import { join, dirname } from 'path';
import { Eta } from 'eta';
import { glob } from 'glob';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import mappings from './common/mappings';
import { runCommand } from './common/run';
import { initGitRepo } from './common/git';
import { intro, outro, log, spinner } from '@clack/prompts';
import Haikunator from 'haikunator';

interface GrowOptions {
  projectType: string;
  projectName: string;
  skipInstall: boolean;
  skipTest: boolean;
}

// Setup
const eta = new Eta();
const haikunator = new Haikunator()
const spin = spinner();


async function createProjectDir(projectName: string) {
  return mkdir(join(process.cwd(), projectName), { recursive: true });
}

async function renderTemplateFile(file: string, options: GrowOptions): Promise<string> {
  const template = await readFile(file, { encoding: 'utf8' });
  return eta.renderStringAsync(template, options);
}

async function writeTemplateFile(file: string, template: string): Promise<void> {
  const path = join(file);
  await mkdir(dirname(path), { recursive: true });
  return writeFile(path, template);
}

async function main() {

  // Start dummy data
  const seed = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
  const projectType = 'ts';
  const projectName = haikunator.haikunate({tokenLength: 0});
  const skipInstall = false;
  const skipTest = false;
  // End dummy data

  const options: GrowOptions = { projectType, projectName, skipInstall, skipTest };

  intro('🌱 @sprout-lab/grow');

  log.info(`Generating TypeScript project ${projectName}`);

  // Generate project files
  spin.start('Creating project files');

  const templateDir = join(__dirname, 'templates', mappings.PROJECT_TYPE_TEMPLATE_DIR[options.projectType]);
  const projectPath = await createProjectDir(options.projectName) as string;

  if (!projectPath) {
    console.error('Error creating project directory.');
  }

  const templateFiles: string[] = await glob(
    '**/*',
    {
      cwd: templateDir,
      nodir: true,
      dot: true,
      ignore: [
        '**/node_modules/**',
        '**/pnpm-lock.yaml'
      ],
    }
  );

  // Render template files and write them to the dir
  await Promise.all(
    templateFiles.map(async (file: string) => {
      try {
        const template = await renderTemplateFile(join(templateDir, file), options);
        return await writeTemplateFile(join(projectPath, file), template);
      } catch (err) {
        return console.error(err);
      }
    })
  );
  spin.stop('Project files created!');

  // Run pnpm install if not skipped
  if (!skipInstall) {
    spin.start("Installing dependencies with pnpm...");
    runCommand('pnpm install', projectPath);
    spin.stop('Installed dependencies!');
  } else {
    log.info("Skipping dependency installation.");
  }

  // Run tests if not skipped
  if (!skipTest) {
    spin.start("Running tests with vitest...");
    runCommand('pnpm test --silent', projectPath);
    spin.stop("Tests passed!");
  } else {
    log.info("Skipping tests.");
  }

  // Initialize a new git repository and make an initial commit
  spin.start("Creating git repository...");
  initGitRepo(projectPath);
  spin.stop("Git repo created!");

  outro(`🌿 Finished generating application ${projectName}!`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
