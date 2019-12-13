import location from './location';

class Weather {
  constructor() {
    this.baseUrl = 'https://api.darksky.net/forecast/';
    this.key = '943647ff9e14f1576eed0e266f439920';
    this.location = location.request();
  }

  async request(lang = 'en') {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const {
      geometry: { lat, lng },
      formatted
    } = await this.location;
    const url = `${proxy}${this.baseUrl}${this.key}/${lat},${lng}?lang=${lang}&exclude=hourly,flags&units=si`;
    const response = await fetch(url);
    const responseData = await response.json();
    return this.formatOutput(responseData, formatted);
  }

  formatOutput(data, locationName) {
    return {
      current: {
        name: locationName,
        date: this.formatDate(data.currently.time),
        time: this.formatTime(data.currently.time),
        temperature: parseInt(data.currently.temperature, 10),
        icon: data.currently.icon,
        summary: data.currently.summary,
        feels: parseInt(data.currently.apparentTemperature, 10),
        wind: parseInt(data.currently.windSpeed, 10),
        humidity: data.currently.humidity * 100
      },
      daily: this.formatDaily(data.daily.data)
    };
  }

  formatDaily(days) {
    return days.slice(1, 4).map(day => {
      return {
        icon: day.icon,
        temperature: parseInt((day.temperatureMax + day.temperatureMin) / 2, 10),
        day: (new Date(day.time * 1000)).getDay()
      }
    })
  }

  formatDate(utc) {
    const date = new Date(utc * 1000);
    return `${date.getDay()} ${date.getDate()} ${date.getMonth()}`;
  }

  formatTime(utc) {
    const date = new Date(utc * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
  }
}

export default new Weather();
