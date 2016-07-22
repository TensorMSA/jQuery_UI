// Gruntfile is used to configure or define tasks and load Grunt plugins
module.exports = function(grunt) { // Node.js로 만들어졌으므로 왼쪽의 구문으로 전체를 감싸줘야 한다.
 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //package.json에 정의된 property value를 참조하라는 의미
        
        // banner는 compile된 파일의 최상단에 Insert되는 Text이다. 
        banner: '/*!\n' +
        ' * venus v<%= pkg.version %> \n' +
        ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under <%= pkg.license %> \n' +
        ' */\n',
        
        // task는 initConfig 구문 안에 정의
        // clean 설정
        clean: {
            dist: 'dist',
            css: 'dist/css'
        },
        
        // concat 설정
        concat:{
        	options: {
        		banner: '<%= banner %>\n',
        		stripBanners: true
        	},
        	// venus.js
            venus: {
                src: [
                      'js/util/venus-log.js',
                      'js/basic/alert.js',
                      'js/basic/button.js',
                      'js/basic/collapse.js',
                      'js/basic/dropdown.js',
                      'js/basic/progress-bars.js',
                      'js/basic/tab.js',
                      'js/basic/tooltip.js',
                      'js/basic/panel.js',
                      'js/basic/popover.js',
                      'js/basic/moment.js',
                      'js/basic/datetimepicker.js',
                      'js/basic/mes-header.js',
                      'js/table/jquery.tableHtmlBuilder.js',                      
                      'js/table/jquery.dataTables.js',
                      'js/table/dataTables.select.js',
                      'js/table/dataTables.colReorder.js',
                      'js/table/dataTables.fixedColumns.js',
                      'js/table/dataTables.buttons.js', 
                      'js/table/buttons.flash.js',
                      'js/table/buttons.colVis.js',
                      'js/table/buttons.rowCreate.js',
                      'js/table/buttons.rowRemove.js',
                      'js/table/buttons.rowEdit.js',
                      'js/window/venus-subwindow.js',
                      'js/window/venus-sharebutton.js',
                      'js/window/TweenMax.min.js',
                      'js/window/venus-dragdrop.js',
                      'js/window/draggabilly.pkgd.js',
                      'js/basic/bootstrap-select.js',
                      'js/window/venus-sidebar.js',
                      'js/basic/venus-relatedlov.js',
                      'js/basic/modal.js',
        		      'js/window/venus-makemenu.js',
        		      'js/window/jquery.gritter.js',
        		      'js/window/venus-setLoading.js',
        		      'js/window/venus-circularmenu.js'
                     ], //concat 타겟 설정(앞에서부터 순서대로 합쳐진다.)
                dest: 'dist/js/<%= pkg.name %>.js', //concat 결과 파일
                nonull: true
            },
        	// venus-table.js
        	venusBasic: {
        		src: [
                      'js/basic/alert.js',
                      'js/basic/button.js',
                      'js/basic/collapse.js',
                      'js/basic/dropdown.js',
                      'js/basic/progress-bars.js',
                      'js/basic/tab.js',
                      'js/basic/tooltip.js',
                      'js/basic/panel.js',
                      'js/basic/popover.js',
                      'js/basic/moment.js',
                      'js/basic/datetimepicker.js',
                      'js/basic/mes-header.js',
                      'js/basic/bootstrap-select.js',
                      'js/basic/venus-relatedlov.js'
        		      ],
        		dest: 'dist/js/<%= pkg.name %>-basic.js', 
        		nonull: true
        	},
        	venusTable: {
        		src: [
                      'js/table/jquery.tableHtmlBuilder.js',
        		      'js/table/jquery.dataTables.js',
                      'js/table/dataTables.select.js',
                      'js/table/dataTables.colReorder.js',
                      'js/table/dataTables.fixedColumns.js',    
                      'js/table/dataTables.buttons.js',
                      'js/table/buttons.flash.js',
                      'js/table/buttons.colVis.js',
                      'js/table/buttons.rowCreate.js',
                      'js/table/buttons.rowRemove.js',
        		      ],
        		dest: 'dist/js/<%= pkg.name %>-table.js',
        		nonull: true
        	},
        	venusWindow: {
        		src: [
        		      'js/window/TweenMax.min.js',
        		      'js/window/venus-subwindow.js',
        		      'js/window/venus-sharebutton.js',
        		      'js/window/venus-dragdrop.js',
        		      'js/window/draggabilly.pkgd.js',
        		      'js/window/venus-sidebar.js',
        		      'js/window/venus-makemenu.js',
        		      'js/window/jquery.gritter.js',
        		      'js/window/venus-setLoading.js',
        		      'js/window/venus-circularmenu.js'
        		      ],
        		dest: 'dist/js/<%= pkg.name %>-window.js',
        		nonull: true
        	},
        	venusGraph: {
        		src: [
        		      'js/graph/base.js',
        		      'js/graph/core.js',
        		      'js/graph/util/math.js',
        		      'js/graph/util/transform.js',
        		      'js/graph/util/time.js',
        		      'js/graph/util/scale.js',
        		      'js/graph/util/color.js',
        		      'js/graph/util/svgbase.js',
        		      'js/graph/util/svg3d.js',
        		      'js/graph/util/svg.js',
        		      'js/graph/chart/draw.js',
        		      'js/graph/chart/axis.js',
        		      'js/graph/chart/map.js',
        		      'js/graph/chart/polygon.js',
        		      'js/graph/chart/builder.js',
        		      'js/graph/chart/theme/jennifer.js',
        		      'js/graph/chart/pattern/jennifer.js',
        		      'js/graph/chart/icon/jennifer.js',
        		      'js/graph/chart/grid/core.js',
        		      'js/graph/chart/grid/range.js',
        		      'js/graph/chart/grid/panel.js',
        		      'js/graph/chart/grid/block.js',
        		      'js/graph/chart/grid/fullblock.js',
        		      'js/graph/chart/brush/core.js',
        		      'js/graph/chart/brush/bar.js',
        		      'js/graph/chart/brush/line.js',
        		      'js/graph/chart/brush/focus.js',
        		      'js/graph/chart/brush/scatter.js',
        		      'js/graph/chart/brush/bargauge.js',
        		      'js/graph/chart/brush/gauge.js',
        		      'js/graph/chart/widget/core.js',
        		      'js/graph/chart/widget/title.js',
        		      'js/graph/chart/widget/tooltip.js'
        		      ],
        		dest: 'dist/js/<%= pkg.name %>-graph.js',
        		nonull: true
        	}
        },
        
        // uglify 설정
        // minify our javascript
        uglify: {
            options: {
            	preserveComments: false
            },
            core: {
                src: '<%= concat.venus.dest %>',    // dist/js에 생성된 venus.js를 가지고 min.js를 생성
                dest: 'dist/js/<%= pkg.name %>.min.js'
            },
            coreBasic: {
            	src: '<%= concat.venusBasic.dest %>',
            	dest: 'dist/js/<%= pkg.name %>-basic.min.js'
            },
            coreTable: {
            	src: '<%= concat.venusTable.dest %>',
            	dest: 'dist/js/<%= pkg.name %>-table.min.js'
            },
            coreWindow: {
            	src: '<%= concat.venusWindow.dest %>',
            	dest: 'dist/js/<%= pkg.name %>-window.min.js'
            },
            coreGraph: {
            	src: '<%= concat.venusGraph.dest %>',
            	dest: 'dist/js/<%= pkg.name %>-graph.min.js'
            } 
            
        },
        
        less: {
        	compileCore: {
        		options: {
        			strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        		},
        		src: 'less/<%= pkg.name %>.less',
        		dest: 'dist/css/<%= pkg.name %>.css'
        	},
        	compileTheme: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>-theme.css.map',
                    sourceMapFilename: 'dist/css/<%= pkg.name %>-theme.css.map'
                  },
                  src: 'less/theme.less',
                  dest: 'dist/css/<%= pkg.name %>-theme.css'
        	}
        },
        
        autoprefixer: {
            options: {
            	browsers: [
	                "Chrome >= 20",
	                "Firefox >= 24",
	                "Explorer >= 9",
              ]
            },
            // autoprefix 하고자 하는 target 설정
            core: {
              options: {
                map: true
              },
              src: 'dist/css/<%= pkg.name %>.css'
            },
            theme: {
              options: {
                map: true
              },
              src: 'dist/css/<%= pkg.name %>-theme.css'
            }
          },
          
          usebanner: {
              options: {
                position: 'top',
                banner: '<%= banner %>'
              },
              files: {
                src: 'dist/css/*.css'
              }
          },
          
          csslint: {
              options: {
                csslintrc: 'less/.csslintrc'
              },
              dist: [
                'dist/css/<%= pkg.name %>.css',
                'dist/css/<%= pkg.name %>-theme.css'
              ]
          },
          
          csscomb: {
              options: {
                config: 'less/.csscomb.json'
              },
              dist: {
                expand: true,
                cwd: 'dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/'
              }
          },
          
          cssmin: {
              options: {
                // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
                //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
                compatibility: 'ie9',
                keepSpecialComments: '*',
                advanced: false
              },
              minifyCore: {
                src: 'dist/css/<%= pkg.name %>.css',
                dest: 'dist/css/<%= pkg.name %>.min.css'
              },
              minifyTheme: {
                src: 'dist/css/<%= pkg.name %>-theme.css',
                dest: 'dist/css/<%= pkg.name %>-theme.min.css'
              }
          },
          
          copy: {
              fonts: {
                expand: true,
                src: 'fonts/*',
                dest: 'dist/'
              },
              fontello: {
            	expand: true,
            	src: 'fonts/fontello/*',
            	dest: 'dist/'
              },
              img: {
                  expand: true,
                  src: 'img/*',
                  dest: 'dist/'
              }
              
          },
          
          // Javascript static analysis
          plato: {
        	  inspect: {
        		  options : {
        	          jshintrc : 'node_modules/grunt-plato/.jshintrc'
        	      },
	    		  files: {
	    			  'reports' : ['js/basic/*.js', 'js/table/venustable*.js']
	    		  }
        	  }
          },
          'grunt-iconv-lite': {
        	    options: {
        	    	  fromEncoding: 'utf8',
        	          toEncoding: 'euckr',
        	    },
        	    js: {
                    src: 'dist/js/<%= pkg.name %>.js',
                    dest: 'dist/euckr/<%= pkg.name %>.js'
        	    },
        	    css: {
                    src: 'dist/css/<%= pkg.name %>.css',
                    dest: 'dist/euckr/<%= pkg.name %>.css'
        	    },
        	  }
          
    });
    
    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
 
    // Default task(s).
    grunt.registerTask('default', ['clean:dist']); //grunt 명령어로 실행할 작업
    
    /* JS distribution task.*/
    grunt.registerTask('dist-js', ['concat', 'uglify:core', 'uglify:coreBasic', 'uglify:coreTable' ,'uglify:coreWindow' ,'uglify:coreGraph']);
    
    /*  CSS distribution task. */
    grunt.registerTask('less-compile', ['less:compileCore', 'less:compileTheme']);
    grunt.registerTask('dist-css', ['clean:css', 'less-compile', 'autoprefixer:core', 'autoprefixer:theme', 'usebanner', 'cssmin:minifyCore', 'cssmin:minifyTheme']);
    
    grunt.registerTask('run-plato', ['plato']);
    
   // grunt.registerTask('encoding', ['websquaremin']);
    
    grunt.registerTask('euckr', ['grunt-iconv-lite']);
    
    grunt.registerTask('dist', ['clean:dist', 'dist-css', 'copy', 'dist-js','euckr']);
};