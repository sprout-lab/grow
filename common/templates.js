"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectDir = createProjectDir;
exports.renderTemplateFile = renderTemplateFile;
exports.writeTemplateFile = writeTemplateFile;
const promises_1 = require("node:fs/promises");
const path_1 = require("path");
const eta_1 = require("eta");
const eta = new eta_1.Eta();
async function createProjectDir(projectName) {
    return (0, promises_1.mkdir)((0, path_1.join)(process.cwd(), projectName), { recursive: true });
}
async function renderTemplateFile(file, options) {
    const template = await (0, promises_1.readFile)(file, { encoding: 'utf8' });
    return eta.renderStringAsync(template, options);
}
async function writeTemplateFile(file, template) {
    const path = (0, path_1.join)(file);
    await (0, promises_1.mkdir)((0, path_1.dirname)(path), { recursive: true });
    return (0, promises_1.writeFile)(path, template);
}
