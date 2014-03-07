/*
 * grunt-dox
 * https://github.com/iVantage/grunt-dox
 *
 * Copyright (c) 2014 Evan Sheffield
 * Licensed under the MIT license.
 */

'use strict';

var dox = require('../node_modules/dox/index.js');

module.exports = function(grunt) {

  grunt.registerMultiTask('dox', 'Creates documentation markdown for your source code', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
          lang: 'js'
        });

    // Iterate over all specified file groups.
    this.files.forEach(function(filePair) {

      filePair.src.forEach(function(src) {
        if(grunt.file.isDir(src)) {
          return;
        }

        var data = grunt.file.read(src)
          , comments = dox.parseComments(data, {language: options.lang})
          , markdown
          , dest = filePair.dest;

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
