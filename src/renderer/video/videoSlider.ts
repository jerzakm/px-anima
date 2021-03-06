export let sliderController: noUiSlider.noUiSlider | undefined

import * as noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import { videoSource, videoPlaybackSettings } from './videoView';

export const createVideoSlider = () => {
  const videoSliderContainer = document.createElement('div')

  const connect: any = 'lower'

  sliderController = noUiSlider.create(videoSliderContainer, {
    start: [0, 1, 2],
    tooltips: true,
    range: {
      'min': [0],
      'max': [100]
    },
    behaviour: 'tap',
    animate: false,
    connect: [false, connect, false, false],
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
    if (videoSource) {
      videoSource.pause()
    }
  })
  slider.on('end', (values) => {
    if (videoSource) {
      videoSource.currentTime = parseFloat(values[1])
      videoSource.play()
      videoPlaybackSettings.min = parseFloat(values[0])
      videoPlaybackSettings.max = parseFloat(values[2])
      updateVideoSlider(videoSource.currentTime, videoSource.duration, videoPlaybackSettings.min, videoPlaybackSettings.max)
    }
  })
}

export const updateVideoSlider = (currentTime: number, totalTime: number, min: number, max: number) => {
  if (sliderController) {
    if (totalTime) {
      sliderController.updateOptions({ start: [0, 0, totalTime], range: { min: [0], max: [totalTime] } })
    }
    sliderController.set([min, currentTime, max])
  }
}