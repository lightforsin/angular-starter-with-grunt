"use strict";

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/**/*.js',
        dest: 'build/app.min.js'
      }
    },
    ts: {
      default : {
        src: ["**/*.ts", "!node_modules/**"]
      }
    },
    tslint: {
        options: {
            // can be a configuration object or a filepath to tslint.json
            configuration: grunt.file.readJSON("tslint.json"),
            // If set to true, tslint errors will be reported, but not fail the task
            // If set to false, tslint errors will be reported, and the task will fail
            force: false,
            fix: false
        },
        files: {
            src: ["src/app/**/*.ts"]
        }
    },
    sass: {
      dist: {
        files: {
          'build/main.css': 'src/styles/main.scss'
        }
      }
    },
    watch: {
      script: {
        files: ['src/app/**/*.ts'],
        tasks: [
          'tslint',
          'force:on',
          'ts',
          'force:off',
          'uglify'
        ]
      },
      css: {
        files: ['src/styles/**/*.scss', 'src/**/*.html'],
        tasks: ['sass']
      }
    }
  });

  var previous_force_state = grunt.option("force");

  grunt.registerTask("force",function(set){
      if (set === "on") {
          grunt.option("force",true);
      }
      else if (set === "off") {
          grunt.option("force",false);
      }
      else if (set === "restore") {
          grunt.option("force",previous_force_state);
      }
  });

  // Default task(s).
  grunt.registerTask('default', [
    'tslint',
    'force:on',
    'ts',
    'force:restore',
    'sass',
    'uglify'
    ]);
};