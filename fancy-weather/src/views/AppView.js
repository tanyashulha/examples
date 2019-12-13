import BaseView from './BaseView';
import BgView from './BgView';
import PlaceDetailsView from './PlaceDetailsView';

class AppView extends BaseView {
  constructor(appModel) {
    super();
    this.model = appModel;
    this.bgView = new BgView(this.model.getM('bg'));
    this.placeDetails = new PlaceDetailsView(this.model.getM('placeDetails'));
  }

  getV(viewName) {
    return this[`${viewName}View`];
  }
}

export default AppView;
