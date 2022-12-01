<%- include(`../common/LICENSE-${license}-HEADER`, {year: year, author: author}); %>

import * as codearts from '@codearts/plugin';
import { initNlsConfig<% if(type === 'webview') { %>, localize<% } %> } from '@cloudide/nls';<% if(type === 'webview') { %>
import { WebviewOptions } from '@codearts/core/lib/common/plugin-common';
import { Plugin } from '@codearts/core/lib/node/plugin-api';
import { Backend } from './node/backend';

/**
 * Plugin activation entry point, this function is called when plugin is loaded.
 */
export function start(context: codearts.ExtensionContext) {

    /**
     *  Initialize language settings.
     */
    initNlsConfig(context.extensionPath);

    const opts: WebviewOptions = {
        viewType: 'view_type_of_your_plugin_view',
        title: localize('plugin.index.title'),
        targetArea: 'left',
        iconPath: 'resources/icons/plugin.svg',
        viewUrl: 'local:resources/page/index.<% if( engineOfTemplate === 'ejs' ) { %>ejs<% } else if( engineOfTemplate === 'pug' ) { %>pug<% } else { %>html<% } %>',
        preserveFocus: true,
        templateEngine: <% if( engineOfTemplate === 'ejs' ) { %>'ejs'<% } else if( engineOfTemplate === 'pug' ) { %>'pug'<% } else { %>undefined<% } %>
    };

    /**
     * The backend class that needs to be loaded, the classes in the array must inherit AbstractBackend.
     * Usually you only need to add the methods you want to expose to the frontend in the backen.ts and implement the plugin function in the run method.
     * If you want to define the backend class yourself, just refer to the implementation of the Backend class and add the type definition to the array.
     */
    const backends = [Backend];

    Plugin.create(context, opts, backends);
}

/**
 * The method that is called when the plugin is stopped. 
 * If you need to customize the clean-up action that the plug-in stops, you can add it to the method.
 */
export function stop(context: codearts.ExtensionContext) {
    Plugin.getInstance().stop();
}
<% } else if(type === 'simple') { %>

/**
 * Plugin activation entry point
 */
export function start(context: codearts.ExtensionContext) {

    /**
     *  Initialize language settings.
     */
    initNlsConfig(context.extensionPath);

    /**
     * Register a command for the plugin.
     */
    context.subscriptions.push(
        codearts.commands.registerCommand('plugin.sayHello', () => {
            codearts.window.showInformationMessage(localize('plugin.hello'));
        })
    );
}

/**
 * The method that is automatically called when the plugin is stopped. 
 * You can add your own clean-up actions to this method.
 */
export function stop(context: codearts.ExtensionContext) {
    
}
<% } else if(type === 'project-wizard') { %>
    import { Plugin } from '@codearts/core/lib/node/plugin-api';
    import { Backend } from './node/backend';
    
    /**
     * Plugin activation entry point, this function is called when plugin is loaded.
     */
    export function start(context: codearts.ExtensionContext) {
    
        /**
         *  Initialize language settings.
         */
        initNlsConfig(context.extensionPath);
    
        /**
         * The backend class that needs to be loaded, the classes in the array must inherit AbstractBackend.
         * Usually you only need to add the methods you want to expose to the frontend in the backen.ts and implement the plugin function in the run method.
         * If you want to define the backend class yourself, just refer to the implementation of the Backend class and add the type definition to the array.
         */
        const backends = [Backend];
    
        Plugin.create(context, undefined, backends);
    }
    
    /**
     * The method that is called when the plugin is stopped. 
     * If you need to customize the clean-up action that the plug-in stops, you can add it to the method.
     */
    export function stop(context: codearts.ExtensionContext) {
        Plugin.getInstance().stop();
    }
<% } %>