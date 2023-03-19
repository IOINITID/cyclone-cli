![logo](logo.svg)

[![npm version](https://badge.fury.io/js/cyclone-cli.svg)](https://badge.fury.io/js/cyclone-cli)
![npm](https://img.shields.io/npm/dw/cyclone-cli)
![license](https://badgen.net/github/license/IOINITID/cyclone-cli)
![minzip](https://img.shields.io/bundlephobia/minzip/cyclone-cli)

![!last-commit](https://img.shields.io/github/last-commit/ioinitid/cyclone-cli)
![!PRs-welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![!code style-prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4)

# ![logo](logo.svg) Cyclone

## CLI for getting weather forecast.

### About:

The API token from the open weather map service is used, for the weather forecast to work, you need to register on the service and get the API token https://openweathermap.com.

To get the weather forecast, you need to run the command: `cyclone`

On the first run, the token and city API setup process will be started to complete the request.

### Features:

- Show weather with CLI
- One of the popular weather APIs is used - OpenWeatherMap
- Interactive CLI with the ability to select actions, show loading states and text animations when displaying information
- Emoji as weather icon display
- Written in TypeScript
- Small application size, only 5 kb
- Can be installed globally

### Install:

Can be used both globally and locally.

#### Global install

To install via npm: `npm install --global cyclone-cli`

To install via yarn: `yarn add --global cyclone-cli`

#### Local install

To install via npm: `npm install --save-dev cyclone-cli`

To install via yarn: `yarn add cyclone-cli`

### Usage:

You can see the available commands with the command: `cyclone —help` or `cyclone -h`.

To refresh the API token, you can enter the command: `cyclone —token [API_KEY]` or `cyclone -t [API_KEY]`.

To update the city, you can enter the command: `cyclone —city [CITY]` or `cyclone -c [CITY]`.

You can find out the version of the application using the command: `cyclone —version` or `cyclone -v`.

### Configuration:

The application settings file is located in the user folder, in the hidden directory `.cyclone/config.json`. It contains a set of settings for different versions of the application.

### Dependencies:

- <a href='https://www.npmjs.com/package/axios'>Axios</a>
- <a href='https://www.npmjs.com/package/chalk'>Chalk</a>
- <a href='https://www.npmjs.com/package/dedent'>Dedent</a>
- <a href='https://www.npmjs.com/package/inquirer'>Inquirer</a>
- <a href='https://www.npmjs.com/package/nanospinner'>Nanospinner</a>
- <a href='https://www.npmjs.com/package/yargs'>Yargs</a>

### Changelog:

A list of all versions and their changes can be found in the <a href='https://github.com/IOINITID/cyclone-cli/blob/main/CHANGELOG.md'>CHANGELOG.md</a> file. The releases of each version are located on the <a href='https://github.com/IOINITID/cyclone-cli/releases'>releases page</a> on Github.

### Contributing:

If you want to improve the project, you can submit your PR with corrections or improvements. The file <a href='https://github.com/IOINITID/cyclone-cli/blob/main/CONTRIBUTING.md'>CONTRIBUTING.md</a> describes the details of how to start and configure the project.

### Code of conduct:

The rules for the community when sending pull requests are in the file <a href='https://github.com/IOINITID/cyclone-cli/blob/main/CODE_OF_CONDUCT.md'>CODE_OF_CONDUCT.md</a>.

### License:

The MIT license is located in the file <a href='https://github.com/IOINITID/cyclone-cli/blob/main/LICENSE.md'>LICENSE.md</a>.
