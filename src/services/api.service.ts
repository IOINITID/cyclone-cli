import axios from 'axios';

class APIService {
  public async getWeather(token: string, city: string): Promise<Record<string, any>> {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: city, appid: token, lang: 'en', units: 'metric' },
    });

    return data;
  }
}

export const apiService = new APIService();
