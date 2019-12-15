import unsplash from '../services/unsplash';

export default class BgController {
  constructor(bgView, bgModel) {
    this.model = bgModel;
    this.view = bgView;

    this.updateBg = this.updateBg.bind(this);
  }

  async updateBg(name, season, time, summary) {
    this.name = name || this.name;
    this.season = season || this.season;
    this.time = time || this.time;
    this.summary = summary || this.summary;
    const bgData = await unsplash.requestImage(this.name, this.season, this.time, this.summary);
    this.model.setBgSrc(bgData.urls.regular);
  }
}
