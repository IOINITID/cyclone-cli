#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp } from './services/log.service.js';

const initCLI = () => {
  const args = getArgs(process.argv);

  console.log('LOG: CLI args:', args);

  if (args.h) {
    printHelp();
  }

  if (args.c) {
    // TODO: Сохранить город
  }

  if (args.t) {
    // TODO: Сохранить токен
  }

  // TODO: Вывести погоду
};

initCLI();
