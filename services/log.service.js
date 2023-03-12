import chalk from 'chalk';
import dedent from 'dedent';

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

export { printError, printSuccess, printHelp, printWeather };
