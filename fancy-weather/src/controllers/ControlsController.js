export default class ControlsController {
  constructor(controlsView, updateBg, search) {
    this.view = controlsView;
    this.search = search;

    this.view.refresh.addEventListener('click', updateBg);
    this.view.search.addEventListener('submit', this.onSearch.bind(this));
  }

  async onSearch(event) {
    event.preventDefault();
    const query = this.view.searchInput.value;

    if (query) {
      const searchSucceed = await this.search(query);

      if (!searchSucceed) {
        this.view.search.classList.add('error');
        setTimeout(() => {
          this.view.search.classList.remove('error');
        }, 1000);
      }
    }
  }
}
