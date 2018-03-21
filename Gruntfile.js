/* eslint-env node */
module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        eslint: {
            target: ["./Gruntfile.js", "./js/wh.jsx", "./js/sample-data.js"]
        },
        webpack: {
            build: {
                entry: ["./js/wh.jsx"],
                output: {
                    path: "/js/",
                    filename: "build.js"
                }
            }
        },
        babel: {
            options: {
                presets: ["babel-preset-env", "react"]
            },
            dist: {
                files: {
                    "js/app.js": "js/build.js"
                }
            }
        }
    });

    grunt.registerTask("default", ["eslint", "webpack", "babel"]);
};