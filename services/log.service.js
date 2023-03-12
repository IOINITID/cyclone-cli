import chalk from 'chalk';
import dedent from 'dedent';
import { promises } from 'fs';

const printError = (error) => {
  console.log(chalk.bgRed(' Error ') + ' ' + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
  console.log(
    dedent`
    ${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -c [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    -v для вывода версии приложения
    `
  );
};

const printWeather = (weather, icon) => {
  console.log(
    dedent`
    ${chalk.bgYellow(' WEATHER ')} Погода в городе: ${weather.name}
    ${icon}  ${weather.weather[0].description}
    Температура: ${weather.main.temp} (ощущается как: ${weather.main.feels_like})
    Влажность: ${weather.main.humidity}%
    Скорость ветра: ${weather.wind.speed}
  `
  );
};

const printVersion = async () => {
  const appPackage = JSON.parse(await promises.readFile('./package.json'));
  const version = appPackage.version;

  console.log(chalk.bgWhite(' VERSION ') + ' ' + version);
};

export { printError, printSuccess, printHelp, printWeather, printVersion };
