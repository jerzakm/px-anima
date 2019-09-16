import { Container, Sprite, Texture } from "pixi.js";
import { loader, renderer } from "..";
// import * as PixiFilters from 'pixi-filters'
import { RgbColor } from "../shaders/PaletteLimiterBuilder";
import Color = require("color");
import { updateVideoSlider } from "./videoSlider";
import { videoFilters } from "./activeFilters";
import { writeFile } from "fs";


export const initVideoView = (parent: Container) => {
  test(parent)

  return update
}

export let videoSource: undefined | HTMLVideoElement

let vidSprite: undefined | Sprite


export const refreshFilters = () => {
  if (vidSprite) {
    vidSprite.filters = [
      videoFilters.adjustment,
      videoFilters.pixelate,
      videoFilters.paletteLimiter
    ]
  }
}

const test = async (parent: Container) => {
  writeFile('test.json', 'contents...', () => {
    console.log('done??')
  })

  const gameboy = [
    '#332c50',
    '#46878f',
    '#94e344',
    '#e2f3e4',
  ]

  loader
    .add('vid', 'D:\/px-anima\/static\/vid.mp4')
    .load(() => {
      const video = loader.resources['vid'].data

      const videoTexture = Texture.from(video)

      vidSprite = Sprite.from(videoTexture)

      if (video instanceof HTMLVideoElement) {
        videoSource = video
        video.volume = 0
        video.loop = true
        // video.playbackRate = 0.5
        renderer.ticker.maxFPS = 144
        updateVideoSlider(videoSource.currentTime, videoSource.duration)
        // video.pause()
      }

      console.log(vidSprite)
      vidSprite.scale.x = 1.5
      vidSprite.scale.y = 1.5
      parent.addChild(vidSprite)

      const palette: RgbColor[] = []
      gameboy.map(c => palette.push(hexStringToRgb(c)))

      refreshFilters()
    })
}

const update = (delta: number) => {
  if (videoSource instanceof HTMLVideoElement && !videoSource.paused) {
    updateVideoSlider(videoSource.currentTime)
  }
}

const hexStringToRgb = (hex: string) => {
  const c = new Color(hex)
  return { r: c.red(), g: c.green(), b: c.blue() }
}