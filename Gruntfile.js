'use strict';

module.exports = function(grunt) {
  // Unified Watch Object
  var watchFiles = {
    serverJS: ['Gruntfile.js', 'server.js', 'config/*.js', 'app/**/*.js'],
    clientViews: ['views/*.html'],
    clientLess: ['public/less/*.less']
  };

  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      serverJS: {
        files: watchFiles.serverJS,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      clientViews: {
        files: watchFiles.clientViews,
        options: {
          livereload: true
        }
      },
      clientLess: {
        files: watchFiles.clientLess,
        tasks: ['csslint', 'less'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: {
        src: watchFiles.serverJS,
        options: {
          jshintrc: true
        }
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      all: {
        src: watchFiles.clientLess
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js, html',
          watch: watchFiles.clientViews.concat(watchFiles.serverJS)
        }
      }
    },
    concurrent: {
      default: ['nodemon', 'watch'],
      debug: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true,
        limit: 10
      }
    },
    browserify: {
      options: {
        transform: ['reactify'],
        extensions: ['.js']
      },
      dist: {
        files: {
          'public/js/build.js': [
            'public/js/app.js',
            'public/js/**/*.js'
          ]
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ['assets/css']
        },
        files: {
          'public/css/style.css': 'public/less/style.less'
        }
      }
    }
  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt);

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  // Lint task(s).
  grunt.registerTask('lint', ['jshint', 'csslint']);

  // Default task(s).
  grunt.registerTask('default', ['lint', 'concurrent:default']);
};
