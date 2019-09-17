import '@simonwep/pickr/dist/themes/monolith.min.css'
import * as Pickr from '@simonwep/pickr/dist/pickr.es5.min'

import { createSettingsGroup } from "./settingSliders"
import { PaletteLimiterBuilder, RgbColor } from '../shaders/PaletteLimiterBuilder'
import { videoFilters } from '../video/activeFilters'
import { refreshFilters } from '../video/videoView'
import { readStaticFile } from '../../common/filesystemUtils'

export const createPaletteLimiterSliders = (parent: HTMLDivElement) => {
  const { container, settingsGroup } = createSettingsGroup(
    'Color palette',
    'Pick from a set of awesome palettes provided from lospec.com or make your own. Large palettes may cause performance issues.'
  )
  palettePicker(container)
  makePaletteBrowser(container)
  parent.appendChild(settingsGroup)
}

let colorPickers: any[] = []
const colorPickerContainer = document.createElement('div')

const palettePicker = (parentGroup: HTMLDivElement) => {

  colorPickerContainer.className = 'colorGroup'
  parentGroup.appendChild(colorPickerContainer)

  const edg16 = ['#e4a672', '#b86f50', '#743f39', '#3f2832', '#9e2835', '#e53b44', '#fb922b', '#ffe762', '#63c64d', '#327345', '#193d3f', '#4f6781', '#afbfd2', '#ffffff', '#2ce8f4', '#0484d1',]

  edg16.map(c => addColor(colorPickerContainer, c))
}

const paletteRefresh = () => {
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

const addColor = (parent: HTMLDivElement, color: string, refresh = true) => {
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

  refresh ? paletteRefresh() : null
  colorPickers.push(picker)
}

const makePaletteBrowser = (parentGroup: HTMLDivElement) => {
  const defaultPalettes: ColorPalette[] = JSON.parse(readStaticFile('/lospecPalettes.json'))
  console.log(defaultPalettes)

  const btnContainer = document.createElement('div')
  btnContainer.className = 'btnContainer'

  const save = document.createElement('button')
  save.className = 'pxBtn'
  save.innerHTML = 'Save'

  btnContainer.appendChild(save)
  parentGroup.appendChild(btnContainer)

  const colorBrowserWindow = document.createElement('ul')
  colorBrowserWindow.className = 'colorBrowser'

  parentGroup.appendChild(colorBrowserWindow)

  defaultPalettes.map(cp => {
    const paletteContainer = document.createElement('li')
    paletteContainer.className = 'paletteContainer'

    let palette = ''
    cp.colors.map(c => palette += `<div style="background-color:${c}"></div>`)
    paletteContainer.innerHTML +=
      `
        <span>${cp.name}</span>
        <div class="colorContainer">
          ${palette}
        </div>
    `
    colorBrowserWindow.appendChild(paletteContainer)

    paletteContainer.addEventListener('pointerdown', () => {
      for (let i = 0; i < colorPickers.length; i++) {
        colorPickers[i].destroyAndRemove()
      }
      colorPickers = []
      for (const color of cp.colors) {
        addColor(colorPickerContainer, color, false)
      }
      paletteRefresh()
    })
  })
}

interface ColorPalette {
  name: string,
  colors: string[]
}