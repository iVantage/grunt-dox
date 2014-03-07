# grunt-dox

> Creates documentation markdown files for your source code using [Dox](https://github.com/iVantage/dox)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dox --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dox');
```

## The "dox" task

### Overview
In your project's Gruntfile, add a section named `dox` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  dox: {
    your_target: {
      // Target-specific file lists and/or options go here.
      options: {
        // Task-specific options go here.
      },
      files: [
        // File lists go here
      ]
    }
  },
});
```

### Options

#### options.lang
Type: `String`
Default value: `'js'`

The language style to use when parsing comments. Current possible values are `'js'`, `'php'`, and `'4d'`.

### Usage Examples

In this example, we generate docs for a set of PHP library files. Markdown files will be created in the `docs` folder with
the same folder structure as the source files.

```js
grunt.initConfig({
  dox: {
      myCodez: {
        options: {
          lang: 'php'
        },
        files: [
          {expand: true, cwd: 'library', src: '**/*', dest: 'docs/', ext: '.md'}
        ]
      }
    },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
