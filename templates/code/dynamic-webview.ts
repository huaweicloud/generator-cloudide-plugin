<%- include(`../common/LICENSE-${license}-HEADER`, {year: year, author: author}); %>

import { PluginPage, LogLevel, AbstractFrontend } from "@cloudide/core/lib/browser/plugin-api";
import { exposable, expose } from "@cloudide/messaging";

@exposable
class MyDynamicWebveiwePageAPI extends AbstractFrontend {

    run(): void {
        this.plugin.log(LogLevel.INFO, 'dynamic webview page loaded!');
    }

    stop(): void {

    }

    @expose('myplugin.dynamic.page.print')
    public print(message: string): string {
        document.body.appendChild(document.createElement('pre')!.appendChild(document.createTextNode(`print function called, param: ${message}`)));
        return "myplugin.dynamic.page.print called";
    }

}

document.addEventListener('DOMContentLoaded', async function() {
    PluginPage.create([MyDynamicWebveiwePageAPI]);
});