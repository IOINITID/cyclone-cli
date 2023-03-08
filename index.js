#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";

const initCLI = () => {
  const args = getArgs(process.argv);

  console.log("LOG: CLI args:", args);

  if (args.help) {
    // TODO: Вывести help в консоль
  }

  if (args.city) {
    // TODO: Сохранить город
  }

  if (args.token) {
    // TODO: Сохранить токен
  }

  // TODO: Вывести погоду
};

initCLI();
