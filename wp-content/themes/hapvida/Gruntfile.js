module.exports = function(grunt) {

  grunt.initConfig({

    // Otimiza todas as imagens
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 6,
        },
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    },

    // Compila os arquivos scss
    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
              'style.css': 'src/css/style.scss'
            }
        }
    },

    // Adiciona os prefixos para compatibilidade
    // com os browsers desejados
    autoprefixer: {
      options: {
        browsers: ['last 3 versions', 'ie 9', 'ie 8', 'ff 20', 'android 4'],
        map: true
      },
      no_dest: {
        src: 'style.css'
      },
    },

    // Provê um fallback para a unidade 'rem'
    remfallback: {
      options: {
        log: true,
        replace: false,
        mediaQuery: true
      },
      your_target: {
        files: {
          'style.css': ['style.css'],
          'css/ie.css': ['css/ie.css']
        },
      },
    },

    // Compacta os javascripts
    uglify: {
      options: {
        mangle: false,
        sourceMaps: true
      },
       my_target: {
        files: {
            'js/modernizr.js': ['src/js/modernizr.js'],
            'js/app.js': ['src/js/app.js',
                          'src/js/utilities.js',
                          'src/js/nav.js',
                          'src/js/vendor/swipe.js',
                          'src/js/init.js',
                          'src/js/swipe--utilities.js',
                          'src/js/modal.js']
        }
      }
    },

    // Cria um arquivo dedicado ie.css
    // com o conteúdo das media queries
    // para IE8 e inferior
    match_media: {
      ie: {
        files: {
          'css/ie.css': ['style.css']
        }
      }
    },

    // Comprime o CSS
    csso: {
      compress: {
        options: {
          report: 'gzip',
          restructure: false,
        },
        files: {
          'style.css': ['style.css']
        }
      },
    },

    // Copia as fontes para o diretório de
    // produção
    copy: {
      main: {
        expand: true,
        cwd: 'src/fonts/',
        src: '**',
        dest: 'fonts/',
        flatten: true,
        filter: 'isFile'
      },
    },

    // Configura a tarefa watch com o
    // livereload
    watch: {
      options: {
        livereload: true,
      },
      php: {
        files: ['**/**.php']
      },
      css: {
        files: ['src/css/**/**.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      uglify: {
        files: ['src/js/**/**.js'],
        tasks: ['uglify']
      },
      imagemin: {
        files: ['src/img/**/*.{png,jpg,gif}'],
        tasks: ['imagemin']
      },
      configFiles: {
        files: [ 'gruntfile.js' ],
        options: {
          reload: true
        }
      }
    }

  });

  // Carrega os plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-remfallback');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-match-media');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Registra as tarefas
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build',   ['copy', 'sass', 'imagemin', 'autoprefixer', 'match_media', 'remfallback', 'csso', 'uglify']);

}
