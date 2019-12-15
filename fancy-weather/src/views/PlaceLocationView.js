import mapboxgl from 'mapbox-gl';
import { IDS, DETAILS_TEXT } from '../constants';

export default class PlaceLocationView {
  constructor(placeLocationModel) {
    this.ids = IDS;
    this.model = placeLocationModel;
    this.model.addObserver(this);
    this.element = document.getElementById(IDS.position);
    this.mount();
  }

  getElement() {
    const { lat, lng } = this.model.getPlaceCoordinates();
    return `
    <div class="map" id=${this.ids.map}></div>
    <div class="coord" id=${this.ids.coords}>
      ${this.getCoord(DETAILS_TEXT.en.lat, lat)}
      ${this.getCoord(DETAILS_TEXT.en.lng, lng)}
    </div>
    `;
  }

  getCoord(text, value) {
    return `<p class="coord-txt">${text}<span>${value}</span></p>`;
  }

  mount() {
    const { lat, lng } = this.model.getPlaceCoordinates();
    mapboxgl.accessToken = this.model.getToken();
    this.element.innerHTML = this.getElement();
    this.coords = document.getElementById('coords');
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [lat, lng],
      zoom: 10
    });
  }

  render() {
    const { lat, lng } = this.model.getPlaceCoordinates();
    this.map.setCenter([lng, lat]);
    this.coords.innerHTML = `
      ${this.getCoord(DETAILS_TEXT.en.lat, lat)}
      ${this.getCoord(DETAILS_TEXT.en.lng, lng)}
    `;
  }
}
