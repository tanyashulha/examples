import BgView from './BgView';

export default class AppView {
  constructor(appModel) {
    this.model = appModel;
    this.bgView = new BgView(this.model.getM('bg'));
  }

  getV(viewName) {
    return this[`${viewName}View`];
  }
}
