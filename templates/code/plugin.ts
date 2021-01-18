<%- include(`../common/LICENSE-${license}-HEADER`, {year: year, author: author}); %>

import * as cloudide from '@cloudide/plugin';<% if(type == 'generic') { %>
import { WebviewOptions } from '@cloudide/core/lib/common/plugin-common';
import { Plugin } from '@cloudide/core/lib/node/plugin-api';
import { Backend } from './node/backend';

/**
 * Plugin activation entry point, this function is called when plugin is loaded.
 */
export function start(context: cloudide.ExtensionContext) {

    const opts: WebviewOptions = {
        viewType: 'view_type_of_your_plugin_view',
        title: '%plugin.index.title%',
        targetArea: 'right',
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

    /**
     * RegisterCloudideWebview allows plugin to be quickly loaded when the instance is refreshed.
     */
    if (cloudide.window.registerCloudideWebview) {
        cloudide.window.registerCloudideWebview(opts.viewType);
    }

    Plugin.create(context, opts, backends);
}

/**
 * The method that is called when the plugin is stopped. 
 * If you need to customize the clean-up action that the plug-in stops, you can add it to the method.
 */
export function stop(context: cloudide.ExtensionContext) {
    Plugin.getInstance().stop();
}
<% } else { %>
    
/**
 * Plugin activation entry point
 */
export function start(context: cloudide.ExtensionContext) {

    /**
     * Register a command for the plugin.
     */
    context.subscriptions.push(
        cloudide.commands.registerCommand('plugin.sayHello', () => {
            cloudide.window.showInformationMessage('Hello World!');
        })
    );
}

/**
 * The method that is automatically called when the plugin is stopped. 
 * You can add your own clean-up actions to this method.
 */
export function stop(context: cloudide.ExtensionContext) {
    
}
<% } %>