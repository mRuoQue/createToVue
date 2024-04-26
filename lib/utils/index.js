import { type } from "os";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import PKG from "../../package.json" assert { type: "json" };

export const __resolve = path.resolve;
export const __join = path.join;
let __noop = () => {};

export const workflowPath = process.cwd();

export function isWindowComman() {
  return /^win/.test(process.platform) ? "npm.cmd" : "npm";
}

export function getPkgVersion() {
  return PKG.version || "0.0.1";
}

export function getCmdName() {
  return Object.keys(PKG.bin)[0];
}

export function existPath() {
  return fs.existsSync(path);
}
export function checkDirExist(dirName, needCreate = false) {
  if (fs.existsSync(dirName)) return true;
  if (needCreate) {
    fs.mkdir(dirName, (err) => {});
    return true;
  }
  return false;
}

export function copyFile(from, to, callback = null) {
  try {
    fs.cpSync(from, to, { recursive: true });
    if (callback) callback();
  } catch (err) {}
}
