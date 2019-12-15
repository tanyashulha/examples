import BaseModel from './BaseModel';

export default class BgModel extends BaseModel {
  constructor() {
    super();
    this.image = {
      src: ''
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
