const { type } = require("os");
const PKG = require("../../package.json");
const fs = require("path");

function getPkgVersion() {
  return PKG.version || "0.0.1";
}
function getCmdName() {
  return Object.keys(PKG.bin)[0];
}

function getDirExistSync(dir) {
  if (fs.existSync(dir)) {
    fs.readdir(dir, function (err, files) {
      if (err) {
      }
      return files.include(dir);
    });
  }
  return fs.existSync(dir);
}

function copyFile(from, to) {
  const source = fs.readdirSync(source, { withFileTypes: true });

  for (const file of source) {
    const childFrom = path.resolve(from, file.name);
    const childTo = path.resolve(to, file.name);
    if(file.isDirectory){
      copyFile(childFrom,childTo)
    }
  }
}

module.exports = {
  getPkgVersion,
  getCmdName,
  getDirExistSync,
  copyFile
};
