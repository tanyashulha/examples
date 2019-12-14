import weather from '../services/weather';

export default class PlaceDetailsController {
  constructor(placeDetailsView, placeDetailsModel) {
    this.model = placeDetailsModel;
    this.view = placeDetailsView;
  }

  async updatePlace(locationData) {
    const placeData = await weather.request(locationData);
    this.model.setPlaceDetails(placeData);
  }
}
