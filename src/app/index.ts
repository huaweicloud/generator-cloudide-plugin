/********************************************************************************
 * Copyright (C) 2022. Huawei Technologies Co., Ltd. All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import Generator = require('yeoman-generator');
import yosay = require('yosay');

interface CommandLineOption {
    type?: string;
    engineOfTemplate?: string;
    name?: string;
    version?: string;
    publisher?: string;
    author?: string;
    license?: string;
    displayName?: string;
    description?: string;
    keywords?: string;
    repository?: string;
}

class CloudIdeGenerator extends Generator {
    constructor(args: string[], opts: any) {
        super(args, opts);
        this.argument('name', { type: String, required: false, description: 'The name of the plugin' });

        this.option('type', { alias: 't', description: 'plugin type', type: String });
        this.option('engineOfTemplate', { alias: 'e', description: 'template engine for plugin view', type: String });
        this.option('version', {
            alias: 'v',
            description: 'Semantic Versioning of the plugin',
            default: '0.0.1',
            type: String
        });
        this.option('publisher', { alias: 'p', description: 'The publisher name', type: String });
        this.option('author', { alias: 'a', description: 'The plugin author', type: String });
        this.option('license', { alias: 'l', description: 'The plugin license', type: String });
        this.option('description', { alias: 'd', description: 'The plugin description', type: String });
        this.option('repository', {
            alias: 'r',
            description: 'Initializing plugin folder with git init',
            type: String
        });
    }

    async prompting() {
        this.log(yosay('welcome to Huawei CodeArts plugin generator!'));

        const opts = this.options as CommandLineOption;
        if (!opts.type) {
            const answers = await this.prompt({
                type: 'list',
                name: 'type',
                message: `Which type of plugin do you want to create?`,
                choices: [
                    {
                        name: 'Simple Plugin',
                        value: 'simple'
                    },
                    {
                        name: 'Plugin with exposable webview and dialog support',
                        value: 'webview'
                    },
                    {
                        name: 'Plugin to register a project wizard',
                        value: 'project-wizard'
                    }
                ]
            });
            opts.type = answers.type;
        }

        if ((opts.type === 'webview' || this.options.type === 'project-wizard') && !opts.engineOfTemplate) {
            const answers = await this.prompt({
                type: 'list',
                name: 'engineOfTemplate',
                message: `Which template engine do you want to enable?`,
                choices: [
                    {
                        name: 'None - No template engine is enabled, only html tag can be supported, i18n in plugin page will not be supported.',
                        value: 'none'
                    },
                    {
                        name: 'EJS - Enable EJS template engine for plugin page.',
                        value: 'ejs'
                    },
                    {
                        name: 'Pug - Enable Pug template engine for plugin page.',
                        value: 'pug'
                    }
                ]
            });
            opts.engineOfTemplate = answers.engineOfTemplate;
        }

        if (!opts.name) {
            const answers = await this.prompt({
                type: 'input',
                name: 'name',
                message: `What's the name of your plugin?`,
                default: this.appname.trim().replace(/\s+/g, '-')
            });
            opts.name = answers.name;
        }

        if (!opts.publisher) {
            const answers = await this.prompt({
                type: 'input',
                name: 'publisher',
                message: `Who's the publisher(your Huawei cloud account name) of your plugin?`
            });
            opts.publisher = answers.publisher;
        }

        if (!opts.author) {
            const answers = await this.prompt({
                type: 'input',
                name: 'author',
                message: `Who's the author of your plugin?`,
                default: opts.publisher
            });
            opts.author = answers.author;
        }

        if (!opts.license) {
            const answers = await this.prompt({
                type: 'list',
                name: 'license',
                message: `What' the license of your plugin?`,
                choices: [
                    {
                        name: 'MIT License',
                        value: 'MIT'
                    },
                    {
                        name: 'BSD 2-Clause "Simplified" License',
                        value: 'BSD'
                    }
                ]
            });
            opts.license = answers.license;
        }

        if (!opts.description) {
            const answers = await this.prompt({
                type: 'input',
                name: 'description',
                message: `What's the description of your plugin?`
            });
            opts.description = answers.description;
        }

        if (!opts.repository) {
            const answers = await this.prompt({
                type: 'list',
                name: 'repository',
                message: 'Initialize your plugin folder with git init?',
                choices: [
                    {
                        name: 'NO',
                        value: 'NO'
                    },
                    {
                        name: 'YES',
                        value: 'YES'
                    }
                ]
            });
            opts.repository = answers.repository;
        }
    }

    writing() {
        const generatedYear = new Date().getFullYear().toString();

        this.sourceRoot(__dirname + '/../../templates/');
        const templateData = {
            year: generatedYear,
            type: this.options.type,
            engineOfTemplate: this.options.engineOfTemplate,
            name: this.options.name,
            publisher: this.options.publisher,
            author: this.options.author,
            license: this.options.license,
            description: this.options.description,
            version: this.options.version
        };

        // copy project setting files
        this.fs.copy(this.templatePath(`config/.arts`), this.destinationPath(this.options.name, '.arts'));

        // generate license file
        this.fs.copyTpl(
            this.templatePath(`common/LICENSE-${this.options.license}`),
            this.destinationPath(this.options.name, 'LICENSE'),
            templateData
        );

        // generate README.md file
        this.fs.copyTpl(
            this.templatePath(`common/README.ejs`),
            this.destinationPath(this.options.name, 'README.md'),
            templateData
        );

        // generate plugin file
        this.fs.copyTpl(
            this.templatePath(`code/plugin.ts`),
            this.destinationPath(this.options.name, 'src/plugin.ts'),
            templateData
        );

        // generate extension test source file
        this.fs.copyTpl(
            this.templatePath(`test/example.ts`),
            this.destinationPath(this.options.name, 'src/test/example.ts'),
            templateData
        );

        // generate extension test file
        this.fs.copyTpl(
            this.templatePath(`test/extension.test.ts`),
            this.destinationPath(this.options.name, 'src/test/suite/extension.test.ts'),
            templateData
        );

        // generate extension index file
        this.fs.copyTpl(
            this.templatePath(`test/index.ts`),
            this.destinationPath(this.options.name, 'src/test/suite/index.ts'),
            templateData
        );

        // generate runTest file
        this.fs.copyTpl(
            this.templatePath(`test/runTest.ts`),
            this.destinationPath(this.options.name, 'src/test/runTest.ts'),
            templateData
        );

        if (this.options.type === 'webview' || this.options.type === 'project-wizard') {
            // generate backend file
            this.fs.copyTpl(
                this.templatePath(`code/backend.ts`),
                this.destinationPath(this.options.name, 'src/node/backend.ts'),
                templateData
            );

            // start to generate frontend related files
            // generate frontend file
            this.fs.copyTpl(
                this.templatePath(`code/frontend.ts`),
                this.destinationPath(this.options.name, 'src/browser/frontend.ts'),
                templateData
            );

            if (this.options.type === 'webview') {
                // generate dynamic-webview.ts
                this.fs.copyTpl(
                    this.templatePath(`code/dynamic-webview.ts`),
                    this.destinationPath(this.options.name, 'src/browser/dynamic-webview.ts'),
                    templateData
                );
            }

            // generate webpack config file
            this.fs.copyTpl(
                this.templatePath(`config/webpack.config.js`),
                this.destinationPath(this.options.name, 'webpack.config.js'),
                templateData
            );

            // copy resource files
            this.fs.copy(this.templatePath(`resources`), this.destinationPath(this.options.name, 'resources'));
            if (this.options.engineOfTemplate === 'ejs') {
                this.fs.delete(this.destinationPath(this.options.name, 'resources/page/html'));
                this.fs.delete(this.destinationPath(this.options.name, 'resources/page/pug'));
                this.fs.move(
                    this.destinationPath(this.options.name, 'resources/page/ejs/index.ejs'),
                    this.destinationPath(this.options.name, 'resources/page/index.ejs')
                );
                if (this.options.type === 'webview') {
                    this.fs.move(
                        this.destinationPath(this.options.name, 'resources/page/ejs/dynamic-webview.ejs'),
                        this.destinationPath(this.options.name, 'resources/page/dynamic-webview.ejs')
                    );
                }

                this.fs.delete(this.destinationPath(this.options.name, 'resources/page/ejs'));
            } else if (this.options.engineOfTemplate === 'pug') {
                this.fs.delete(this.destinationPath(this.options.name, 'resources/page/html'));
                this.fs.delete(this.destinationPath(this.options.name, 'resources/page/ejs'));
                this.fs.move(
                    this.destinationPath(this.options.name, 'resources/page/pug/index.pug'),
                    this.destinationPath(this.options.name, 'resources/page/index.pug')
                );
                if (this.options.type === 'webview') {
                    this.fs.move(
                        this.destinationPath(this.options.name, 'resources/page/pug/dynamic-webview.pug'),
                        this.destinationPath(this.options.name, 'resources/page/dynamic-webview.pug')
                    );
                }

                this.fs.delete(this.destinationPath(this.options.name, 'resources/page/pug'));
            } else {
                this.fs.delete(this.destinationPath(this.options.name, 'resources/page/pug'));
                this.fs.delete(this.destinationPath(this.options.name, 'resources/page/ejs'));
                this.fs.move(
                    this.destinationPath(this.options.name, 'resources/page/html/index.html'),
                    this.destinationPath(this.options.name, 'resources/page/index.html')
                );
                if (this.options.type === 'webview') {
                    this.fs.move(
                        this.destinationPath(this.options.name, 'resources/page/html/dynamic-webview.html'),
                        this.destinationPath(this.options.name, 'resources/page/dynamic-webview.html')
                    );
                }

                this.fs.delete(this.destinationPath(this.options.name, 'resources/page/html'));
            }
        }

        // generate package.json file
        this.fs.copyTpl(
            this.templatePath(`config/package.json`),
            this.destinationPath(this.options.name, 'package.json'),
            templateData
        );

        // generate package.nls.json file
        this.fs.copyTpl(
            this.templatePath(`config/package.nls.json`),
            this.destinationPath(this.options.name, 'package.nls.json'),
            templateData
        );

        // generate package.nls.json file
        this.fs.copyTpl(
            this.templatePath(`config/package.nls.zh-cn.json`),
            this.destinationPath(this.options.name, 'package.nls.zh-cn.json'),
            templateData
        );

        // generate .gitignore file
        this.fs.copyTpl(
            this.templatePath(`config/gitignore.ejs`),
            this.destinationPath(this.options.name, '.gitignore'),
            templateData
        );

        // generate tsfmt.json file
        this.fs.copyTpl(
            this.templatePath(`config/tsfmt.json`),
            this.destinationPath(this.options.name, 'tsfmt.json'),
            templateData
        );

        // generate tsconfig.json file
        this.fs.copyTpl(
            this.templatePath(`config/tsconfig.json`),
            this.destinationPath(this.options.name, 'tsconfig.json'),
            templateData
        );
    }

    install() {
        this.log('installing dependencies...');
        const pluginTargetPath = this.destinationPath(this.options.name);
        try {
            this.spawnCommandSync('npm install', [], { cwd: pluginTargetPath });
        } catch (error) {
            this.log(
                `If an error occurs during the installation process, please try to execute command 'npm i' in the directory '${pluginTargetPath}'.`
            );
        }
        if (this.options.repository === 'YES') {
            this.spawnCommandSync('git', ['init'], { cwd: pluginTargetPath });
        }
    }

    end() {
        this.log('Plugin project is generated successfully.');
        this.log(`If you have any problems during the process, please create an issue on github.
(https://github.com/huaweicloud/generator-cloudide-plugin/issues/new)`);
    }
}

module.exports = CloudIdeGenerator;
