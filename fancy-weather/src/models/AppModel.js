import BgModel from './BgModel';
import PlaceDetailsModel from './PlaceDetailsModel';

export default class AppModel {
  constructor() {
    this.bgModel = new BgModel();
    this.placeDetailsModel = new PlaceDetailsModel();
  }

  getM(modelName) {
    return this[`${modelName}Model`];
  }
}
