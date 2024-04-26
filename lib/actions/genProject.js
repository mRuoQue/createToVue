import ora from "ora";
import chalk from "chalk";
import { exec } from "child_process";
import fs from "fs";

import {
  isWindowComman,
  copyFile,
  __resolve,
  __join,
  checkDirExist,
} from "../utils/index.js";

const templateGitRepoUrl = "https://github.com/mRuoQue/vue3Template.git";

export default class GenProject {
  /**
   * name {} 项目名称(：vuePro)
   * app_path {} 项目安装路劲(: /d/workflow/vuePro)
   */
  constructor(name, app_path, options) {
    this.name = name;
    this.app_path = app_path;
    this.options = options;
  }

  init() {
    this.download(templateGitRepoUrl, this.name, this.app_path);
  }
  // 安装依赖
  async install(name) {
    const spinner = ora("install dependencies...");

    // process.chdir(this.app_path);

    spinner.start();
    exec(`cd ${name} && npm install`, (err, stdout, stderr) => {
      if (err) {
        spinner.fail(`安装失败: ${err}`);
        console.log(`${chalk.red("You can try to install by yourself...")}`);
        process.exit(1);
      }

      spinner.succeed();
      console.log(chalk.cyan(process.stdout));
      console.log(chalk.cyan(process.stderr));

      console.log(`\r\nSuccessfully created project ${chalk.cyan(name)}`);
      console.log("  cd " + chalk.cyan(name) + "\r\n");
      console.log("  npm run dev\r\n");
      process.exit(1);
    });
  }

  // 下载仓库
  download(gitRepoUrl, name, app_path) {
    const spinner = ora("download template ...");
    spinner.start();
    exec(`git clone -b master ${gitRepoUrl} ${name}`, async (err, stdout, stderr) => {
      if (err) {
        spinner.fail(`下载失败: ${err}`);
        console.log(`${chalk.green("try to download local template...")}`);
        copyFile(__resolve(__dirname, "../../tpl"), app_path);
      }

      if (checkDirExist(__resolve(app_path, "package.json"))) {
        let _data = JSON.parse(
          fs
            .readFileSync(__join(name, "package.json"), {
              encoding: "utf-8",
              flag: "r",
            })
            .toString()
        );
        _data.name = name;
        _data.version = "0.0.0";
        _data.description = "";
        let str = JSON.stringify(_data, null, 4);
        fs.writeFileSync(__resolve(name, "package.json"), str);
      }
      spinner.succeed();
      await this.install(name);
    });
  }
}
