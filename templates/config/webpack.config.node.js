const path = require('path');

module.exports = {
    entry: './src/plugin.ts',
    mode: 'production',
    externals: {
        "codearts": "commonjs codearts",
        "@codearts/plugin": "commonjs @codearts/plugin"
    },
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'plugin.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]',
        clean: true
    },
    target: 'node',
    devtool: 'source-map'
};