/********************************************************************************
 * Copyright (C) 2020. Huawei Technologies Co., Ltd. All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';
import { Done } from 'mocha';
import path = require('path');
import fs = require('fs');

const backendDefaultNlsJsonFileContent = `{
    "plugin.hello": "Hello World!"
}`;
const backendZhNlsJsonFileContent = `{
    "plugin.hello": "你好， 世界!"
}`;

const genericDefaultNlsJsonFileContent = `{
    "plugin.index.title": "Huawei CloudIDE demo plugin main page",
    "plugin.index.description": "This is the plugin frontend page",
    "plugin.dynamicview.title": "Huawei CloudIDE demo plugin dynamic webview page",
    "plugin.dynamicview.description": "This is the plugin frontend page created dynamically"
}`;

const genericZhNlsJsonFileContent = `{
    "plugin.index.title": "华为云IDE样例插件主页面",
    "plugin.index.description": "这是插件的前端页面",
    "plugin.dynamicview.title": "华为云IDE样例插件动态创建的插件页面",
    "plugin.dynamicview.description": "这是一个动态创建的插件页面"
}`;

describe('test generate project', () => {
    it('generate webview project - no template engine', (done: Done) => {
        const promptsAnswer = {
            type: 'webview',
            engineOfTemplate: 'none',
            publisher: 'tester',
            author: 'tester',
            license: 'MIT',
            description: 'this is a test case',
            repository: false
        };
        const projectName = 'webview-project';
        helpers
            .run(path.join(__dirname, '../generators/app'))
            .withArguments([projectName])
            .withPrompts(promptsAnswer)
            .then(() => {
                assert.file([
                    `${projectName}/package.json`,
                    `${projectName}/package.nls.json`,
                    `${projectName}/package.nls.zh-cn.json`,
                    `${projectName}/LICENSE`,
                    `${projectName}/tsconfig.json`,
                    `${projectName}/tsfmt.json`,
                    `${projectName}/webpack.config.js`,
                    `${projectName}/resources/icons/logo.png`,
                    `${projectName}/resources/icons/plugin.svg`,
                    `${projectName}/resources/page/index.html`,
                    `${projectName}/resources/page/dynamic-webview.html`,
                    `${projectName}/resources/page/css/default.css`,
                    `${projectName}/resources/page/css/main.css`,
                    `${projectName}/src/browser/dynamic-webview.ts`,
                    `${projectName}/src/browser/frontend.ts`,
                    `${projectName}/src/node/backend.ts`,
                    `${projectName}/src/plugin.ts`,
                    `${projectName}/README.md`,
                    `${projectName}/.arts/launch.json`,
                    `${projectName}/.arts/tasks.json`
                ]);
                const packageJson = JSON.parse(fs.readFileSync(`${projectName}/package.json`, 'utf8'));
                assert.equal(packageJson.name, projectName);
                assert.equal(packageJson.publisher, promptsAnswer.publisher);
                assert.equal(packageJson.author, promptsAnswer.author);
                assert.equal(packageJson.description, promptsAnswer.description);
                assert.equal(packageJson.license, 'SEE LICENSE IN LICENSE');
                assert.fileContent(`${projectName}/LICENSE`, /^The MIT License/);
                assert.fileContent(`${projectName}/package.nls.json`, genericDefaultNlsJsonFileContent);
                assert.fileContent(`${projectName}/package.nls.zh-cn.json`, genericZhNlsJsonFileContent);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    it('generate webview project - ejs template engine', (done: Done) => {
        const promptsAnswer = {
            type: 'webview',
            engineOfTemplate: 'ejs',
            publisher: 'tester',
            author: 'tester',
            license: 'MIT',
            description: 'this is a test case',
            repository: false
        };
        const projectName = 'webview-project';
        helpers
            .run(path.join(__dirname, '../generators/app'))
            .withArguments([projectName])
            .withPrompts(promptsAnswer)
            .then(() => {
                assert.file([
                    `${projectName}/package.json`,
                    `${projectName}/package.nls.json`,
                    `${projectName}/package.nls.zh-cn.json`,
                    `${projectName}/LICENSE`,
                    `${projectName}/tsconfig.json`,
                    `${projectName}/tsfmt.json`,
                    `${projectName}/webpack.config.js`,
                    `${projectName}/resources/icons/logo.png`,
                    `${projectName}/resources/icons/plugin.svg`,
                    `${projectName}/resources/page/index.ejs`,
                    `${projectName}/resources/page/dynamic-webview.ejs`,
                    `${projectName}/resources/page/css/default.css`,
                    `${projectName}/resources/page/css/main.css`,
                    `${projectName}/src/browser/dynamic-webview.ts`,
                    `${projectName}/src/browser/frontend.ts`,
                    `${projectName}/src/node/backend.ts`,
                    `${projectName}/src/plugin.ts`,
                    `${projectName}/README.md`,
                    `${projectName}/.arts/launch.json`,
                    `${projectName}/.arts/tasks.json`
                ]);
                const packageJson = JSON.parse(fs.readFileSync(`${projectName}/package.json`, 'utf8'));
                assert.equal(packageJson.name, projectName);
                assert.equal(packageJson.publisher, promptsAnswer.publisher);
                assert.equal(packageJson.author, promptsAnswer.author);
                assert.equal(packageJson.description, promptsAnswer.description);
                assert.equal(packageJson.license, 'SEE LICENSE IN LICENSE');
                assert.fileContent(`${projectName}/LICENSE`, /^The MIT License/);
                assert.fileContent(`${projectName}/package.nls.json`, genericDefaultNlsJsonFileContent);
                assert.fileContent(`${projectName}/package.nls.zh-cn.json`, genericZhNlsJsonFileContent);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    it('generate webview project - pug template engine', (done: Done) => {
        const promptsAnswer = {
            type: 'webview',
            engineOfTemplate: 'pug',
            publisher: 'tester',
            author: 'tester',
            license: 'MIT',
            description: 'this is a test case',
            repository: false
        };
        const projectName = 'webview-project';
        helpers
            .run(path.join(__dirname, '../generators/app'))
            .withArguments([projectName])
            .withPrompts(promptsAnswer)
            .then(() => {
                assert.file([
                    `${projectName}/package.json`,
                    `${projectName}/package.nls.json`,
                    `${projectName}/package.nls.zh-cn.json`,
                    `${projectName}/LICENSE`,
                    `${projectName}/tsconfig.json`,
                    `${projectName}/tsfmt.json`,
                    `${projectName}/webpack.config.js`,
                    `${projectName}/resources/icons/logo.png`,
                    `${projectName}/resources/icons/plugin.svg`,
                    `${projectName}/resources/page/index.pug`,
                    `${projectName}/resources/page/dynamic-webview.pug`,
                    `${projectName}/resources/page/css/default.css`,
                    `${projectName}/resources/page/css/main.css`,
                    `${projectName}/src/browser/dynamic-webview.ts`,
                    `${projectName}/src/browser/frontend.ts`,
                    `${projectName}/src/node/backend.ts`,
                    `${projectName}/src/plugin.ts`,
                    `${projectName}/README.md`,
                    `${projectName}/.arts/launch.json`,
                    `${projectName}/.arts/tasks.json`
                ]);
                const packageJson = JSON.parse(fs.readFileSync(`${projectName}/package.json`, 'utf8'));
                assert.equal(packageJson.name, projectName);
                assert.equal(packageJson.publisher, promptsAnswer.publisher);
                assert.equal(packageJson.author, promptsAnswer.author);
                assert.equal(packageJson.description, promptsAnswer.description);
                assert.equal(packageJson.license, 'SEE LICENSE IN LICENSE');
                assert.fileContent(`${projectName}/LICENSE`, /^The MIT License/);
                assert.fileContent(`${projectName}/package.nls.json`, genericDefaultNlsJsonFileContent);
                assert.fileContent(`${projectName}/package.nls.zh-cn.json`, genericZhNlsJsonFileContent);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    it('generate simple project', (done: Done) => {
        const promptsAnswer = {
            type: 'simple',
            publisher: 'tester',
            author: 'tester',
            license: 'BSD',
            description: 'this is a test case',
            repository: false
        };
        const projectName = 'simple-project';
        helpers
            .run(path.join(__dirname, '../generators/app'))
            .withArguments([`${projectName}`])
            .withPrompts(promptsAnswer)
            .then(() => {
                assert.file([
                    `${projectName}/package.json`,
                    `${projectName}/LICENSE`,
                    `${projectName}/tsconfig.json`,
                    `${projectName}/tsfmt.json`,
                    `${projectName}/src/plugin.ts`,
                    `${projectName}/README.md`,
                    `${projectName}/.arts/launch.json`,
                    `${projectName}/.arts/tasks.json`
                ]);
                const packageJson = JSON.parse(fs.readFileSync(`${projectName}/package.json`, 'utf8'));
                assert.equal(packageJson.name, projectName);
                assert.equal(packageJson.publisher, promptsAnswer.publisher);
                assert.equal(packageJson.author, promptsAnswer.author);
                assert.equal(packageJson.description, promptsAnswer.description);
                assert.equal(packageJson.license, 'SEE LICENSE IN LICENSE');
                assert.fileContent(`${projectName}/package.nls.json`, backendDefaultNlsJsonFileContent);
                assert.fileContent(`${projectName}/package.nls.zh-cn.json`, backendZhNlsJsonFileContent);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});
