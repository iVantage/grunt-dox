/*
 * grunt-dox
 * https://github.com/iVantage/grunt-dox
 *
 * Copyright (c) 2014 iVantage Health Analytics
 * Licensed under the MIT license.
 */

'use strict';

var dox = require('../node_modules/dox/index.js')
  , docBlock4D = require('../node_modules/4d-to-DocBlock/index.js')
  , Handlebars = require('handlebars')
  , gruntUtil = require('grunt')
  ;

var hbsTemplate = Handlebars.compile(gruntUtil.file.read(__dirname + '/../templates/index.hbs'));

module.exports = function(grunt) {

  grunt.registerMultiTask('dox', 'Creates documentation markdown for your source code', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
          lang: 'js',
          outputAs: 'md'
        });

    // Iterate over all specified file groups.
    this.files.forEach(function(filePair) {

      filePair.src.forEach(function(src) {
        if(grunt.file.isDir(src)) {
          return;
        }

        var data = grunt.file.read(src)
          , comments
          , markdown
          , dest = filePair.dest;

        // 4D Comments don't allow /** */ style comments so we need to convert them
        // before running dox.
        if(options.lang.toLowerCase() === '4d') {
          data = docBlock4D.convert(data);
        }

        comments = dox.parseComments(data, {language: options.lang});

        // We can stop here if we're outputting the raw JSON comments
        if(options.outputAs.toLowerCase() === 'json') {
          grunt.file.write(dest, JSON.stringify(comments));
          grunt.log.writeln('Created comment JSON for ' + src.cyan +'--> ' + dest.cyan + '');
          return;
        }

        if (options.outputAs.toLowerCase() === "html") {
          grunt.file.write(dest, hbsTemplate(comments));
          grunt.log.writeln('Created comment HTML for ' + src.cyan +'--> ' + dest.cyan + '');
          return;
        }

        try {
          markdown = dox.api(comments);
        } catch (e) {
          grunt.log.error('Error generating documentation for file ' + src.cyan + ': ' + e);
          return;
        }

        // Write the generated markdown to a file
        grunt.file.write(dest, markdown);
        grunt.log.writeln('Created documentation for ' + src.cyan +'--> ' + dest.cyan + '');
      });
    });
  });

};
