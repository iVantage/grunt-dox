'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.dox = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  generate_docs: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/js/testing.md');
    var expected = grunt.file.read('test/expected/js/testing.md');
    test.equal(actual, expected, 'should create a markdown file for javascript comments.');

    actual = grunt.file.read('tmp/4d/test.md');
    expected = grunt.file.read('test/expected/4d/test.md');
    test.equal(actual, expected, 'should create a markdown file for 4D comments.');

    test.done();
  }
};
