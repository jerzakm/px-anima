export let sliderController: noUiSlider.noUiSlider | undefined

import * as noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import { videoSource } from './videoView';

export const createVideoSlider = () => {
  const videoSliderContainer = document.createElement('div')

  sliderController = noUiSlider.create(videoSliderContainer, {
    start: 0,
    tooltips: true,
    range: {
      'min': 0,
      'max': 100
    },
    behaviour: 'tap',
    animate: false,
    connect: 'lower',
    pips: {
      mode: 'positions',
      values: [0, 25, 50, 75, 100],
      density: 2
    }
  })

  initEventBindings(sliderController)

  return videoSliderContainer
}

const initEventBindings = (slider: noUiSlider.noUiSlider) => {
  slider.on('start', () => {
    console.log('start')
    if (videoSource) {
      videoSource.pause()
    }
  })
  slider.on('end', (values) => {
    if (videoSource) {
      videoSource.currentTime = parseFloat(values[0])
      videoSource.play()
    }
  })
}

export const updateVideoSlider = (currentTime: number, totalTime?: number) => {
  if (sliderController) {
    if (totalTime) {
      sliderController.updateOptions({ start: 0, range: { min: 0, max: totalTime } })
    }
    sliderController.set(currentTime)
  }
}