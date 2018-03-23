/* eslint-env node */
const webpackConfig = require("./webpack.config.js");

module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        eslint: {
            target: ["./Gruntfile.js", "webpack.config.js", "./js/wh.jsx", "./js/sample-data.js"]
        },
        webpack: {
            myconfig: webpackConfig
        },
        babel: {
            options: {
                presets: ["babel-preset-env", "react"]
            },
            dist: {
                files: {
                    "js/app.js": "js/bundle.js"
                }
            }
        }
    });

    grunt.registerTask("js", ["eslint", "webpack", "babel"]);
    grunt.registerTask("default", ["js"]);
};