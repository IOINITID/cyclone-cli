import chalk from 'chalk';
import dedent from 'dedent';
import { promises } from 'node:fs';

class PrintService {
  public success(message: string) {
    console.log(chalk.bgGreen(' Success ') + ' ' + message);
  }

  public error(message: string) {
    console.log(chalk.bgRed(' Error ') + ' ' + message);
  }

  public help() {
    const message = dedent`
    Без параметров - вывод погоды
    -c, --city [CITY] для установки города
    -h, --help для вывода помощи
    -t, --token [API_KEY] для сохранения токена
    -v, --version для вывода версии приложения
    `;

    console.log(chalk.bgCyan(' Help ') + message);
  }

  public async version() {
    const appPackage = JSON.parse(String(await promises.readFile('./package.json')));
    const version = appPackage.version;

    console.log(chalk.bgWhite(' Version ') + ' ' + version);
  }

  public weather(weather: Record<string, any>, icon: string) {
    const message = dedent`
    Погода в городе: ${weather.name}
    ${icon}  ${weather.weather[0].description}
    Температура: ${weather.main.temp} (ощущается как: ${weather.main.feels_like})
    Влажность: ${weather.main.humidity}%
    Скорость ветра: ${weather.wind.speed}
  `;

    console.log(chalk.bgYellow(' Weather ') + ' ' + message);
  }

  public log(...optionalParams: any[]): void {
    console.log(chalk.bgWhite(' Log '), ...optionalParams);
  }
}

export const printService = new PrintService();
