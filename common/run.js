"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = runCommand;
const child_process_1 = require("child_process");
function runCommand(command, cwd) {
    (0, child_process_1.execSync)(command, {
        cwd,
        stdio: ['ignore', 'ignore', process.stderr]
    });
}
