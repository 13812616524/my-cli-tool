import {
  readDir,
  mkdir,
  rm,
  _red,
  readFile,
  copyFolder,
  loading,
} from "@utils";
import { join } from "path";
import { exec } from "child_process";
import { TemplateRepo, TemplateName } from "../../../constant/repo";
import inquirer from "inquirer";

//projectName { force: true } --
export default async function (projectName, cmd) {
  //1. 判断文件夹是否存在
  //若存在则判断force为true则删除
  //false则提示错误

  //nodejs=>fs
  const currentPath = join(process.cwd(), projectName);
  console.log(`currentPath:${currentPath}`);
  console.log(projectName, cmd, "--");

  try {
    // const exists = await readDir(currentPath);
    const exists = await readDir(currentPath);
    console.log(`exists: ${exists}`);

    if (cmd.force && exists) {
      //强制清除文件
      await rm(currentPath);
    } else if (exists) {
      //存在文件夹提示错误 返回
      console.log(_red("The files exist. Use --force to overwrite."));
      return;
    }

    //不存在文件，创建文件夹+下载git
    await mkdir(currentPath);

    //下载模版了
    //download-git-repo => fs对内部进行小修改
    const templatePath = join(process.cwd(), TemplateName);
    console.log(`templatePath:${templatePath}`);

    if (await readDir(templatePath)) {
      console.log(`JRKit-templates is existed! Please remove it!`);
      process.exit(1);
    }

    loading.start("下载模版...");
    exec(`git clone ${TemplateRepo}`, async (err) => {
      if (err) {
        console.log("can  not clone this repo,please try agin later!");
        console.error(`Error: ${err.message}`);
        console.error(`Command: ${err.cmd}`);
        console.error(`Code: ${err.code}`);
        console.error(
          "Possible causes: network issues, firewall restrictions, or incorrect repository URL."
        );
        process.exit(1);
      }

      const project = await readFile(join(templatePath, "project.json"));
      loading.stop();

      // const question = [
      //   {
      //     type: "list",
      //     message: "请选择一个模版：",
      //     name: "template",
      //     choices: JSON.parse(project),
      //   },
      // ];
      const { template } = await inquirer.prompt([
        {
          type: "list",
          message: "请选择一个模版：",
          name: "template",
          choices: JSON.parse(project as any),
        },
      ]);

      const newPath = currentPath;
      const oldPath = join(templatePath, template);

      loading.start("生成模版...");
      await copyFolder(oldPath, newPath);
      //删除克隆模版
      await rm(templatePath);
      loading.stop();

      //npm i
    });
  } catch (err) {
    loading.stop();
    console.error(`${_red("Error!")}\n`, err);
    process.exit(1);
  }
}
