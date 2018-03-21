const path = require('path');

const config = {
    module: {
        loaders: [
            { 
                test: /\.jsx?$/,
                loader: "babel-loader"
            }
        ]
    }
};

module.exports = config;