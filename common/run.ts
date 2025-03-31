import { execSync } from 'child_process';

export function runCommand(command: string, cwd: string) {
  execSync(command, {
    cwd,
    stdio: ['ignore', 'ignore', process.stderr]
  });
}