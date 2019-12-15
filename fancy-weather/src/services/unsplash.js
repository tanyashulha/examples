class Unsplash {
  constructor() {
    this.baseUrl = 'https://api.unsplash.com/photos/random';
  }

  async requestImage(name, season, time, summary) {
    const url = `${this.baseUrl}?query=${name},${season},${time},${summary}&client_id=b55d67373566eb04ebab1d71624b480c8d7840f46a783091587fa37de41897f0`;
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }
}

export default new Unsplash();
