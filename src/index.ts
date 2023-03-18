#!/usr/bin/env node
import { AxiosError } from 'axios';
import { apiService } from './services/api.service';
import { printService } from './services/print.service';
import { Storage, storageService } from './services/storage.service';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';

// TODO: Добавить в cyclone controller
export const saveToken = async (token: string) => {
  const spinner = createSpinner();

  if (token === 'true') {
    spinner.error({ text: 'Токен не передан...' });

    return;
  }

  try {
    spinner.start({ text: 'Сохранение токена...' });

    await storageService.set(Storage.Token, token);

    spinner.success({ text: 'Токен сохранен...' });
  } catch (error) {
    spinner.error({ text: 'Ошибка сохранения токена...' });
  }
};

// TODO: Добавить в cyclone controller
export const saveCity = async (city: string) => {
  const spinner = createSpinner();

  if (city === 'true') {
    spinner.error({ text: 'Город не передан...' });

    return;
  }

  try {
    spinner.start({ text: 'Сохранение города...' });

    await storageService.set(Storage.City, city);

    spinner.success({ text: 'Город сохранен...' });
  } catch (error) {
    spinner.error({ text: 'Ошибка сохранения города...' });
  }
};

// TODO: Добавить в cyclone controller
const getWeatherForecast = async () => {
  const spinner = createSpinner();

  try {
    let token = await storageService.get(Storage.Token);
    let city = await storageService.get(Storage.City);

    // TODO: Вынести проверуки в отдельный метод
    if (!token) {
      const prompt = inquirer.createPromptModule();

      const inputToken = await prompt({
        type: 'input',
        name: 'token',
        message: 'Добавьте ключ API полученный с сервиса https://openweathermap.org:',
      });

      if (inputToken.token) {
        await saveToken(inputToken.token);
        token = await storageService.get(Storage.Token);
      } else {
        spinner.error({
          text: 'Не добавлен ключ API, повторите запрос или добавьте его через команду -t, --token [API_KEY]',
        });
        return;
      }
    }

    // TODO: Вынести проверуки в отдельный метод
    if (!city) {
      const prompt = inquirer.createPromptModule();

      const inputCity = await prompt({
        type: 'input',
        name: 'city',
        message: 'Добавьте город:',
      });

      if (inputCity.city) {
        await saveCity(inputCity.city);
        city = await storageService.get(Storage.City);
      } else {
        spinner.error({
          text: 'Город не добавлен, повторите запрос или добавьте его через команду -c, --city [CITY]',
        });
        return;
      }
    }

    spinner.start({ text: 'Загрузка...' });

    const weather = await apiService.getWeather(token, city);

    spinner.success({ text: 'Загружено...' });

    printService.weather(weather, apiService.getWeatherIcon(weather.weather[0].icon) as string);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        spinner.error({ text: 'Неверно указан город, обновите его через команду -c, --city [CITY]' });
      } else if (error.response?.status === 401) {
        spinner.error({ text: 'Неверно указан токен, обновите его через команду -t, --token [API_KEY]' });
      }
      return;
    }

    spinner.error({ text: 'Ошибка загрузки...' });
  }
};

const main = async () => {
  const args = await yargs(hideBin(process.argv)).help(false).version(false).argv;

  if (process.env.MODE === 'development') {
    printService.log('Переданные аргументы: ', args);
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

main();
