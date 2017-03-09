module.exports = function(grunt) {

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
    sass: {
      dist: {
        files: {
          'build/app.css': 'src/styles/app.scss'
        }
      }
    },
    watch: {
      files: ['src/**/*.ts'],
      tasks: ['ts', 'uglify']
    }
  });

  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};