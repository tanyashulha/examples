import BaseModel from './BaseModel';

export default class PlaceLocation extends BaseModel {
  constructor() {
    super();
    this.coordinates = {
      lat: '',
      lng: '',
    };
    this.token = 'pk.eyJ1Ijoic2h1bGhhdGFueWEiLCJhIjoiY2s0M3pnNmpwMGM3ZTNrbGs1aXkwNW13ZiJ9.FMn09As8DSXTthRwsa1lWA';
  }

  getPlaceCoordinates() {
    return this.coordinates;
  }

  getToken() {
    return this.token;
  }

  setPlaceCoordinates(placeCoordinates) {
    this.coordinates = placeCoordinates;
    this.notify();
  }
}
