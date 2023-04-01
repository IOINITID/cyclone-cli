import chalk from 'chalk';
import dedent from 'dedent';
import { appController } from 'src/controllers/app.controller';
import gradient from 'gradient-string';
import figlet from 'figlet';
import dayjs from 'dayjs';

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

  public async weather(weather: Record<string, any>): Promise<void> {
    const countryGradient = gradient(['#B3DAFF', '#A988F1']);

    const getTempColor = (temp: number): string => {
      if (temp < 10) {
        return '#AAE8F5';
      }

      if (temp < 25) {
        return '#F3F5AA';
      }

      return '#F5CAAA';
    };

    const message = dedent`
    ${'-'.repeat(50)}

    ${countryGradient.multiline(weather.name)} ${countryGradient.multiline(`[${weather.sys.country}]`)}
    ${chalk.hex('#53565C')(`LAT ${weather.coord.lat} LON ${weather.coord.lon}`)}

    ${chalk.hex(getTempColor(weather.main.temp))(`°${Math.round(weather.main.temp)}C`)} ${' '.repeat(15)} ${chalk.hex(
      getTempColor(weather.main.temp)
    )(`Feels like °${Math.round(weather.main.feels_like)}C`)}
    ${' '.repeat(20)} ${chalk.hex('#FFFFFF')(
      `Min ${chalk.hex(getTempColor(weather.main.temp_min))(`°${Math.round(weather.main.temp_min)}C`)}`
    )} / ${chalk.hex('#FFFFFF')(
      `Max ${chalk.hex(getTempColor(weather.main.temp_max))(`°${Math.round(weather.main.temp_max)}C`)}`
    )}

    ${chalk.hex('#FFFFFF')(
      weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.substring(1)
    )} ${' '.repeat(10)} ${chalk.hex('#82A4FC')(`Wind speed ${Math.round(weather.wind.speed)}m/s`)}
    ${' '.repeat(20)} ${chalk.hex('#82A4FC')(`Direction ${Math.round(weather.wind.deg)}°`)}

    ${chalk.hex('#FFFFFF')(dayjs().format('ddd, DD HH:mm'))} ${' '.repeat(6)} ${chalk.hex('#F3F5AA')(
      `Sunrise ${dayjs.unix(weather.sys.sunrise).format('HH:mm')}`
    )}
    ${' '.repeat(20)} ${chalk.hex('#F5CAAA')(`Sunset  ${dayjs.unix(weather.sys.sunset).format('HH:mm')}`)}

    ${chalk.hex('#FFFFFF')(`Pressure ${chalk.hex('#E0FB95')(`${weather.main.pressure}mm`)}`)} ${' '.repeat(
      4
    )} ${chalk.hex('#FFFFFF')(`Humidity ${chalk.hex('#E0FB95')(`${weather.main.humidity}%`)}`)}

    ${'-'.repeat(50)}
    `;

    console.log(message);
  }

  public log(...optionalParams: any[]): void {
    console.log(chalk.bgWhite(' Log '), ...optionalParams);
  }
}

export const printService = new PrintService();
