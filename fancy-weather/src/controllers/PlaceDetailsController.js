import weather from '../services/weather';
import { SEASONS, TIME } from '../constants';

export default class PlaceDetailsController {
  constructor(placeDetailsView, placeDetailsModel) {
    this.model = placeDetailsModel;
    this.view = placeDetailsView;
  }

  async updatePlace(locationData) {
    const placeData = await weather.request(locationData);
    this.model.setPlaceDetails(placeData);
  }

  getPlaceWeather() {
    return {
      name: this.model.getPlaceDetails().current.name,
      season: this.getSeason(this.model.getPlaceDetails().current.date),
      time: this.getTime(this.model.getPlaceDetails().current.time),
      summary: this.model.getPlaceDetails().current.summary.split(' ').join()
    };
  }

  getSeason(date) {
    const month = date.split(' ').pop();
    return SEASONS[month];
  }

  getTime(time) {
    return TIME[time.slice(0, 2)];
  }
}
