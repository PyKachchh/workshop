module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.initConfig({
    clean: {
      build: ['build']
    },
    copy: {
      build: {
        files: [
          {
            src: 'assets/templates/index.html',
            dest: 'build/index.html'
          },
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
      }
    },
    imagemin: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'assets/images/',
            src: ['{,*/}*.{png,jpg,jpeg}'],
            dest: 'build/images'
          }
        ]
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

  grunt.registerTask('build', ['clean', 'copy', 'imagemin', 'wiredep']);

};
