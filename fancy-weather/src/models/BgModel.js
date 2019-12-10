import BaseModel from './BaseModel';

export default class BgModel extends BaseModel {
  constructor() {
    super();
    this.image = {
      src: '../images/img1.jpg'
    };
  }

  getBgSrc() {
    return this.image.src;
  }

  setBgSrc(src) {
    this.image.src = src;
    this.notify();
  }
}
