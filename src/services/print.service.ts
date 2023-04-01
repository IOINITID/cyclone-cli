import chalk from 'chalk';
import dedent from 'dedent';
import { appController } from 'src/controllers/app.controller';
import gradient from 'gradient-string';
import figlet from 'figlet';

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
    const versionGradient = gradient(['#B2DAFF', '#A988F1']);
    const version = await appController.getAppVersion();

    figlet.text(`Cyclone ${version}`, { font: 'Slant' }, (error, result) => {
      if (error) {
        console.log(`Cyclone ${version}`);
        return;
      }

      console.log(versionGradient.multiline(result));
    });
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
