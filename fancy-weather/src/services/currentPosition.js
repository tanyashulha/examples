class CurrentLocation {
  constructor() {
    this.baseUrl = 'https://ipinfo.io/json?token=';
    this.token = '14ffcd3dbf551f';
  }

  getRequestUrl() {
    return `${this.baseUrl}${this.token}`;
  }

  async request() {
    const url = this.getRequestUrl();
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData.city;
  }
}

export default new CurrentLocation();
