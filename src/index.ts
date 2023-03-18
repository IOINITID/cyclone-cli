#!/usr/bin/env node
import { AxiosError } from 'axios';
import chalk from 'chalk';
import dedent from 'dedent';
import { apiService } from './services/api.service';
import { printService } from './services/print.service';
import { Storage, storageService } from './services/storage.service';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

export const saveToken = async (token: string) => {
  if (!token.length) {
    printService.error('Токен не передан');
    return;
  }

  try {
    await storageService.set(Storage.Token, token);
    printService.success('Токен сохранен');
  } catch (error) {
    if (error instanceof Error) {
      printService.error(error.message);
    }
  }
};

export const saveCity = async (city: string) => {
  if (!city.length) {
    printService.error('Город не передан');
    return;
  }

  try {
    await storageService.set(Storage.City, city);
    await apiService.getWeather();

    printService.success('Город сохранен');
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        printService.error('Ошибка сохранения, неверно указан город');
      } else if (error.response?.status === 401) {
        printService.error('Ошибка сохранения, неверно указан токен');
      }
    }

    if (error instanceof Error) {
      printService.error(error.message);
    }
  }
};

const getWeatherForecast = async () => {
  try {
    const weather = await apiService.getWeather();

    printService.weather(weather, apiService.getWeatherIcon(weather.weather[0].icon) as string);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        printService.error('Неверно указан город, обновите его через команду -c, --city [CITY]');
      } else if (error.response?.status === 401) {
        printService.error('Неверно указан токен, обновите его через команду -t, --token [API_KEY]');
      }
    }

    if (error instanceof Error) {
      printService.error(error.message);
    }
  }
};

const initCLI = async () => {
  const args = await yargs(hideBin(process.argv)).help(false).version(false).argv;

  if (process.env.MODE === 'development') {
    console.log(
      dedent`${chalk.bgWhite(' Log ')} Переданные аргументы:
  `,
      args
    );
  }

  if (args.h || args.help) {
    return printService.help();
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
    return printService.version();
  }

  return getWeatherForecast();
};

initCLI();
