import BgController from './BgController';

export default class AppController {
  constructor(appView, appModel) {
    this.model = appModel;
    this.view = appView;
    this.bgController = new BgController(this.view.getV('bg'), this.model.getM('bg'));
  }

  getC(controllerName) {
    return this[`${controllerName}Controller`];
  }
}
