const { type } = require("os");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const __resolve = path.resolve;
const __join = path.join;
const PKG = require("../../package.json");
const workflowPath = process.cwd();
let __noop = () => {};

function getPkgVersion() {
  return PKG.version || "0.0.1";
}

function getCmdName() {
  return Object.keys(PKG.bin)[0];
}

function existPath() {
  return fs.existsSync(path);
}
async function checkDirExist(dirName, needCreate = false) {
  if (fs.existsSync(dirName)) return true;

  if (needCreate) {
    fs.mkdir(dirName, (err) => {});
    return true;
  }
  return false;
}

function copyFile(from, to, callback = null) {
  try {
    fs.cpSync(from, to, { recursive: true });
    if (callback) callback();
  } catch (err) {}
}

module.exports = {
  getPkgVersion,
  getCmdName,
  checkDirExist,
  copyFile,
  __resolve,
  __join,
  workflowPath,
};
