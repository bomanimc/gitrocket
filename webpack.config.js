const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = {
    target: 'node',
    entry: path.join(__dirname, 'src', 'rocket.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
              test: /\.js|.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  cacheDirectory: 'babel_cache',
                  presets: ['react', 'es2015']
              }
            }
        ]
    },
    externals: [ nodeExternals(), 'hyper/component', 'hyper/notify', 'hyper/decorate', 'react' ],
    plugins: [
        new webpack.DefinePlugin({ 'global.GENTLY': false })
    ]
};
