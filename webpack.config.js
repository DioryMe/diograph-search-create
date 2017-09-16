var path = require("path")

module.exports = {
    entry: "./app/diograph-search-create.tsx",
    output: {
        filename: "diograph-search-create.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    }
};
