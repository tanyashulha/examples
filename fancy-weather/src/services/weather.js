import { DAYS, MONTHS } from '../constants';

class Weather {
  constructor() {
    this.baseUrl = 'https://api.darksky.net/forecast/';
    this.key = '81230847a84a88aed4968cf90d060929';
  }

  async request(location = { geometry: {} }, lang = 'en') {
    this.lang = lang;
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const {
      geometry: { lat, lng },
      formatted
    } = location;
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
        time: this.formatTime(data.offset),
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
    return `${DAYS[this.lang][date.getDay()]}, ${date.getDate()} ${MONTHS[this.lang][date.getMonth()]}`;
  }

  formatTime(offset) {
    offset -= 3;
    const date = new Date();
    date.setTime( date.getTime() + offset * 60 * 60 * 1000 );
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return `${date.getHours()}:${minutes}`;
  }
}

export default new Weather();
