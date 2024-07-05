/*
 * @Author: manyanzhang manyanzhang8@gmail.com
 * @Date: 2024-07-05 14:02:44
 * @LastEditors: manyanzhang manyanzhang8@gmail.com
 * @LastEditTime: 2024-07-05 14:02:51
 * @FilePath: /my-node-project/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { Command } = require("commander");
const program = new Command();

program
  .version("1.0.0")
  .description("A simple CLI")
  .option("-n, --name <name>", "specify your name")
  .option("-a, --age <age>", "specify your age", parseInt)
  .parse(process.argv);

const options = program.opts();

if (options.name) console.log(`Hello, ${options.name}!`);
if (options.age) console.log(`You are ${options.age} years old.`);
