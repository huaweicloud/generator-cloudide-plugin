// You can import and use all API from the 'codearts' module
// as well as import your extension to test it
import { expect } from 'chai';
import { Example } from '../example';
import * as codearts from '@codearts/plugin';<% if(type === 'webview' || type === 'project-wizard') { %>
import { Plugin } from '@codearts/core/lib/node/plugin-api';<% } %>

suite('Extension Test Suite', () => {
    codearts.window.showInformationMessage('Hello CodeArts, this is the Extension Test Suite!');

    let example = new Example();

    test('this is a successful mocha test for customisedMathAdd', () => {
        const result = example.customisedMathAdd(1, 2);
        expect(result).to.equal(1 + 2);
    });

    test('this is a failed mocha test for customisedMathAdd', () => {
        const result = example.customisedMathAdd(1, 2);
        expect(result).to.equal(0);
    });

    test('this is a successful mocha test for customisedArrayBubbleSort', () => {
        const result = example.customisedArrayBubbleSort([1, 4, 5, 2, 3]);
        expect(result).to.be.a('array');
    });

    test('this is a failed mocha test for customisedArrayBubbleSort', () => {
        const result = example.customisedArrayBubbleSort([1, 4, 5, 2, 3]);
        expect(result).to.equal([1, 2, 3, 4, 5]);
    });

    test('this is a successful mocha test for customisedArrayBubbleSort', () => {
        const result = example.customisedArrayBubbleSort([1, 4, 5, 2, 3]);
        expect(result).to.deep.equal([1, 2, 3, 4, 5]);
    });

    test('this is a failed mocha test for customisedArrayBubbleSort', () => {
        const result = example.customisedArrayBubbleSort([1, 4, 5, 2, 3]);
        expect(result).to.deep.equal([1, 3, 2]);
    });

    test('this is a mocha test for variable', () => {
        const result = example.getValue();
        expect(result).to.equal(0);
    });

    test('this is a mocha test for variable', () => {
        const result = example.getValue();
        expect(result).to.equal(0);
        example.setValue(10);
        expect(example.getValue()).to.equal(10);
    });
    <% if(type === 'webview') { %>
    test('this is a successful mocha test for frontend function', async () => {
        let plugin = Plugin.getInstance();
        plugin.call('your_backend_function_identifier', 'world');
        const result = await plugin.call('view_type_of_your_plugin_view::myplugin.page.myApi', 'this is a function call from backend');
        expect(result).to.be.a('string');
        expect(result).to.equal('this is a return value from frontend function');
    });<% } %><% if(type === 'project-wizard') { %>
    test('this is a successful mocha test for frontend function', async () => {
        let plugin = Plugin.getInstance();
        plugin.call('your_backend_function_identifier', 'world');
        const result = await plugin.call('view_type_of_your_plugin_view::myplugin.page.myApi', 'this is a function call from backend');
        expect(result).to.be.a('string');
        expect(result).to.equal('this is a return value from frontend function');
    }).timeout(10000);<% } %>
});