import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";

import { getPkgVersion, getCmdName } from "./utils/index.js";
import __actions from "./actions/index.js";

export default function __command() {
  program.version(getPkgVersion());

  program.on("--help", () => {
    console.log(
      "\r\n" +
        chalk.white.bgBlueBright.bold(
          figlet.textSync("ctVue", {
            font: "Standard",
            width: 88,
            verticalLayout: "default",
            horizontalLayout: "default",
            whitespaceBreak: true,
          })
        )
    );
    console.log(
      `\r\nRun ${chalk.cyan(`ctVue <command> --help`)} to understand more \r\n`
    );
  });

  program
    .command("create <projectName>")
    .description("create simple vue3 project")
    .alias("c")
    .option("-f,--force", "overwrite current directory if it the same")
    .action((value, options) => {
      __actions.create(value, options);
    });

  program
    .command("conf [value]")
    .description("inspect your more config")
    .option("-g, --get <path>", "get value from option")
    .option("-s, --set <path> <value>")
    .option("-d, --delete <path>", "delete option from config")
    .action((value, options) => {
      console.log(value, options);
    });

  program
    .command("add [plugins]")
    .description("add more plugins if you need")
    .option("-n, --need <plugin>", "plugin")
    .action((value, option) => {
      console.log(option);
    });

  program.parse(process.argv);
}
