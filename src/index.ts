#!/usr/bin/env node
//标识文件使用node执行

import { Command } from "commander";
import Pack from "../package.json";

const program = new Command();

program
  .name(Pack.name)
  .description("A simple CLI")
  .version(Pack.version)
  .helpOption("-h, --HELP", "read more information")
  .usage("<command> [option]");

program.parse(process.argv);
