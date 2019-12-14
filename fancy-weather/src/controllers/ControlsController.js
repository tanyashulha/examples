export default class ControlsController {
  constructor(controlsView, bgController) {
    this.view = controlsView;
    this.bgController = bgController;

    this.view.refresh.addEventListener('click', this.updateBg.bind(this));
  }

  updateBg() {
    this.bgController.updateBg();
  }
}
