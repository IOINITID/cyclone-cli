import { AxiosError } from 'axios';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import { apiService } from 'src/services/api.service';
import { printService } from 'src/services/print.service';
import { Storage, storageService } from 'src/services/storage.service';

class CycloneController {
  public async saveToken(token: string) {
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
  }

  public async saveCity(city: string) {
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
  }

  public async getWeatherForecast() {
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
          await this.saveToken(inputToken.token);
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
          await this.saveCity(inputCity.city);
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
  }
}

export const cycloneController = new CycloneController();
