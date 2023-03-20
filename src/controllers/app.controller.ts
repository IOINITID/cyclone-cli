import { AxiosError } from 'axios';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import { apiService } from 'src/services/api.service';
import { printService } from 'src/services/print.service';
import { Storage, storageService } from 'src/services/storage.service';
import { promises } from 'node:fs';

class AppController {
  public async getAppVersion(): Promise<string> {
    const appPackage = JSON.parse((await promises.readFile('./package.json')).toString());
    const version = appPackage.version;

    return version;
  }

  public async saveToken(token: string): Promise<void> {
    const spinner = createSpinner();

    if (token === 'true') {
      spinner.error({ text: 'Token not transferred' });

      return;
    }

    try {
      spinner.start({ text: 'Saving a token' });

      await storageService.set(Storage.Token, token);

      spinner.success({ text: 'Token saved' });
    } catch (error) {
      spinner.error({ text: 'Error saving token' });
    }
  }

  public async saveCity(city: string): Promise<void> {
    const spinner = createSpinner();

    if (city === 'true') {
      spinner.error({ text: 'City not transferred' });

      return;
    }

    try {
      spinner.start({ text: 'Saving the city' });

      await storageService.set(Storage.City, city);

      spinner.success({ text: 'City saved' });
    } catch (error) {
      spinner.error({ text: 'City save error' });
    }
  }

  public async getWeatherForecast(): Promise<void> {
    const spinner = createSpinner();

    try {
      let token = (await storageService.get(Storage.Token)) || '';
      let city = (await storageService.get(Storage.City)) || '';

      // TODO: Вынести проверуки в отдельный метод
      if (!token) {
        const prompt = inquirer.createPromptModule();

        const inputToken = await prompt({
          type: 'input',
          name: 'token',
          message: 'Add the API key obtained from the service https://openweathermap.org:',
        });

        if (inputToken.token) {
          await this.saveToken(inputToken.token);
          token = (await storageService.get(Storage.Token)) || '';
        } else {
          spinner.error({
            text: 'API key not added, retry request or add it via -t, --token [API_KEY] command',
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
          message: 'Add city:',
        });

        if (inputCity.city) {
          await this.saveCity(inputCity.city);
          city = (await storageService.get(Storage.City)) || '';
        } else {
          spinner.error({
            text: 'City not added, repeat request or add it via command -c, --city [CITY]',
          });
          return;
        }
      }

      spinner.start({ text: 'Loading' });

      const weather = await apiService.getWeather(token, city);

      spinner.success({ text: 'Loaded' });

      printService.weather(weather);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          spinner.error({ text: 'Incorrect city specified, update it with the command -c, --city [CITY]' });
        } else if (error.response?.status === 401) {
          spinner.error({ text: 'Incorrect token specified, update it via command -t, --token [API_KEY]' });
        }
        return;
      }

      spinner.error({ text: 'Loading error' });
    }
  }
}

export const appController = new AppController();
