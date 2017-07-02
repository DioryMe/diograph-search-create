var path = require("path")

module.exports = {
    entry: "./app/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.(html|css)$/, loader: "file-loader?name=[name].[ext]" }
        ]
    },
    resolve: {
        extensions: ['.html', '.css', '.ts', '.tsx', '.js']
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    }
};