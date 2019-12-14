export default class PlaceLocationController {
  constructor(placeLocationView, placeLocationModel) {
    this.model = placeLocationModel;
    this.view = placeLocationView;
  }

  async updateLocation(geometry) {
    this.model.setPlaceCoordinates(geometry);
  }
}
