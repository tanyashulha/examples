export default class BaseModel {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notify() {
    if (this.observers.length) {
      this.observers.forEach((observer) => observer.render());
    }
  }
}
