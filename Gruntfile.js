module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		eslint: {
			target: ['Gruntfile.js', 'js/wh.jsx']
		}
	});

	grunt.registerTask('default', ['eslint']);
};