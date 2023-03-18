import chalk from 'chalk';
import dedent from 'dedent';
import { promises } from 'node:fs';

const printError = (error: string) => {
  console.log(chalk.bgRed(' Error ') + ' ' + error);
};

const printSuccess = (message: string) => {
  console.log(chalk.bgGreen(' Success ') + ' ' + message);
};

const printHelp = () => {
  console.log(
    dedent`
    ${chalk.bgCyan(' Help ')}
    Без параметров - вывод погоды
    -c, --city [CITY] для установки города
    -h, --help для вывода помощи
    -t, --token [API_KEY] для сохранения токена
    -v, --version для вывода версии приложения
    `
  );
};

const printWeather = (weather: Record<string, any>, icon: string) => {
  console.log(
    dedent`
    ${chalk.bgYellow(' Weather ')} Погода в городе: ${weather.name}
    ${icon}  ${weather.weather[0].description}
    Температура: ${weather.main.temp} (ощущается как: ${weather.main.feels_like})
    Влажность: ${weather.main.humidity}%
    Скорость ветра: ${weather.wind.speed}
  `
  );
};

const printVersion = async () => {
  const appPackage = JSON.parse(String(await promises.readFile('./package.json')));
  const version = appPackage.version;

  console.log(chalk.bgWhite(' Version ') + ' ' + version);
};

export { printError, printSuccess, printHelp, printWeather, printVersion };
