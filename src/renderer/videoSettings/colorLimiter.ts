import '@simonwep/pickr/dist/themes/monolith.min.css'
import * as Pickr from '@simonwep/pickr/dist/pickr.es5.min'

import { createSettingsGroup } from "./settingSliders"

export const createPaletteLimiterSliders = (parent: HTMLDivElement) => {
  const group = createSettingsGroup(
    'Color palette',
    'Pick from a set of awesome palettes provided from lospec.com or make your own. Large palettes may cause performance issues.'
  )
  palettePicker(group)
  parent.appendChild(group)
}

const colorPickers: any[] = []

const palettePicker = (parentGroup: HTMLDivElement) => {

  const colorGroup = document.createElement('div')
  colorGroup.className = 'colorGroup'
  parentGroup.appendChild(colorGroup)

  const edg16 = ['#e4a672', '#b86f50', '#743f39', '#3f2832', '#9e2835', '#e53b44', '#fb922b', '#ffe762', '#63c64d', '#327345', '#193d3f', '#4f6781', '#afbfd2', '#ffffff', '#2ce8f4', '#0484d1',]

  edg16.map(c => addColorPicker(colorGroup, c))

  colorPickers.map(picker => {
    // console.log(picker.getColor().toRGBA())
  })

}

const paletteRefresh = () => {
  console.log('palette has changed..')
}

const addColorPicker = (parent: HTMLDivElement, color: string) => {
  const el = document.createElement('div')
  parent.appendChild(el)
  let picker = new Pickr(Object.assign({
    el, theme: defaultPickerTheme,
    default: color
  }, defaultPickerConfig));
  picker.setColor(color, false)

  picker.getRoot().button.addEventListener('pointerdown', (e: PointerEvent) => {
    if (e.button == 2) {
      picker.destroyAndRemove()
      paletteRefresh()
    }
  })
  paletteRefresh()
  colorPickers.push(picker)
}

const defaultPickerTheme = 'monolith'
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