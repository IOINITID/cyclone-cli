import axios from 'axios';

class APIService {
  public async getWeather(token: string, city: string) {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: token,
        lang: 'ru',
        units: 'metric',
      },
    });

    return data;
  }

  public getWeatherIcon(icon: string) {
    switch (icon.slice(0, -1)) {
      case '01':
        return '☀️';
      case '02':
        return '🌤';
      case '03':
        return '☁️';
      case '04':
        return '☁️';
      case '09':
        return '🌧';
      case '10':
        return '🌦';
      case '11':
        return '🌩';
      case '13':
        return '❄️';
      case '50':
        return '🌫';
      default:
        return;
    }
  }
}

export const apiService = new APIService();
