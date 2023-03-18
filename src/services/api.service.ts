import axios from 'axios';
import { Storage, storageService } from './storage.service';
import inquirer from 'inquirer';
import { saveCity, saveToken } from '../index';
import { createSpinner } from 'nanospinner';

class APIService {
  public async getWeather() {
    let token = process.env.TOKEN ?? (await storageService.get(Storage.Token));
    let city = process.env.CITY ?? (await storageService.get(Storage.City));

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
        throw new Error('Не добавлен ключ API, повторите запрос или добавьте его через команду -t, --token [API_KEY]');
      }
    }

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
        throw new Error('Город не добавлен, повторите запрос или добавьте его через команду -c, --city [CITY]');
      }
    }

    const spinner = createSpinner('Загрузка...').start();

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: token,
        lang: 'ru',
        units: 'metric',
      },
    });

    spinner.success();

    return data;
  }

  public getWeatherIcon(icon: string) {
    switch (icon.slice(0, -1)) {
      case '01':
        return '☀️';
      case '02':
        return '🌤';
      case '03':
        return '☁️';
      case '04':
        return '☁️';
      case '09':
        return '🌧';
      case '10':
        return '🌦';
      case '11':
        return '🌩';
      case '13':
        return '❄️';
      case '50':
        return '🌫';
      default:
        return;
    }
  }
}

export const apiService = new APIService();
