import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';
import { Done } from 'mocha';
import path = require('path');
import fs = require('fs');

describe('test generate project', () => {
    it('generate generic project - no template engine', (done: Done) => {
        const promptsAnswer = {
            type: 'generic',
            engineOfTemplate: 'none',
            publisher: 'tester',
            author: 'tester',
            license: 'MIT',
            description: 'this is a test case',
            repository: false
        };
        const projectName = 'generic-project';
        helpers
            .run(path.join(__dirname, '../generators/app'))
            .withArguments([projectName])
            .withPrompts(promptsAnswer)
            .then(() => {
                assert.file([
                    `${projectName}/package.json`,
                    `${projectName}/package.nls.json`,
                    `${projectName}/package.nls.zh.json`,
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
                    `${projectName}/src/plugin.ts`
                ]);
                const packageJson = JSON.parse(fs.readFileSync(`${projectName}/package.json`, 'utf8'));
                assert.equal(packageJson.name, projectName);
                assert.equal(packageJson.publisher, promptsAnswer.publisher);
                assert.equal(packageJson.author, promptsAnswer.author);
                assert.equal(packageJson.description, promptsAnswer.description);
                assert.equal(packageJson.license, 'SEE LICENSE IN LICENSE');
                assert.fileContent(`${projectName}/LICENSE`, /^The MIT License/);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    it('generate generic project - ejs template engine', (done: Done) => {
        const promptsAnswer = {
            type: 'generic',
            engineOfTemplate: 'ejs',
            publisher: 'tester',
            author: 'tester',
            license: 'MIT',
            description: 'this is a test case',
            repository: false
        };
        const projectName = 'generic-project';
        helpers
            .run(path.join(__dirname, '../generators/app'))
            .withArguments([projectName])
            .withPrompts(promptsAnswer)
            .then(() => {
                assert.file([
                    `${projectName}/package.json`,
                    `${projectName}/package.nls.json`,
                    `${projectName}/package.nls.zh.json`,
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
                    `${projectName}/src/plugin.ts`
                ]);
                const packageJson = JSON.parse(fs.readFileSync(`${projectName}/package.json`, 'utf8'));
                assert.equal(packageJson.name, projectName);
                assert.equal(packageJson.publisher, promptsAnswer.publisher);
                assert.equal(packageJson.author, promptsAnswer.author);
                assert.equal(packageJson.description, promptsAnswer.description);
                assert.equal(packageJson.license, 'SEE LICENSE IN LICENSE');
                assert.fileContent(`${projectName}/LICENSE`, /^The MIT License/);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    it('generate generic project - ejs template engine', (done: Done) => {
        const promptsAnswer = {
            type: 'generic',
            engineOfTemplate: 'pug',
            publisher: 'tester',
            author: 'tester',
            license: 'MIT',
            description: 'this is a test case',
            repository: false
        };
        const projectName = 'generic-project';
        helpers
            .run(path.join(__dirname, '../generators/app'))
            .withArguments([projectName])
            .withPrompts(promptsAnswer)
            .then(() => {
                assert.file([
                    `${projectName}/package.json`,
                    `${projectName}/package.nls.json`,
                    `${projectName}/package.nls.zh.json`,
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
                    `${projectName}/src/plugin.ts`
                ]);
                const packageJson = JSON.parse(fs.readFileSync(`${projectName}/package.json`, 'utf8'));
                assert.equal(packageJson.name, projectName);
                assert.equal(packageJson.publisher, promptsAnswer.publisher);
                assert.equal(packageJson.author, promptsAnswer.author);
                assert.equal(packageJson.description, promptsAnswer.description);
                assert.equal(packageJson.license, 'SEE LICENSE IN LICENSE');
                assert.fileContent(`${projectName}/LICENSE`, /^The MIT License/);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    it('generate backend project', (done: Done) => {
        const promptsAnswer = {
            type: 'backend',
            publisher: 'tester',
            author: 'tester',
            license: 'BSD',
            description: 'this is a test case',
            repository: false
        };
        const projectName = 'backend-project';
        helpers
            .run(path.join(__dirname, '../generators/app'))
            .withArguments([`${projectName}`])
            .withPrompts({
                type: 'backend',
                publisher: 'tester',
                author: 'tester',
                license: 'BSD',
                description: 'this is a test case',
                repository: false
            })
            .then(() => {
                assert.file([
                    `${projectName}/package.json`,
                    `${projectName}/LICENSE`,
                    `${projectName}/tsconfig.json`,
                    `${projectName}/tsfmt.json`,
                    `${projectName}/src/plugin.ts`
                ]);
                const packageJson = JSON.parse(fs.readFileSync(`${projectName}/package.json`, 'utf8'));
                assert.equal(packageJson.name, projectName);
                assert.equal(packageJson.publisher, promptsAnswer.publisher);
                assert.equal(packageJson.author, promptsAnswer.author);
                assert.equal(packageJson.description, promptsAnswer.description);
                assert.equal(packageJson.license, 'SEE LICENSE IN LICENSE');
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});
