/*eslint-env node */
const path = require("path");
const config = {
    entry: ["./js/wh.jsx"],
    output: {
        path: path.resolve(__dirname, "js"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: "babel-loader"
        }]
    }
};

module.exports = config;