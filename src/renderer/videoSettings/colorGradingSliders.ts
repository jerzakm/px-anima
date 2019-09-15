import { createSettingsGroup, creteSliderContainer } from "./settingSliders"
import * as noUiSlider from 'nouislider';
import { videoFilters } from "../video/activeFilters";

export const createColorGradingSliders = (parent: HTMLDivElement) => {
  const group = createSettingsGroup('Color grading', 'Description of what it does. Not too long and not too short. Just right')
  red(group)
  green(group)
  blue(group)
  gamma(group)
  contrast(group)
  brightness(group)
  saturation(group)
  parent.appendChild(group)
}

const red = (group: HTMLDivElement) => {
  const redSlider = creteSliderContainer('Red')
  group.appendChild(redSlider.container)

  const slider = makeSlider(redSlider.slider)

  const filter = videoFilters

  redSlider.value.innerText = `${filter.adjustment.red}`
  slider.set(filter.adjustment.red)

  slider.on('end', () => adjustValue())
  slider.on('slide', () => adjustValue())

  const adjustValue = () => {
    const value: any = slider.get()
    filter.adjustment.red = parseFloat(value)
    redSlider.value.innerText = `${filter.adjustment.red}`
  }
  return group
}

const green = (group: HTMLDivElement) => {
  const greenSlider = creteSliderContainer('Green')
  group.appendChild(greenSlider.container)

  const slider = makeSlider(greenSlider.slider)

  const filter = videoFilters

  greenSlider.value.innerText = `${filter.adjustment.green}`
  slider.set(filter.adjustment.green)

  slider.on('end', () => adjustValue())
  slider.on('slide', () => adjustValue())

  const adjustValue = () => {
    const value: any = slider.get()
    filter.adjustment.green = parseFloat(value)
    greenSlider.value.innerText = `${filter.adjustment.green}`
  }
  return group
}

const blue = (group: HTMLDivElement) => {
  const blueSlider = creteSliderContainer('Blue')
  group.appendChild(blueSlider.container)

  const slider = makeSlider(blueSlider.slider)

  const filter = videoFilters

  blueSlider.value.innerText = `${filter.adjustment.blue}`
  slider.set(filter.adjustment.blue)

  slider.on('end', () => adjustValue())
  slider.on('slide', () => adjustValue())

  const adjustValue = () => {
    const value: any = slider.get()
    filter.adjustment.blue = parseFloat(value)
    blueSlider.value.innerText = `${filter.adjustment.blue}`
  }
  return group
}

const gamma = (group: HTMLDivElement) => {
  const gammaSlider = creteSliderContainer('Gamma')
  group.appendChild(gammaSlider.container)

  const slider = makeSlider(gammaSlider.slider)

  const filter = videoFilters

  gammaSlider.value.innerText = `${filter.adjustment.gamma}`
  slider.set(filter.adjustment.gamma)

  slider.on('end', () => adjustValue())
  slider.on('slide', () => adjustValue())

  const adjustValue = () => {
    const value: any = slider.get()
    filter.adjustment.gamma = parseFloat(value)
    gammaSlider.value.innerText = `${filter.adjustment.gamma}`
  }
  return group
}

const contrast = (group: HTMLDivElement) => {
  const contrastSlider = creteSliderContainer('Contrast')
  group.appendChild(contrastSlider.container)

  const slider = makeSlider(contrastSlider.slider)

  const filter = videoFilters

  contrastSlider.value.innerText = `${filter.adjustment.contrast}`
  slider.set(filter.adjustment.contrast)

  slider.on('end', () => adjustValue())
  slider.on('slide', () => adjustValue())

  const adjustValue = () => {
    const value: any = slider.get()
    filter.adjustment.contrast = parseFloat(value)
    contrastSlider.value.innerText = `${filter.adjustment.contrast}`
  }
  return group
}

const brightness = (group: HTMLDivElement) => {
  const brightnessSlider = creteSliderContainer('Brightness')
  group.appendChild(brightnessSlider.container)

  const slider = makeSlider(brightnessSlider.slider)

  const filter = videoFilters

  brightnessSlider.value.innerText = `${filter.adjustment.brightness}`
  slider.set(filter.adjustment.brightness)

  slider.on('end', () => adjustValue())
  slider.on('slide', () => adjustValue())

  const adjustValue = () => {
    const value: any = slider.get()
    filter.adjustment.brightness = parseFloat(value)
    brightnessSlider.value.innerText = `${filter.adjustment.brightness}`
  }
  return group
}

const saturation = (group: HTMLDivElement) => {
  const saturationSlider = creteSliderContainer('Saturation')
  group.appendChild(saturationSlider.container)

  const slider = makeSlider(saturationSlider.slider)

  const filter = videoFilters

  saturationSlider.value.innerText = `${filter.adjustment.saturation}`
  slider.set(filter.adjustment.saturation)

  slider.on('end', () => adjustValue())
  slider.on('slide', () => adjustValue())

  const adjustValue = () => {
    const value: any = slider.get()
    filter.adjustment.saturation = parseFloat(value)
    saturationSlider.value.innerText = `${filter.adjustment.saturation}`
  }
  return group
}

const makeSlider = (div: HTMLDivElement) => {
  const slider = noUiSlider.create(div, {
    start: [1],
    range: {
      'min': [0],
      '30%': [1],
      '60%': [2],
      'max': [10]
    },
    behaviour: 'tap',
    animate: false,
    connect: false
  })

  return slider
}