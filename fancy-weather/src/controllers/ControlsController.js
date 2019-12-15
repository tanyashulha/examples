export default class ControlsController {
  constructor(controlsView, updateBg, search) {
    this.view = controlsView;

    this.view.refresh.addEventListener('click', updateBg);
    this.view.search.addEventListener('submit', (e) => {
      e.preventDefault();
      search(this.view.searchInput.value);
    });
  }
}
