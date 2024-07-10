import fs from "fs";
import { _red } from "./chalk";

export const readDir = (path: string) =>
  new Promise((res, rej) => {
    fs.readdir(path, (err) => {
      console.log(path, err, "==");
      if (!err) res(true);
      rej(false);
      // rej(
      //   `${_red("Not exists dir")} ${
      //     typeof err === "string" ? err : JSON.stringify(err)
      //   }`
      // );
    });
  });

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
