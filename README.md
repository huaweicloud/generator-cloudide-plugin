# HUAWEI CloudIDE plugin Generator
This generator will help you create a HUAWEI CloudIDE plugin project.

## How to use
The CloudIDE plugin can be developed using the CloudIDE itself. 
You can obtain a CloudIDE instance from [Huawei CloudIDE official site](https://www.huaweicloud.com/product/cloudide.html). 

### Install Yeoman and CloudIDE plugin generator
```
npm install -g yo @cloudide/generator-plugin
```

### Run Generator using yo command
The generator will ask you a few questions and create the project as you choose. 
```
yo @cloudide/plugin
```

### Build Your Plugin
After run the following command 
```
npm i && npm run pack
```

## Plugin Development Guides
### Overview
This guide describes the basic running principles of plugin and describes the API design of the plugin core framework through examples. 
All of this article is based on a generic project that can be created by executing `yo @cloudide/plugin` and selecting the `generic` type plugin.  

### Basic Concepts 
* backend: JS code running in the NodeJS environment. Actually, the backend of CloudIDE instance is a web server started using express. 
* frontend: JS code running in the Browser environment.
* remote call: function call exposed between the frontend and backend. 

### Directory Structures of Plugin Project
Once you have created a generic plugin project using the yo generator, the root directory of the plugin project contains the following directories and files: 
```
your-awesome-plugin
├── LICENSE
├── package.json
├── package-lock.json
├── resources
│   ├── icons
│   │   ├── logo.png
│   │   └── plugin.svg
│   └── page
│       ├── css
│       │   ├── default.css
│       │   └── main.css
│       ├── dynamic-webview.html
│       └── index.html
├── src
│   ├── browser
│   │   ├── dynamic-webview.ts
│   │   └── frontend.ts
│   ├── node
│   │   └── backend.ts
│   └── plugin.ts
├── tsconfig.json
├── tsfmt.json
└── webpack.config.js
```
* plugin.ts: Entry of plugin.
* src/browser: Stores the code that needs to be run on the browser side(frontend).
* src/node: Stores the code that needs to be run on the server side with NodeJS(backend).
* resources/page/index.html: Plugin main page, which will be loaded by default.
* resources/page/dynamic-webview.html: Dynamic webview can be loaded programmatically in runtime, you can add dynamic webview files as needed.
* resources/page/css/default.css: Basic style sheets, do not modify this file.
* resources/page/css/main.css: Style sheets for your plugin page, add your own shtyle to this file.
* resources/icons/logo.png: Plugin logo, which will be displayed on marketplace.
* resources/icons/plugin.svg: Plugin icon, which will be displayed on CloudIDE panel.

## LICENSE
[MIT](LICENSE)
