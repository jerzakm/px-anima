import { createSettingsGroup, creteSliderContainer } from "./settingSliders"
import * as noUiSlider from 'nouislider';
import { videoSource, vidSprite, videoPlaybackSettings } from "../video/videoView";
import { videoRecordingSettings } from "../video/videoSaving";

export const createPlaybackSliders = (parent: HTMLDivElement) => {
  playback(parent)
  recording(parent)
}

const playback = (parent: HTMLDivElement) => {
  const { container, settingsGroup } = createSettingsGroup(
    'Playback',
    ''
  )
  scale(container)
  speed(container)
  parent.appendChild(settingsGroup)
}

const recording = (parent: HTMLDivElement) => {
  const { container, settingsGroup } = createSettingsGroup(
    'Recording',
    ''
  )
  recordingFps(container)
  recordingScale(container)
  parent.appendChild(settingsGroup)
}

const scale = (group: HTMLDivElement) => {
  const playbackGroup = creteSliderContainer('Media scale')
  group.appendChild(playbackGroup.container)

  const slider = makeSlider(playbackGroup.slider, 0, 10)

  playbackGroup.value.innerText = `1`
  slider.set(1)

  slider.on('end', () => adjustValue())
  slider.on('slide', () => adjustValue())

  const adjustValue = () => {
    const value: any = slider.get()
    if (vidSprite) {
      vidSprite.scale.x = value
      vidSprite.scale.y = value
    }
    playbackGroup.value.innerText = `${parseFloat(value)}`
  }
  return group
}

const speed = (group: HTMLDivElement) => {
  const playbackGroup = creteSliderContainer('Speed')
  group.appendChild(playbackGroup.container)

  const slider = makeSlider(playbackGroup.slider, 0, 5)

  playbackGroup.value.innerText = `1`
  slider.set(1)

  slider.on('end', () => adjustValue())
  slider.on('slide', () => adjustValue())

  const adjustValue = () => {
    const value: any = slider.get()
    if (vidSprite && videoSource) {
      videoSource.playbackRate = value
    }
    playbackGroup.value.innerText = `${parseFloat(value)}`
  }
  return group
}

const recordingFps = (group: HTMLDivElement) => {
  const playbackGroup = creteSliderContainer('FPS')
  group.appendChild(playbackGroup.container)

  const slider = makeSlider(playbackGroup.slider, 0, 30)

  slider.set(12)

  slider.on('end', () => adjustValue())
  slider.on('slide', () => adjustValue())

  const adjustValue = () => {
    const value: any = slider.get()
    if (vidSprite) {
      videoRecordingSettings.recordingFps = parseInt(value, 10)
    }
    playbackGroup.value.innerText = `${parseInt(value, 10)}`
  }
  adjustValue()
  return group
}

const recordingScale = (group: HTMLDivElement) => {
  const playbackGroup = creteSliderContainer('Scale')
  group.appendChild(playbackGroup.container)

  const slider = makeSlider(playbackGroup.slider, 0, 1.99)

  slider.set(0)

  slider.on('end', () => adjustValue())
  slider.on('slide', () => adjustValue())

  const adjustValue = () => {
    const value: any = slider.get()
    if (vidSprite) {
      videoRecordingSettings.recordingScale = parseInt(value, 10)
    }
    playbackGroup.value.innerText = `${parseInt(value, 10)}`
  }
  adjustValue()
  return group
}

const makeSlider = (div: HTMLDivElement, min: number, max: number) => {
  const slider = noUiSlider.create(div, {
    start: [min],
    range: {
      'min': [min],
      '66%': [(min + max) / 2],
      'max': [max]
    },
    behaviour: 'tap',
    animate: false,
    connect: false
  })

  return slider
}