'use strict';

module.exports = function(grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time at the end.
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        modulename: 'notify',
        banner: '/*! \n* <%= modulename %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
            '* Licensed MIT \n*/\n\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            js: {
                src: ['src/<%= modulename %>.js'],
                dest: 'dist/<%= modulename %>.js'
            },
            css: {
                src: ['src/*.css'],
                dest: 'dist/<%= modulename %>.css'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.js.dest %>',
                dest: 'dist/<%= modulename %>.min.js'
            },
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: ['src/**/*.js']
            },
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: '<%= jshint.lib.src %>',
                tasks: ['jshint:lib']
            },
        },
        cssmin: {
            dist: {
                files: {
                    'dist/<%= modulename %>.min.css': ['dist/<%= modulename %>.css']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 9 versions', 'Firefox ESR', 'Opera 12.1']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '*.css',
                    dest: 'dist'
                }]
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'concat:js', 'concat:css', 'autoprefixer', 'uglify', 'cssmin']);
};
