"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGitRepo = initGitRepo;
const child_process_1 = require("child_process");
function initGitRepo(projectPath) {
    (0, child_process_1.execSync)('git init', { cwd: projectPath, stdio: ['ignore', 'ignore', process.stderr] });
    (0, child_process_1.execSync)('git add .', { cwd: projectPath, stdio: ['ignore', 'ignore', process.stderr] });
    (0, child_process_1.execSync)('git commit -m "Initial commit via @sprout-lab/grow"', { cwd: projectPath, stdio: ['ignore', 'ignore', process.stderr] });
}
