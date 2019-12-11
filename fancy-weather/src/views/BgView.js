export default class BgView {
  constructor(bgModel) {
    this.model = bgModel;
    this.model.addObserver(this);
    this.mount();
  }

  mount() {
    document.body.insertAdjacentHTML('beforeend', this.getElement());
  }

  getElement() {
    return `<div class="wrapper" id="app-container" style="background-image:url(${this.model.getBgSrc()})"></div>`;
  }

  render() {
    if (!this.element) {
      this.element = document.getElementById('app-container');
    }

    this.element.outerHTML = this.getElement();
  }
}
