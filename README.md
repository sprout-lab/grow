# 🌱 @sprout-lab/grow 
A zero-config CLI for growing production-ready [@sprout-lab](https://github.com/sprout-lab) projects.

## ✨ Features
- Haiku-style default project names
- Interactive prompts for setup
- File templating via Eta 
- Optional pnpm install & vitest test run 
- Git repo auto-init

## 🚀 Usage
```bash
pnpx @sprout-lab/grow
```
You’ll be prompted to:
- Name your project
- Choose a project type (currently supports TypeScript)
- Add a description
- Optionally install dependencies and run tests

## 🗂 Templates
Templates live in the templates/ folder and are customizable. Extend them to support other stacks or org standards.

## 🛠 Development
```
pnpm install
pnpm build
pnpm link
grow
```

## 📦 Releasing
Handled via semantic-release on GitHub Actions. Just push conventional commits to main.

## 🌿 License
MIT – make things grow.