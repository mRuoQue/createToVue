const { program } = require("commander");

const fn = require("./actions/index");

const command = () => {
  program.command("create").action(fn());
};

module.exports = command;
