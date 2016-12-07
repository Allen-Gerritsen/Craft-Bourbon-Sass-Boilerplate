'use strict';
// Project configuration
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  grunt.initConfig({
    php: {
      dev: {
        options: {
          hostname: 'localhost',
          port: 8889,
          base: 'cms/public', // Project root
          keepalive: false,
          open: false,
          router: 'router.php',
          env: {
            DATABASE_HOST: 'localhost',
            DATABASE_USER: 'root',
            DATABASE_PASS: 'root',
            DATABASE_NAME: 'boilerplate',
          }
        }
      }
    },
    watch: {
      options: {
        spawn: false // Very important, don't miss this
      },
      php_controllers: {
        files: ['app/Http/Controllers'],
        tasks: [],
        options: {}
      }
    },
    clean: {
      base: [
        'cms/craft/templates/',
        'cms/public/_tmp'
      ],
      assets: [
        'cms/public/assets/*',
        '!cms/public/assets/uploads/**'
      ],
      build: [
        '.tmp',
        'cms/public/_tmp'
      ],
      templates: [
        'cms/craft/templates/'
      ],
    },
    sass: { // Task
      dev: { // Another target
        options: {
          style: 'expanded',
          lineNumbers: true,
          loadPath: require('node-neat').includePaths
        },
        files: [{
          expand: true,
          cwd: 'src/sass/',
          src: ['**/*.scss'],
          dest: 'cms/public/_tmp/css',
          ext: '.css'
        }]
      },
      dist: { // Another target
        options: {
          style: 'expanded',
          lineNumbers: true,
          loadPath: require('node-neat').includePaths
        },
        files: [{
          expand: true,
          cwd: 'src/sass/',
          src: ['**/*.scss'],
          dest: 'cms/public/_tmp/css',
          ext: '.css'
        }]
      }
    },
    concat: {
      options: {

      }
    },
    uglify: {
      options: {
        sourceMap: true,
        mangle: false
      }
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'cms/public/assets/js',
        src: ['**/*'],
        dest: 'cms/public/assets/js'
      }
    },
    cssmin: {
      options: {
        restructuring: false
      }
    },
    useminPrepare: {
      html: 'cms/craft/templates/**/*.*',
      options: {
        root: 'cms/public/',
        dest: 'cms/public/'
      }
    },
    usemin: {
      html: 'cms/craft/templates/**/*.twig',
      css: 'cms/public/assets/css/**/*.css',
      options: {
        assetsDirs: ['cms/public/'],
        blockReplacements: {
          js: function(block) {
            grunt.log.ok(JSON.stringify(block.dest));
            grunt.log.ok(JSON.stringify(grunt.filerev.summary));
            grunt.log.debug(JSON.stringify(block.dest));
            grunt.log.debug(JSON.stringify(grunt.filerev.summary));

            return '<script src="' + block.dest + '"></script>';
          }
        }
      }
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          flatten: false,
          cwd: '_tmp/',
          src: [
            '**/**.*',
          ],
          dest: 'cms/public/_tmp'
        }]
      },
      templates: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'src/',
          src: [
            'templates/**/**.*',
          ],
          dest: 'cms/craft/'
        }]
      },
      js: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'src/',
          src: [
            'js/**/**.*',
          ],
          dest: 'cms/public/_tmp'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'src/',
          src: [
            'fonts/**/**.*',
          ],
          dest: 'cms/public/assets'
        }]
      },
      img: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'src/',
          src: [
            'img/**/**.*',
          ],
          dest: 'cms/public/assets'
        }]
      }

    },
    filerev: {
      options: {
        length: 4
      },
      dist: {
        files: [{
          src: [
            'cms/public/assets/img/**/*.{png,jpg,gif,svg}',
            'cms/public/assets/css/**/*.css',
            'cms/public/assets/js/**/*.js'
          ]
        }]
      }
    },
    processhtml: {
      options: {
        // Task-specific options go here.
      },
      remove: {
        files: {
          'cms/craft/templates/_layout.twig': ['cms/craft/templates/_layout.twig'],
          'cms/craft/templates/_includes/global/foot.twig': ['cms/craft/templates/_includes/global/foot.twig']
        }
      },
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'cms/public/_tmp/**/*.css',
            'cms/public/_tmp/**/*.js',
            'cms/craft/templates/**/*.twig'
          ]
        },
        options: {
          watchTask: true,
        }
      }
    },
    wiredep: {
      dev: {
        src: [
          'cms/craft/templates/**/**.twig',
        ],
        options: {
          ignorePath: '../../../../public',
        }
      },
    },
    imagemin: { // Task
      dev: { // Target
        options: { // Target options
          optimizationLevel: 3
        },
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: 'src/img', // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif,svg}'], // Actual patterns to match
          dest: 'cms/public/assets/img' // Destination path prefix
        }]
      }
    },
    watch: {
      options: {
        spawn: false // Very important, don't miss this
      },
      sass: {
        files: ['src/sass/**/*.scss'],
        tasks: ['sass:dev'],
        options: {

        },
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['copy:js'],
        options: {

        },
      },
      img: {
        files: ['src/img/**/*.*'],
        tasks: ['copy:img'],
        options: {

        },
      },
      templates: {
        files: ['src/templates/**/*.*'],
        tasks: ['clean:templates', 'copy:templates', 'wiredep'],
        options: {

        },
      }
    }
  })

  grunt.loadNpmTasks('grunt-php');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('build', [
    'clean:base',
    'clean:assets',
    'copy:templates',
    'wiredep',
    'sass:dist',
    'copy:fonts',
    'copy:js',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'imagemin',
    'filerev',
    'usemin',
    'processhtml',
    'clean:build'
  ]);

  grunt.registerTask('default', [
    'clean:base',
    'clean:assets',
    'copy:templates',
    'copy:fonts',
    'copy:img',
    'wiredep',
    'copy:js',
    'sass:dev',
    'browserSync',
    'php:dev',
    'watch',
  ]);

};
