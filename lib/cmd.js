#! /usr/bin/env node
var cli = require('cli')
var fs = require('fs')
var sass2less = require('./')
var path = require('path')

// create instance
var converter = new sass2less()
var dest, src

cli
    .enable('version', 'help', 'glob')
    .setApp(__dirname + '/../package.json')
    .setUsage('sass2less [source] [destination]')
    .parse({
      cwd: ['c', 'Resolve path names from this directory', 'string', '.']
    })

if (!cli.args.length) {
    cli.getUsage(1)
} else {
    dest = cli.args.pop()
    src = cli.args

    src.forEach(function(file) {
      fs.readFile(path.join(cli.options.cwd, file), 'utf8', function(err, contents) {
        if (err) return cli.error(err)

        var result = converter.process(contents, { fileInfo: { filename: file } })
        persist(file, result);
      })
    })
}

function persist (file, result) {
  var newFile = file.replace(/\.[^/.]+$/, '.less')

  if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
    newFile = path.join(dest, newFile);
  }

  fs.writeFile(path.join(cli.options.cwd, newFile), result, function(err) {
    if (err) cli.error(err)
    cli.ok(file + ' successfully converted')
  })

}
