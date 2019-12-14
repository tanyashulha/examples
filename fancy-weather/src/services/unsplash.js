class Unsplash {
  constructor() {
    this.baseUrl = 'https://api.unsplash.com/photos/random';
  }

  async requestImage(config = {}) {
    const city = config.city || 'Minsk';
    const url = `${this.baseUrl}?query=cloud,day,${city}&client_id=d9527d55ef42e54f67eaae0cccda18a110c09ce1c76951211ccd747929c5604a`;
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }
}

export default new Unsplash();
