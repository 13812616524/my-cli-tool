import fs, { promises } from "fs";
import { _red } from "./chalk";

export const readDir = async (path: string): Promise<boolean> => {
  try {
    await promises.readdir(path);
    return true;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return false; // Directory does not exist
    } else {
      throw err; // Other errors should be thrown
    }
  }
};

// export const readDir = (path: string) =>
//   new Promise((res, rej) => {
//     fs.readdir(path, (err) => {
//       if (!err) res(true);
//       rej(false);
//     });
//   });

export const mkdir = (path: string) =>
  new Promise((res, rej) => {
    fs.mkdir(path, (err) => {
      if (!err) res("");
      rej(
        `${_red("Can not make dir")} ${
          typeof err === "string" ? err : JSON.stringify(err)
        }`
      );
    });
  });

export const rm = (path: string) =>
  new Promise((res, rej) => {
    fs.rm(path, { recursive: true }, (err) => {
      if (!err) res("");
      rej(
        `${_red("Can not remove")} ${
          typeof err === "string" ? err : JSON.stringify(err)
        }`
      );
    });
  });

export const readFile = (path: string) =>
  new Promise((res, rej) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (!err) res(data);
      rej(
        `${_red(`can't read ${path}`)} \n ${
          typeof err === "string" ? err : JSON.stringify(err)
        }`
      );
    });
  });

export const copyFolder = (oldP, newP) =>
  new Promise((res, rej) => {
    fs.cp(oldP, newP, { recursive: true }, (err) => {
      if (!err) res("");
      rej(
        `${_red('can not copy "' + oldP + '"')} \n ${
          typeof err === "string" ? err : JSON.stringify(err)
        }`
      );
    });
  });
