# Astro Async-Loader

[![npm](https://badgen.net/badge/icon/npm?icon=npm&label)](https://www.npmjs.com)
[![total npm downloads](https://badgen.net/npm/dt/astro-async-loader)](https://www.npmjs.com/package/astro-async-loader)
[![latest npm release](https://img.shields.io/npm/v/astro-async-loader)](https://www.npmjs.com/package/astro-async-loader?activeTab=versions)
[![npm package license](https://badgen.net/npm/license/astro-async-loader)](https://www.npmjs.com/package/astro-async-loader)

## Folder Structure

```plaintext
├── .vscode/                    # VS Code settings folder
│   ├── settings.json           # Workspace settings
│   └── extensions.json         # Recommended extensions to install
├── example/                    # Preview Your component here
├── src/                        # Your component source code
│   ├── Component.astro         # Example component file
│   └── main.ts                 # Example source code file
├── test/                       # Your component tests
│   └── example.test.js         # Example tests
└── index.ts                    # Should contain all the exports your component provide to users
```

ESLint, Prettier and EditorConfig settings are respectively located in the following files: `.eslintrc.js`, `.prettierrc.js` and `.editorconfig` at the root of this template project.

## Commands

The following npm scripts are provided to lint and format your project:

| Command          | Action                                                        |
| :--------------- | :------------------------------------------------------------ |
| `npm run test`   | Run tests using Mocha                                         |
| `npm run format` | Format your project using Prettier, this edits files in-place |
| `npm run lint`   | Lint your project using ESLint                                |
| `npm run dev`    | Run dev inside example project                                |

In VS Code, you can access those commands in the Explorer in the `NPM Scripts` section.
