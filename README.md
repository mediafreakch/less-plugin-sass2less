# less-plugin-sass2less

[![Build Status](https://travis-ci.org/mediafreakch/less-plugin-sass2less.svg?branch=master)](https://travis-ci.org/mediafreakch/less-plugin-sass2less) [![Node version](https://img.shields.io/npm/v/less-plugin-sass2less.svg?style=flat)](https://www.npmjs.com/package/less-plugin-sass2less)

Want to use a UI library written in SASS, re-use it's mixins and variables but your entire source code is written in LESS? Sass2Less to the rescue! You can either use the `sass2less` command line utility included in this package or use it as a less-plugin and import `.scss` files into `.less` on-the-fly!

## Get it

`npm install less-plugin-sass2less --save-dev`

## Usage as a less-plugin

Import any `.scss` file into your existing LESS project like so:

```
// main.less
@import (reference) "./node_modules/material-design-lite/src/material-design-lite.scss";

body {
  color: @text-color-primary; // you can now use imported SASS variables as LESS variables
}

.my-button {
  .typo-display-4; // or use mixins from the imported SASS file
}
```

Then simply specify it as a plugin to your less compiler:

**Shell**

`lessc --sass2less main.less build.css`

**node.js**
```
let less = require('less')
let sass2less = require('less-plugin-sass2less')
let fs = require('fs')
let file

// get a file
fs.readFile('main.less', 'utf-8', function(err, contents) {
  if(err) return console.log(err)
  file = contents
})

less.render(file, {
  plugins: [sass2less]
}).then(function(output) {
  console.log(output.css)
}, function (error) {
  console.log(error)
})
```

**@functions**

If your sass files contains `@function` definitions and you want to use them, install `less-plugin-functions`:

```
// install additional dependency:
npm install less-plugin-functions --save-dev

// use it as a less-plugin:
lessc --sass2less --functions main.less build.css
```

## Convert SASS files to LESS

To convert all your `.scss` files at once into `.less` files, use the command line utility.

`sass2less [source] destination-pattern`

It supports globs, so you can do:

```
sass2less path/to/*.scss 'dist/{name}.less'
sass2less path/to/{filea,fileb,filec}.scss 'dist/{name}.less'
sass2less **/*.scss 'dist/{dir}/{name}.less'
sass2less **/*.{scss,sass} 'dist/{dir}/{name}.less'
```

Available destination-pattern keys includes all the keys returned by `path.parse(filename)` (ie: root, dir, name, base, ext).

## Supported conversions

- `@for`
- `@extend`
- `@function` becomes `.function();`
- `@if`, and `@else`
- `@import`
- `@include`
- `@mixin` becomes `.mixin();`
- `adjust-hue()`
- `calc()`
- `!default`
- `!important` (for mixins)
- `#{$foo}`
- `nth()`
- `rgba()`
- `unquote()`
- `$`

There are certain things that work in both compilers and do not need explicit conversion, such as lists.

## Known issues

- **`@elseif` clauses** Not supported
- **`!default` attributes** Variables with the same name will not be ignored like in SASS. The most recent takes precedence over the previous one.
- **`@import` statements** Importing a file as `@import "file.scss"` whereas the physical file is actually named `_file.scss` is supported, but it comes at a cost. LESS errors in those files will simply result in the file not being compiled.
