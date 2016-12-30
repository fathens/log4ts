module.exports = {
    entry: ['./src/index.ts'],
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
        libraryTarget: 'commonjs'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts']
            }
        ]
    },
    externals: {
        "lodash": "lodash"
    }
};
