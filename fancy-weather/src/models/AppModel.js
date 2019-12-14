import BgModel from './BgModel';
import PlaceDetailsModel from './PlaceDetailsModel';
import PlaceLocation from './PlaceLocationModel';

export default class AppModel {
  constructor() {
    this.bgModel = new BgModel();
    this.placeDetailsModel = new PlaceDetailsModel();
    this.placeLocationModel = new PlaceLocation();
  }

  getM(modelName) {
    return this[`${modelName}Model`];
  }
}
