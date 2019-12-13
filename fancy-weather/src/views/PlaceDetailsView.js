import { IDS, DAYS } from '../constants';


export default class PlaceDetailsView {
  constructor(placeDetailsModel) {
    this.model = placeDetailsModel;
    this.model.addObserver(this);
    this.element = document.getElementById(IDS.details);
    this.render();
  }

  getElement() {
    const placeDetails = this.model.getPlaceDetails();
    return `
      <div class="location-block">
        <p class="name-location">${placeDetails.current.name}</p>
        <div class="date-block">
          <p class="time">${placeDetails.current.time}</p>
          <p class="date">${placeDetails.current.date}</p>
        </div>
      </div>
      <div class="weather-block">
        <div class="temperature">
          <i class="wi wi-${placeDetails.current.icon}"></i>
          <p class="grad"><span>${placeDetails.current.temperature}</span>&#176;</p>
        </div>
        <div class="overview-block">
          <p class="detail">${placeDetails.current.summary}</p>
          <p class="detail">Feels like: <span>${placeDetails.current.feels}</span>&#176;</p>
          <p class="detail">Wind: <span>${placeDetails.current.wind}</span> m/s</p>
          <p class="detail">Humidity: <span>${placeDetails.current.humidity}</span>%</p>
        </div>
      </div>
      ${placeDetails.daily.map(this.getDay).join('')}
    `;
  }

  render() {
    this.element.innerHTML = this.getElement();
  }

  getDay({ day, icon, temperature }) {
    return `
      <div class="future-weather-block">
        <p class="date">${day}</p>
        <p class="grad"><span>${temperature}</span>&#176;</p>
        <i class="wi wi-${icon}"></i>
      </div>`;
  }
}
