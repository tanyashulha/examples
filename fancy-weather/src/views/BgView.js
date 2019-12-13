import { IDS } from '../constants';

export default class BgView {
  constructor(bgModel) {
    this.model = bgModel;
    this.model.addObserver(this);
    this.element = document.getElementById(IDS.container);
    this.render();
  }

  render() {
    this.element.style.backgroundImage = `url('${this.model.getBgSrc()}')`;
  }
}
