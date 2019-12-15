class Unsplash {
  constructor() {
    this.baseUrl = 'https://api.unsplash.com/photos/random';
  }

  async requestImage(config = {}) {
    const city = config.city || 'Minsk';
    const yearTime = config.yearTime || 'spring';
    const weather = config.weather || 'cloud';
    const dayTime = config.dayTime || 'day';
    const url = `${this.baseUrl}?query=${yearTime},${weather},${dayTime},${city}&client_id=44e686577c229c8ac0c98b246f5cfdbc1de65695ac95b2cdad0899957674f5e5`;
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }
}

export default new Unsplash();
