import { IDS } from '../constants';

export default class ControlsView {
  constructor() {
    this.ids = IDS;
    this.element = document.getElementById(IDS.controls);
    this.render();
  }

  createElement() {
    return `
      ${this.createRefreshButton()}
      ${this.createLanguageSwitcher()}
      ${this.createTemperatureSwitcher()}
      ${this.createSearchField()}
    `;
  }

  createRefreshButton() {
    return `
      <div class="button-refresh" id=${this.ids.refresh}>
        <img src="images/refresh.png" alt="">
      </div>
    `;
  }

  createLanguageSwitcher() {
    return `
      <div class="button-language">
        <div class="drop-button">
          <p>EN</p>
          <span>&#8250;</span>
        </div>
        <ul class="dropdown-content">
          <li>EN</li>
          <li>RU</li>
          <li>BE</li>
        </ul>
      </div>
    `;
  }

  createTemperatureSwitcher() {
    return `
      <div class="button-temperature" id=${this.ids.temperature}>
        <div class="temp-far">&deg;F</div>
        <div class="temp-cel active">&deg;C</div>
      </div>
    `;
  }

  createSearchField() {
    return `
      <form class="search-field" id=${this.ids.search}>
        <input type="search" id=${this.ids.searchInput} name="search" placeholder="Search city..." required>
        <button class="submit-button">Search</button>
      </form>
    `;
  }

  render() {
    this.element.innerHTML = this.createElement();
    this.refresh = document.getElementById('refresh');
    this.search = document.getElementById('search');
    this.searchInput = document.getElementById('search-value');
    this.temperature = document.getElementById('temperature');
  }
}
