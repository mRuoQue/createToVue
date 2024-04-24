
const {program }  = require('commander')
const command = require('./lib/index')

command()

program.parse(process.argv)