import { IDS } from '../constants';

export default class BaseView {
  constructor() {
    this.ids = IDS;
    this.mount();
  }

  mount() {
    document.body.insertAdjacentHTML('beforeend', this.getElement());
  }

  getElement() {
    return (
      `<div class="wrapper" id=${this.ids.container}>
        <div class="header container" id=${this.ids.controls}>
        </div>
        <div class="main container" id="main">
          <div class="place-details" id=${this.ids.details}>
          </div>
          <div class="place-position" id=${this.ids.position}>
          </div>
        </div>
      </div>`
    );
  }
}
