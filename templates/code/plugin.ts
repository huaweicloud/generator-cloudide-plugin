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
        title: 'title_of_your_plugin_view',
        targetArea: 'right',
        iconPath: 'resources/icons/plugin.svg',
        viewUrl: 'local:resources/page/index.html',
        preserveFocus: true
    };

    /**
     * The backend class that needs to be loaded, the classes in the array must inherit AbstractBackend.
     * Usually you only need to add the methods you want to expose to the frontend in the backen.ts and implement the plugin function in the run method.
     * If you want to define the backend class yourself, just refer to the implementation of the Backend class and add the type definition to the array.
     */
    const backends = [Backend];

    /**
     * Register a startup command for the plugin.
     * After closing the plugin, you can restart the plugin by entering the command displayed by the label through the F1 command. 
     * command registeration can be removed as needed.
     */
    context.subscriptions.push(
        cloudide.commands.registerCommand(opts.title, () => {
            Plugin.create(context, opts, backends);
        })
    );

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