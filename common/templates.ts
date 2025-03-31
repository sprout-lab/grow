import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'path';
import { GrowOptions } from './models';
import { Eta } from 'eta';

const eta = new Eta();

export async function createProjectDir(projectName: string) {
  return mkdir(join(process.cwd(), projectName), { recursive: true });
}

export async function renderTemplateFile(file: string, options: GrowOptions): Promise<string> {
  const template = await readFile(file, { encoding: 'utf8' });
  return eta.renderStringAsync(template, options);
}

export async function writeTemplateFile(file: string, template: string): Promise<void> {
  const path = join(file);
  await mkdir(dirname(path), { recursive: true });
  return writeFile(path, template);
}