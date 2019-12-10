import unsplash from '../services/unsplash';

export default class BgController {
  constructor(bgView, bgModel) {
    this.model = bgModel;
    this.view = bgView;
  }

  async updateBg() {
    const bgData = await unsplash.requestImage();
    this.model.setBgSrc(bgData.urls.regular);
  }
}
