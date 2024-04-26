const { program } = require("commander");
const chalk = require("chalk");

const { getPkgVersion, getCmdName } = require("./utils/index");
const __actions = require("./actions/index");

const __command = () => {
  program.version(getPkgVersion());
  program
    .command("create <projectName>")
    .description("create simple vue3 project")
    .alias("c")
    .action(__actions.create);

  // program.on("--help", function () {
  //   console.log();
  //   console.log(
  //     `  Run ${chalk.green(
  //       `${getCmdName()} <command> --help`
  //     )} for detailed usage of given command.`
  //   );
  //   console.log();
  // });

  program.parse(process.argv);
};

module.exports = { __command };
