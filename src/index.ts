#!/usr/bin/env node
import { printService } from './services/print.service';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { cycloneController } from './controllers/cyclone.controller';

const main = async () => {
  const args = await yargs(hideBin(process.argv)).help(false).version(false).argv;

  if (process.env.MODE === 'development') {
    printService.log('Переданные аргументы: ', args);
  }

  if (args.h || args.help) {
    return printService.help();
  }

  if (args.c || args.city) {
    if (args.c) {
      return cycloneController.saveCity(String(args.c));
    }

    return cycloneController.saveCity(String(args.city));
  }

  if (args.t || args.token) {
    if (args.t) {
      return cycloneController.saveToken(String(args.t));
    }

    return cycloneController.saveToken(String(args.token));
  }

  if (args.v || args.version) {
    return printService.version();
  }

  return cycloneController.getWeatherForecast();
};

main();
