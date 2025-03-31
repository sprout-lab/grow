import { execSync } from 'child_process';

export function initGitRepo(projectPath: string) {
  execSync('git init', { cwd: projectPath, stdio: ['ignore', 'ignore', process.stderr] });
  execSync('git add .', { cwd: projectPath, stdio: ['ignore', 'ignore', process.stderr] });
  execSync('git commit -m "Initial commit via @sprout-lab/grow"', { cwd: projectPath, stdio: ['ignore', 'ignore', process.stderr] });
}