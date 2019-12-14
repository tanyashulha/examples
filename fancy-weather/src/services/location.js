import currentLocation from './currentPosition';

class Location {
  constructor() {
    this.baseUrl = 'https://api.opencagedata.com/geocode/v1/json';
    this.key = 'a50b616500c046669396450777edce68';
  }

  getRequestUrl(query) {
    return `${this.baseUrl}?q=${query}&key=${this.key}&language=en&pretty=1&no_annotations=1`;
  }

  async request(query) {
    if (!query) {
      query = await currentLocation.request();
    }
    const url = this.getRequestUrl(query);
    const response = await fetch(url);
    const responseData = await response.json();
    const result = responseData.results[0];
    return {
      formatted: result.formatted,
      geometry: result.geometry
    };
  }
}

export default new Location();
