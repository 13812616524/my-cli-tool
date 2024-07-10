#!/usr/bin/env node
//标识文件使用node执行

import { Command } from "commander";
import inquirer from "inquirer";
import Pack from "../package.json";

const program = new Command();

program
  .name(Pack.name)
  .description("A simple CLI")
  .version(Pack.version)
  .helpOption("-h, --HELP", "read more information")
  .usage("<command> [option]");

program.command("choose").action(() => {
  inquirer
    .prompt([
      {
        type: "checkbox",
        message: "Select toppings",
        name: "toppings",
        choices: [
          new inquirer.Separator(" = The Meats = "),
          {
            name: "Pepperoni",
            value: "pepperoni",
          },
          {
            name: "Ham",
            value: "ham",
          },
          {
            name: "Ground Meat",
            value: "ground Meat",
          },
          {
            name: "Bacon",
            value: "bacon",
          },
          new inquirer.Separator(" = The Cheeses = "),
          {
            name: "Mozzarella",
            value: "mozzarella",
            checked: true,
          },
          {
            name: "Cheddar",
            value: "cheddar",
          },
          {
            name: "Parmesan",
            value: "parmesan",
          },
          new inquirer.Separator(" = The usual ="),
          {
            name: "Mushroom",
            value: "mushroom",
          },
          {
            name: "Tomato",
            value: "tomato",
          },
          new inquirer.Separator(" = The extras = "),
          {
            name: "Pineapple",
            value: "pineapple",
          },
          {
            name: "Olives",
            disabled: "out of stock",
            value: "olives",
          },
          {
            name: "Extra cheese",
            value: "extra cheese",
          },
        ],
        validate(answer) {
          if (answer.length === 0) {
            return "You must choose at least one topping.";
          }

          return true;
        },
      },
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers, null, "  "));
    });
});

program.parse(process.argv);
