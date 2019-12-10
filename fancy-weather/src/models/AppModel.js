import BgModel from './BgModel';

export default class AppModel {
  constructor() {
    this.bgModel = new BgModel();
  }

  getM(modelName) {
    return this[`${modelName}Model`];
  }
}
