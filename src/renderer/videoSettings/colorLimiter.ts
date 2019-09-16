import '@simonwep/pickr/dist/themes/monolith.min.css'
import * as Pickr from '@simonwep/pickr/dist/pickr.es5.min'

import { createSettingsGroup } from "./settingSliders"
import { PaletteLimiterBuilder, RgbColor } from '../shaders/PaletteLimiterBuilder'
import { videoFilters } from '../video/activeFilters'
import { refreshFilters } from '../video/videoView'

export const createPaletteLimiterSliders = (parent: HTMLDivElement) => {
  const { container, settingsGroup } = createSettingsGroup(
    'Color palette',
    'Pick from a set of awesome palettes provided from lospec.com or make your own. Large palettes may cause performance issues.'
  )
  palettePicker(container)
  makePaletteBrowser(container)
  parent.appendChild(settingsGroup)
}

const colorPickers: any[] = []

const palettePicker = (parentGroup: HTMLDivElement) => {

  const colorGroup = document.createElement('div')
  colorGroup.className = 'colorGroup'
  parentGroup.appendChild(colorGroup)

  const fireStorm = ['#1b2032', '#46344a', '#f95e3e', '#fd4b35', '#ec6756', '#ff845f', '#ffa15f', '#fdde85', '#ffecb3']

  const edg16 = ['#e4a672', '#b86f50', '#743f39', '#3f2832', '#9e2835', '#e53b44', '#fb922b', '#ffe762', '#63c64d', '#327345', '#193d3f', '#4f6781', '#afbfd2', '#ffffff', '#2ce8f4', '#0484d1',]

  fireStorm.map(c => addColorPicker(colorGroup, c))
}

const paletteRefresh = () => {
  console.log('palette has changed..')
  const palette: RgbColor[] = []
  colorPickers.map(picker => {
    const pickerColor = picker.getColor().toRGBA()
    const paletteColor: RgbColor = {
      r: pickerColor[0],
      g: pickerColor[1],
      b: pickerColor[2]
    }
    palette.push(paletteColor)
  })

  const paletteLimiter = new PaletteLimiterBuilder(palette)
  videoFilters.paletteLimiter = paletteLimiter
  refreshFilters()
}

const addColorPicker = (parent: HTMLDivElement, color: string) => {
  const defaultPickerConfig = {
    swatches: [
      'rgb(244, 67, 54)',
      'rgb(233, 30, 99)',
      'rgb(156, 39, 176)',
      'rgb(103, 58, 183)',
      'rgb(63, 81, 181)',
      'rgb(33, 150, 243)',
      'rgba(3, 169, 244)'
    ],
    defaultRepresentation: 'HEXA',
    closeOnScroll: true,

    components: {
      preview: true,
      opacity: false,
      hue: true,

      interaction: {
        hex: false,
        rgba: false,
        hsva: false,
        input: true,
        clear: false,
        save: true
      }
    }
  }

  const el = document.createElement('div')
  parent.appendChild(el)
  let picker = new Pickr(Object.assign({
    el, theme: 'monolith',
    default: color
  }, defaultPickerConfig));
  picker.setColor(color, false)

  picker.getRoot().button.addEventListener('pointerdown', (e: PointerEvent) => {
    if (e.button == 2) {
      for (var i = colorPickers.length - 1; i >= 0; --i) {
        if (picker.getColor().toHEXA().join() == colorPickers[i].getColor().toHEXA().join()) {
          colorPickers.splice(i, 1);
        }
      }
      picker.destroyAndRemove()
      paletteRefresh()
    }
  })

  picker.on('change', () => paletteRefresh())
  picker.on('save', () => paletteRefresh())
  picker.on('cancel', () => paletteRefresh())
  picker.on('close', () => paletteRefresh())

  paletteRefresh()
  colorPickers.push(picker)
}

const makePaletteBrowser = (parentGroup: HTMLDivElement) => {
  const btnContainer = document.createElement('div')
  btnContainer.className = 'btnContainer'

  const save = document.createElement('button')
  save.className = 'pxBtn'
  save.innerHTML = 'Save'

  const browse = document.createElement('button')
  browse.className = 'pxBtn'
  browse.innerHTML = 'Browse'
  btnContainer.appendChild(browse)
  btnContainer.appendChild(save)
  parentGroup.appendChild(btnContainer)
}