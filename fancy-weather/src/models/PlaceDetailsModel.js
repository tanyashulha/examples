import BaseModel from './BaseModel';

export default class PlaceDetailsModel extends BaseModel {
  constructor() {
    super();
    this.details = {
      current: {
        name: '',
        date: '',
        time: '',
        temperature: '',
        icon: '',
        summary: '',
        feels: '',
        wind: '',
        humidity: ''
      },
      daily: [
        {
          day: '',
          temperature: '',
          icon: ''
        },
        {
          day: '',
          temperature: '',
          icon: ''
        },
        {
          day: '',
          temperature: '',
          icon: ''
        }
      ]
    };
  }

  getPlaceDetails() {
    return this.details;
  }

  setPlaceDetails(placeDetails) {
    this.details = placeDetails;
    this.notify();
  }
}
