#!/usr/bin/env node
import { AxiosError } from 'axios';
import chalk from 'chalk';
import dedent from 'dedent';
import { getWeather, getWeatherIcon } from './services/api.service.js';
import { printError, printHelp, printSuccess, printVersion, printWeather } from './services/log.service.js';
import { saveKeyValue, TokenDictionary } from './services/storage.service.js';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

export const saveToken = async (token) => {
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

export const saveCity = async (city) => {
  if (!city.length) {
    printError('Город не передан');
    return;
  }

  try {
    await saveKeyValue(TokenDictionary.City, city);
    await getWeather();

    printSuccess('Город сохранен');
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response.status === 404) {
        printError('Ошибка сохранения, неверно указан город');
      } else if (error.response.status === 401) {
        printError('Ошибка сохранения, неверно указан токен');
      }
    }

    if (error instanceof Error) {
      printError(error.message);
    }
  }
};

const getWeatherForecast = async () => {
  try {
    const weather = await getWeather();
    printWeather(weather, getWeatherIcon(weather.weather[0].icon));
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response.status === 404) {
        printError('Неверно указан город, обновите его через команду -c, --city [CITY]');
      } else if (error.response.status === 401) {
        printError('Неверно указан токен, обновите его через команду -t, --token [API_KEY]');
      }
    }

    if (error instanceof Error) {
      printError(error.message);
    }
  }
};

const initCLI = () => {
  const args = yargs(hideBin(process.argv)).help(false).version(false).argv;

  if (process.env.MODE === 'development') {
    console.log(
      dedent`${chalk.bgWhite(' Log ')} Переданные аргументы:
  `,
      args
    );
  }

  if (args.h || args.help) {
    return printHelp();
  }

  if (args.c || args.city) {
    if (args.c) {
      return saveCity(String(args.c));
    }

    return saveCity(String(args.city));
  }

  if (args.t || args.token) {
    if (args.t) {
      return saveToken(String(args.t));
    }

    return saveToken(String(args.token));
  }

  if (args.v || args.version) {
    return printVersion();
  }

  return getWeatherForecast();
};

initCLI();
