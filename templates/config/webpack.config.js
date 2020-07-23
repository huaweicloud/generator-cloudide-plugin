const path = require('path');

module.exports = {
    entry: {
        'page/dist/index': './src/browser/frontend.ts',
        'page/dist/dynamic-webview-index': './src/browser/dynamic-webview.ts'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'resources'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    devtool: 'source-map'
};