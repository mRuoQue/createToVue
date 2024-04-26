
import ora from 'ora'

export default function install (value,options)=>{

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
}