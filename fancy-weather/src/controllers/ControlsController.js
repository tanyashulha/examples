export default class ControlsController {
  constructor(controlsView, updateBg, search, changeTemperatureFar) {
    this.view = controlsView;
    this.search = search;
    this.changeTemp = changeTemperatureFar;

    this.view.refresh.addEventListener('click', () => updateBg());
    this.view.search.addEventListener('submit', this.onSearch.bind(this));
    this.view.temperature.addEventListener('click', this.changeTemperature.bind(this));
  }

  async onSearch(event) {
    event.preventDefault();
    this.query = this.view.searchInput.value;

    if (this.query) {
      const searchSucceed = await this.search(this.query);

      if (!searchSucceed) {
        this.view.search.classList.add('error');
        setTimeout(() => {
          this.view.search.classList.remove('error');
        }, 1000);
      }
    }
  }

  changeTemperature(event) {
    const element = event.target;
    const buttons = [...element.parentNode.children];
    if (element.tagName === 'DIV') {
      buttons.forEach((button) => {
        button.classList.remove('active');
      });
      element.classList.add('active');

      this.search(this.query, element.dataset.units);
    }
  }
}
