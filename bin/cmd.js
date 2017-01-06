#! /usr/bin/env node
let cli = require('cli')
let fs = require('fs')
let mkdirp = require('mkdirp')
let sass2less = require('../lib')
let path = require('path')

const PATTERN_KEYS = Object.keys(path.parse(''))

// create instance
let converter = new sass2less()
let files = []

cli
    .enable('version', 'help', 'glob')
    .setApp(__dirname + '/../package.json')
    .setUsage('sass2less [source] filename-pattern')
    .parse({
      cwd: ['c', 'Resolve path names from this directory', 'string', '.'],
      rename: ['r', 'Rename input files rather than creating converted copies', 'boolean', false]
    })

if (!cli.args.length) {
    cli.getUsage(1)
} else {
    cli.options.pattern = cli.args.length > 1 ? cli.args.pop() : null

    if (cli.args.length) {
      files = cli.args.reduce(function(files, pattern) {
          return files.concat(cli.glob.sync(path.join(cli.options.cwd, pattern)))
      }, [])
    }

    if (!files.length) return cli.info('No files to convert found. Aborted!')

    files.forEach(function(file) {
      fs.stat(file, function(err, stats) {
        if (stats.isFile()) {
          fs.readFile(file, 'utf8', function(err, contents) {
            if (err) return cli.error(err)

            let result = converter.process(contents, { fileInfo: { filename: 'anything.scss' } })
            persist(file, result);
          })
        }
      })
    })
}

function parseFilePattern(pattern, fileName, cwd) {
    pattern = pattern || ''
    fileName = fileName || ''
    let values = path.parse(fileName)
    values.dir = path.relative(cwd, values.dir)

    return PATTERN_KEYS.reduce(function(newFilePath, key) {
      return newFilePath.replace('{' + key + '}', values[key]);
    }, pattern)
}

function persist (file, result) {
  if (cli.options.pattern) {
    let fileName = path.resolve(cli.options.cwd, parseFilePattern(cli.options.pattern, file, cli.options.cwd))

    if (cli.options.rename === true) {
      fs.rename(file, fileName, function(err) {
        if (err) return cli.error(err)

        fs.writeFile(fileName, result, function(err) {
          if (err) return cli.error(err)
          cli.ok(file + ' successfully converted and renamed')
        })
      })
    } else {
      mkdirp(path.dirname(fileName), function(err) {
        if (err) return cli.error(err)

        fs.writeFile(fileName, result, function(err) {
          if (err) return cli.error(err)
          cli.ok(file + ' successfully converted')
        })
      })
    }
  } else {
    console.log(result)
  }
}
