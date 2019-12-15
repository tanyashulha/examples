// Dependencies
import location from '../services/location';

// Controllers
import BgController from './BgController';
import PlaceDetailsController from './PlaceDetailsController';
import PlaceLocationController from './PlaceLocationController';
import ControlsController from './ControlsController';

export default class AppController {
  constructor(appView, appModel) {
    this.model = appModel;
    this.view = appView;
    this.bgController = new BgController(this.view.getV('bg'), this.model.getM('bg'));
    this.placeDetailsController = new PlaceDetailsController(this.view.getV('placeDetails'), this.model.getM('placeDetails'));
    this.placeLocationController = new PlaceLocationController(this.view.getV('placeLocation'), this.model.getM('placeLocation'));
    this.controlsController = new ControlsController(this.view.getV('controls'), this.bgController);

    this.init();
  }

  async init() {
    const locationData = await location.request();
    this.placeDetailsController.updatePlace(locationData);
    this.placeLocationController.updateLocation(locationData.geometry);
    this.bgController.updateBg();
  }

  getC(controllerName) {
    return this[`${controllerName}Controller`];
  }
}
