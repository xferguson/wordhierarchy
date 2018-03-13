/* eslint-env node */
module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		eslint: {
			target: ["Gruntfile.js", "js/wh.jsx", "js/sample-data.js"]
		}
	});

	grunt.registerTask("default", ["eslint"]);
};