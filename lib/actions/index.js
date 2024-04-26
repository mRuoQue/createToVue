const inquirer = require("inquirer");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs");
const downloadGitRepo = require("download-git-repo");

const {
  checkDirExist,
  copyFile,
  __join,
  __resolve,
  workflowPath,
} = require("../utils/index");
const commandSpawn = require("../utils/terminal");

const cdInstallProject = (targetPath) => {
  inquirer
    .prompt([
      {
        name: "ok",
        type: "confirm",
        message: "是否进入项目目录?",
      },
    ])
    .then(async (answers) => {
      const { packageManager } = answers;
      process.chdir(targetPath);

      await commandSpawn(
        /^win/.test(process.platform) ? "npm.cmd" : "npm",
        ["install"],
        { cwd: targetPath }
      );
      //npm run serve
      await commandSpawn(
        /^win/.test(process.platform) ? "npm.cmd" : "npm",
        ["run", "dev"],
        { cwd: targetPath }
      );
    });
};

const create = async (projectName, options) => {
  console.log(`当前目录：${chalk.green(`${workflowPath}--- /${projectName}`)}`);
  await inquirer
    .prompt([{ name: "ok", type: "confirm", message: "在当面目录下创建?" }])
    .then((answers) => {
      const { name, type } = answers;
      console.log(checkDirExist(__resolve(workflowPath, projectName), true));

      if (checkDirExist(__resolve(workflowPath, projectName), true)) {
        copyFile(
          __join(__dirname, "../../tpl/"),
          __resolve(workflowPath, projectName),
          cdInstallProject(__resolve(workflowPath, projectName))
        );
      }
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
