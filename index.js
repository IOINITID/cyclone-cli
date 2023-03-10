#!/usr/bin/env node
import { AxiosError } from 'axios';
import chalk from 'chalk';
import dedent from 'dedent-js';
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { saveKeyValue, TokenDictionary } from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Токен не передан');
    return;
  }

  try {
    await saveKeyValue(TokenDictionary.Token, token);
    printSuccess('Токен сохранен');
  } catch (error) {
    printError(error.message);
  }
};

const getWeatherForecast = async () => {
  try {
    const weather = await getWeather(process.env.CITY);
    // TODO: Вывод погоды
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response.status === 404) {
        printError('Неверно указан город');
      } else if (error.response.status === 401) {
        printError('Неверно указан токен');
      }
    }

    if (error instanceof Error) {
      printError(error.message);
    }
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
};

initCLI();
