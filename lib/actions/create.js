import inquirer from "inquirer";
import path from "path";
import chalk from "chalk";
import fs from "fs";

import {
  checkDirExist,
  copyFile,
  __join,
  __resolve,
  workflowPath,
} from "../utils/index.js";

import GenProject from "./genProject.js";

/***
 * 创建项目目录，处理create 命令行及配置参数
 *
 */
export const create = async (value, options) => {
  console.log(`当前目录：${chalk.green(`${workflowPath}--- /${value}`)}`);
  // 要创建的项目路劲
  const app_path = __resolve(workflowPath, value);
  if (checkDirExist(__resolve(workflowPath, value))) {
    if (options.force) {
      await fs.rmdirSync(app_path);
    } else {
      const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: `${chalk.cyan(app_path)} already exists. Pick an action:`,
          choices: [
            { name: "Overwrite", value: "overwrite" },
            { name: "Cancel", value: false },
          ],
        },
      ]);
      if (!action) return;
      else if (action === "overwrite") {
        console.log(`remove ${chalk.cyan(app_path)} and re-create`);
        await fs.rmdirSync(app_path);
      }
    }
  }

  const genProject = new GenProject(value, app_path, options);
  // 创建目录安装项目
  genProject.init();
};
