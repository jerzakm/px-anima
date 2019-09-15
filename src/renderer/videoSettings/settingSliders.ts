import * as noUiSlider from 'nouislider';
import Sortable from 'sortablejs';

export const createSettingsSliders = (parent: HTMLDivElement) => {
  parent.innerHTML += `
    <div class="settingsGroup">
      <h2>Color grading</h2>
      <span>Description of what it does. Not too long and not too short. Just right</span>
    </div>
    <div class="settingsGroup">
      <h2>Pixelization</h2>
      <span>Description of what it does. Not too long and not too short. Just right</span>
    </div>
    <div class="settingsGroup">
      <h2>Palette limiter</h2>
      <span>Description of what it does. Not too long and not too short. Just right</span>
    </div>
  `

  Sortable.create(parent, {});
}