module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.initConfig({
    bower_concat: {
      dist: {
        dest: 'dist/js/web.min.js',
        cssDest: 'dist/css/web.min.css',
        exclude: ['html5-boilerplate', 'modernizr'],
        bowerOptions: {
          relative: false
        },
      }
    },
    clean: {
      all: ['<%= NODE_ENV %>'],
    },
    copy: {
      build: {
        files: [
          {
            src: 'bower_components/**/*.*',
            dest: 'build/'
          },
          {
            expand: true,
            cwd: 'assets/js/',
            flatten: true,
            src: ['**/*.js'],
            dest: 'build/js/'
          },
          {
            src: 'assets/css/style.css',
            dest: 'build/css/style.css'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/font-awesome/fonts/',
            src: ['**'],
            dest: 'dist/fonts/'
          },
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/fonts/',
            src: ['**'],
            dest: 'dist/fonts/'
          }
        ]
      }
    },
    concat: {
      dist: {
        files: [
          {
            src: ['dist/css/web.min.css', 'assets/css/**/*.css'],
            dest: 'dist/css/web.min.css'
          },
          {
            src: ['dist/js/web.min.js', 'assets/js/**/*.js'],
            dest: 'dist/js/web.min.js'
          }
        ]
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/css/web.min.css': 'dist/css/web.min.css'
        }
      }
    },
    env: {
      build: {
        NODE_ENV: 'build'
      },
      dist: {
        NODE_ENV: 'dist'
      }
    },
    htmlmin: {
      dist: {
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },
    imagemin: {
      all: {
        files: [
          {
            expand: true,
            cwd: 'assets/images/',
            src: ['{,*/}*.{png,jpg,jpeg}'],
            dest: '<%= NODE_ENV %>/images'
          }
        ]
      }
    },
    preprocess: {
      all: {
        files: {
          '<%= NODE_ENV %>/index.html': 'assets/templates/index.html'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/js/web.min.js': 'dist/js/web.min.js'
        }
      }
    },
    watch: {
      build: {
        files: ['assets/**/*.*', 'Gruntfile.js', 'bower.json', 'package.json'],
        tasks: ['build']
      },
      dist: {
        files: ['assets/**/*.*', 'Gruntfile.js', 'bower.json', 'package.json'],
        tasks: ['dist']
      }
    },
    wiredep: {
      build: {
        src: ['build/index.html'],
        exclude: ['html5-boilerplate'],
        options: {
          directory: 'build/bower_components'
        },
        "overrides": {
          "isotope": {
            "main": [
              "js/item.js",
              "js/layout-mode.js",
              "js/isotope.js",
              "js/layout-modes/vertical.js",
              "js/layout-modes/fit-rows.js",
              "js/layout-modes/masonry.js"
            ]
          },
          "outlayer": {
            "main": [
              "item.js",
              "outlayer.js"
            ]
          }
        }
      }
    }
  });

  grunt.registerTask('loadconst', 'Load constants', function() {
    grunt.config('NODE_ENV', process.env.NODE_ENV);
  });

  grunt.registerTask('build', ['env:build', 'loadconst', 'clean', 'preprocess',  'copy:build', 'imagemin', 'wiredep']);
  grunt.registerTask('dist', ['env:dist', 'loadconst', 'clean', 'preprocess', 'bower_concat', 'concat', 'uglify', 'cssmin', 'imagemin', 'copy:dist']);
  grunt.registerTask('watch_build', ['env:build', 'loadconst', 'watch:build']);
  grunt.registerTask('watch_dist', ['env:dist', 'loadconst', 'watch:dist']);
};
