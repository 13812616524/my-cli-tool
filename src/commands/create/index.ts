import { readDir, mkdir, rm, _red } from "@utils";
import { join } from "path";

//projectName { force: true } --
export default async function (projectName, cmd) {
  //1. 判断文件夹是否存在
  //若存在则判断force为true则删除
  //false则提示错误

  //nodejs=>fs
  const currentPath = join(process.cwd(), projectName);
  console.log(currentPath);

  try {
    const exists = await readDir(currentPath);
    if (cmd.force) {
      //强制清除文件
      exists && (await rm(currentPath));
      await mkdir(currentPath);
    } else {
      //存在文件夹提示错误 返回
      if (exists) {
        console.log(_red("Exists dir"));
        return;
      }

      //不存在文件，创建文件夹+下载git
      await mkdir(currentPath);
      //下载模版了
      //download-git-repo => fs对内部进行小修改
    }
  } catch (e) {
    console.log(e);
  }

  // console.log(projectName, cmd, "--");
}
