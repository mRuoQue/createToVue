const inquirer = require("inquirer");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs");
const downloadGitRepo = require("download-git-repo");

const { getDirExistSync } = require("../utils/index");

const create = async (projectName, options) => {
  const { dir, repository, force } = options;
  console.log("options");
  console.log(options);
  console.log(
    `当前目录：${chalk.green(`${process.cwd()}--- /${projectName}`)}`
  );
  await inquirer
    .prompt([{ name: "ok", type: "confirm", message: "在当面目录下创建?" }])
    .then((answers) => {
      const { name, type } = answers;

      fs.cpSync(path.resolve(__dirname, `../../tpl/`), `./${projectName}`, {
        recursive: true,
      });
    });

  // else {
  //   const { action } = await inquirer.prompt([
  //     {
  //       name: "action",
  //       type: "list",
  //       message: `${chalk.red(dir)} 已经存在, 请选择:`,
  //       choices: [
  //         {
  //           name: "覆盖",
  //           value: "overwrite",
  //         },
  //         {
  //           name: "合并",
  //           value: "merge",
  //         },
  //         {
  //           name: "取消",
  //           value: false,
  //         },
  //       ],
  //     },
  //   ]);
  //   if (!action) return;
  // }
};

module.exports = { create };
