#!/usr/bin/env node
import { printService } from './services/print.service';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { appController } from './controllers/app.controller';

const main = async () => {
  const args = await yargs(hideBin(process.argv)).help(false).version(false).argv;

  if (process.env.MODE === 'development') {
    printService.log('Args: ', args);
  }

  if (args.h || args.help) {
    return printService.help();
  }

  if (args.c || args.city) {
    if (args.c) {
      return appController.saveCity(String(args.c));
    }

    return appController.saveCity(String(args.city));
  }

  if (args.t || args.token) {
    if (args.t) {
      return appController.saveToken(String(args.t));
    }

    return appController.saveToken(String(args.token));
  }

  if (args.v || args.version) {
    return printService.version();
  }

  return appController.getWeatherForecast();
};

main();
