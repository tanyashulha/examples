import weather from '../services/weather';

export default class PlaceDetailsController {
  constructor(placeDetailsView, placeDetailsModel) {
    this.model = placeDetailsModel;
    this.view = placeDetailsView;
    this.updatePlace();
  }

  async updatePlace() {
    const placeData = await weather.request();
    this.model.setPlaceDetails(placeData);
  }
}
