class Unsplash {
  constructor() {
    this.baseUrl = 'https://api.unsplash.com/photos/random';
  }

  async requestImage(name, season, time, summary) {
    const url = `${this.baseUrl}?query=${name},${season},${time},${summary}&client_id=44e686577c229c8ac0c98b246f5cfdbc1de65695ac95b2cdad0899957674f5e5`;
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }
}

export default new Unsplash();
