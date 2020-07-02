<%- include(`../common/LICENSE-${license}-HEADER`, { year: year, author: author }); %>

import { PluginPage, LogLevel, AbstractFrontend } from "@cloudide/core/lib/browser/plugin-api";
import { exposable, expose } from "@cloudide/messaging";

/**
 * Adding your fronted api in this class
 * Using '@expose' to expose your function to frontend
 */
@exposable
class Frontend extends AbstractFrontend {

    /**
     * function call to the frontend will wait until init() to be resolved
     */
    async init(): Promise<void> {

    }

    /**
     * Entry of your plugin backend
     * In this function your can call function exposed by frontend
     */
    run(): void {
        this.plugin.call('your_backend_function_identifier', 'world');
    }

    stop(): void {

    }

    /**
     * this function can be called from plugin backend as below:
     * @example
     * ```
     * plugin.call('myplugin.page.myApi', 'this is a function call from backend').then(ret => {
     *     console.log(ret);
     * });
     * 
     * ```
     */
    @expose('myplugin.page.myApi')
    public myApi(message: string): string {
        console.log(message);
        return 'this is a return value from frontend function';
    }

}

document.addEventListener('DOMContentLoaded', function () {
    PluginPage.create([Frontend]);
});