<%- include(`../common/LICENSE-${license}-HEADER`, { year: year, author: author }); %>

import * as codearts from '@codearts/plugin';
import { exposable, expose } from '@cloudide/messaging';
import { LogLevel<% if(type === 'project-wizard') { %>, WebviewOptions<% } %> } from '@codearts/core/lib/common/plugin-common';
import { AbstractBackend } from '@codearts/core/lib/node/plugin-api';

/**
 * Add your backend api in this class
 * Using '@expose' to expose your function to frontend
 */
@exposable
export class Backend extends AbstractBackend {

    /**
     * function call to the backend will wait until init() to be resolved
     */
    async init(): Promise<void> {

    }

    /**
     * Entry of your plugin backend
     * In this function you can call function exposed by frontend 
     */
    public async run(): Promise<void> {<% if(type == 'webview') { %>
        const retValue = await this.plugin.call('view_type_of_your_plugin_view::myplugin.page.myApi', 'this is a function call from backend');
        this.plugin.log(LogLevel.INFO, retValue);<% } else if(type == 'project-wizard') { %>
        const opts: WebviewOptions = {
            viewType: 'view_type_of_your_plugin_view',
            title: this.plugin.localize('plugin.index.title'),
            targetArea: 'left',
            iconPath: 'resources/icons/plugin.svg',
            viewUrl: 'local:resources/page/index.<% if( engineOfTemplate === 'ejs' ) { %>ejs<% } else if( engineOfTemplate === 'pug' ) { %>pug<% } else { %>html<% } %>',
            preserveFocus: true,
            templateEngine: <% if( engineOfTemplate === 'ejs' ) { %>'ejs'<% } else if( engineOfTemplate === 'pug' ) { %>'pug'<% } else { %>undefined<% } %>
        };
        this.plugin.registerProjectWizardProvider(opts);<% } %>
    }

    public stop(): void {

    }

    /**
     * this function can be called from plugin frontend as below:
     * @example
     * ```
     * plugin.call('your_backend_function_identifier', 'world').then(ret => {
     *     console.log(ret);
     * });
     * 
     * ```
     */
    @expose('your_backend_function_identifier')
    public doSomething(name: string): boolean {
        codearts.window.showInformationMessage(`hello ${name}!`);
        return true;
    }

}
