module.exports = function(grunt) {

	// because why not
	"use strict";

    // 1. All configuration goes here
    grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		devUpdate: {
        	main: {
            	options: {
                	reportUpdated: false,
                	updateType: "prompt",
                	semver: false
            	}
        	}
    	},

		concat: {
		    dist: {
		        src: [
		            'js/_plugins.js',
		            'js/_scripts.js'
		        ],
		        dest: 'js/build/_production.js',
		    }
		},

		jshint: {
		    beforeconcat: ['js/_scripts.js'],
		},

		uglify: {
			global: {
				files: {
					"js/build/production.min.js": ["js/build/_production.js"]
				}
			}
		},

		sass: {
			global: {
				options: {
					style: "compressed"
				},
				files: {
					"css/_style-unprefixed.css": "_scss/style.scss"
				}
			}
		},

		autoprefixer: {
			global: {
				src: "css/_style-unprefixed.css",
				dest: "css/style.css"
			}
		},

		jekyll: {
			build: {
				dest: "_site"
			}
		},

		watch: {
			site: {
				files: [
					"index.html",
					"_includes/*.html",
					"_layouts/*.html"
		    	],
				tasks: ["jekyll"]
			},
			js: {
				files: ["js/*.js"],
				tasks: ["jshint", "concat", "uglify", "jekyll"]
			},
			css: {
				files: ["_scss/**/*.scss"],
				tasks: ["sass", "autoprefixer","jekyll"]
			}
		},

		browserSync: {
		    dev: {
		        bsFiles: {
		            src : [
		            	'_site/css/style.css',
		            	'_site/js/production.min.js',
		            ]
		        },
		        options: {
		            watchTask: true, // < VERY important
		            server: {
		            	baseDir: '_site'
		            }
		        }
		    }
		}
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    require("load-grunt-tasks")(grunt);

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask("build", ["concat", "uglify", "sass", "autoprefixer", "jekyll"]);
  	grunt.registerTask("default", ["build", "browserSync", "watch"]);

};
