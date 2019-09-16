import { createSettingsGroup, creteSliderContainer } from "./settingSliders"
import * as noUiSlider from 'nouislider';
import { videoFilters } from "../video/activeFilters";

export const createPixelizerSliders = (parent: HTMLDivElement) => {
  const { container, settingsGroup } = createSettingsGroup(
    'Pixelizer',
    'Set a pixel size.'
  )
  pixelizer(container)
  parent.appendChild(settingsGroup)
}

const pixelizer = (group: HTMLDivElement) => {
  const pixelFilter = creteSliderContainer('Size')
  group.appendChild(pixelFilter.container)

  const slider = makeSlider(pixelFilter.slider)

  const filter = videoFilters

  pixelFilter.value.innerText = `${filter.pixelate.uniforms.size[0]}`
  slider.set(filter.pixelate.uniforms.size[0])

  slider.on('end', () => adjustValue())
  slider.on('slide', () => adjustValue())

  const adjustValue = () => {
    const value: any = slider.get()
    filter.pixelate.size = [parseInt(value, 10), parseInt(value, 10)]
    pixelFilter.value.innerText = `${parseInt(value, 10)}`
  }
  return group
}

const makeSlider = (div: HTMLDivElement) => {
  const slider = noUiSlider.create(div, {
    start: [1],
    range: {
      'min': [1],
      '30%': [5],
      '60%': [10],
      'max': [64]
    },
    behaviour: 'tap',
    animate: false,
    connect: false
  })

  return slider
}