const path = require('path');

module.exports = {
    entry: './src/index.js', // The entry point of your app
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/, // This regex will match all JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Resolves both .js and .jsx extensions
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 8080,
    },
};
