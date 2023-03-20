import chalk from 'chalk';
import dedent from 'dedent';
import { appController } from 'src/controllers/app.controller';

class PrintService {
  public help(): void {
    const message = dedent`
    No parameters - weather output
    ----------------------------------------------------
    -t, --token [API_KEY] - saving the token
    -c, --city [CITY] - city setting
    -h, --help - displaying a list of available commands
    -v, --version - application version output
    `;

    console.log(chalk.bgWhite(' Help ') + ' ' + message);
  }

  public async version(): Promise<void> {
    console.log(chalk.bgWhite(' Version ') + ' ' + (await appController.getAppVersion()));
  }

  public weather(weather: Record<string, any>): void {
    const message = dedent`
    City: ${weather.name}
    Description: ${weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.substring(1)}
    Temperature: ${Math.round(weather.main.temp)}'c - Feels like: ${Math.round(weather.main.feels_like)}'c
    Humidity: ${weather.main.humidity}%
    Wind speed: ${weather.wind.speed}m/s`;

    console.log(chalk.bgYellow(' Weather ') + ' ' + message);
  }

  public log(...optionalParams: any[]): void {
    console.log(chalk.bgWhite(' Log '), ...optionalParams);
  }
}

export const printService = new PrintService();
