<%- include(`../common/LICENSE-${license}-HEADER`, { year: year, author: author }); %>

import * as cloudide from '@cloudide/plugin';
import { exposable, expose } from "@cloudide/messaging";
import { AbstractBackend, LogLevel } from '@cloudide/core/lib/node/plugin-api';

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
     * In this function your can call function exposed by frontend 
     */
    public async run(): Promise<void> {
        const retValue = await this.plugin.call('myplugin.page.myApi', 'this is a function call from backend');
        this.plugin.log(LogLevel.INFO, retValue);
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
        cloudide.window.showInformationMessage(`hello ${name}!`);
        return true;
    }

}