import { IDS } from '../constants';

export default class ControlsView {
  constructor() {
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
      <div class="button-refresh" id='refresh'>
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
      <div class="button-temperature">
        <div class="temp-far">&deg;F</div>
        <div class="temp-cel active">&deg;C</div>
      </div>
    `;
  }

  createSearchField() {
    return `
      <div class="search-field">
        <input type="search" id="site-search" name="search" placeholder="Search city or ZIP">
        <button class="microphone"><img src="images/micr.png" alt=""></button>
        <button class="submit-button">Search</button>
      </div>
    `;
  }

  render() {
    this.element.innerHTML = this.createElement();
    this.refresh = document.getElementById('refresh');
  }
}
