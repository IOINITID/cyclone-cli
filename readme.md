[npm, licence, codestyle, download, install size]

# [Иконка] Cyclone

## CLI for getting weather forecast.

### About:

The API token from the open weather map service is used, for the weather forecast to work, you need to register on the service and get the API token https://openweathermap.com.

To get the weather forecast, you need to run the command: `cyclone`

On the first run, the token and city API setup process will be started to complete the request.

### Features:

- Show weather with CLI
- One of the popular weather APIs is used - OpenWeatherMap
- Detailed or minimal mode for weather display
- Application language selection, English and Russian are available
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

- Chalk
- Inquirer
- Axios

### Contributing:

If you want to improve the project, you can submit your PR with corrections or improvements. The file <a href='#'>contribute.md</a> describes the details of how to start and configure the project.

### Licence:

The MIT license is located in the file <a href='#'>licence.md</a>.
