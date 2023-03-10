#!/usr/bin/env node
import chalk from 'chalk';
import dedent from 'dedent-js';
import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
  try {
    await saveKeyValue('token', token);
    printSuccess('Токен сохранен');
  } catch (error) {
    printError(error.message);
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  console.log(
    dedent`${chalk.bgYellowBright(' LOG ')} Переданные аргументы:
  `,
    args
  );

  if (args.h) {
    printHelp();
  }

  if (args.c) {
    // TODO: Сохранить город
  }

  if (args.t) {
    return saveToken(args.t);
  }

  // TODO: Вывести погоду
};

initCLI();
