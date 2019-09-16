// import Sortable from 'sortablejs';
import { createColorGradingSliders } from './colorGradingSliders';
import { createPixelizerSliders } from './pixelizerSliders';
import { createPaletteLimiterSliders } from './colorLimiter';

export const createSettingsSliders = (parent: HTMLDivElement) => {
  createColorGradingSliders(parent)
  createPixelizerSliders(parent)
  createPaletteLimiterSliders(parent)
  // Sortable.create(parent, {});
}



export const createSettingsGroup = (name: string, description: string) => {
  const settingsGroup = document.createElement('div')
  settingsGroup.className = `settingsGroup`
  const header = document.createElement('h2')
  const desc = document.createElement('span')
  header.innerText = name
  desc.innerText = description
  settingsGroup.appendChild(header)
  settingsGroup.appendChild(desc)
  return settingsGroup
}

export const creteSliderContainer = (name: string) => {
  const container = document.createElement('div')
  container.className = 'sliderContainer'
  const label = document.createElement('label')
  label.innerText = name
  const slider = document.createElement('div')

  const value = document.createElement('label')
  value.innerText = '!default'
  container.appendChild(label)
  container.appendChild(slider)
  container.appendChild(value)

  return { container, label, slider, value }
}