import BgController from './BgController';
import PlaceDetailsController from './PlaceDetailsController';

export default class AppController {
  constructor(appView, appModel) {
    this.model = appModel;
    this.view = appView;
    this.bgController = new BgController(this.view.getV('bg'), this.model.getM('bg'));
    this.placeDetailsController = new PlaceDetailsController(this.view.getV('placeDetails'), this.model.getM('placeDetails'));
  }

  getC(controllerName) {
    return this[`${controllerName}Controller`];
  }
}
