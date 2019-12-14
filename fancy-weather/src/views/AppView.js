import BaseView from './BaseView';
import BgView from './BgView';
import PlaceDetailsView from './PlaceDetailsView';
import PlaceLocationView from './PlaceLocationView';
import ControlsView from './ControlsView';

class AppView extends BaseView {
  constructor(appModel) {
    super();
    this.model = appModel;
    this.bgView = new BgView(this.model.getM('bg'));
    this.placeDetailsView = new PlaceDetailsView(this.model.getM('placeDetails'));
    this.placeLocationView = new PlaceLocationView(this.model.getM('placeLocation'));
    this.controlsView = new ControlsView();
  }

  getV(viewName) {
    return this[`${viewName}View`];
  }
}

export default AppView;
