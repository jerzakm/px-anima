import { Container, Sprite, Texture } from "pixi.js";
import { loader, renderer } from "..";
import * as PixiFilters from 'pixi-filters'
import { PaletteLimiterBuilder, RgbColor } from "../shaders/PaletteLimiterBuilder";
import Color = require("color");


export const initVideoView = (parent: Container) => {
  test(parent)

  return update
}

let videoController: undefined | HTMLVideoElement

const test = async (parent: Container) => {
  const edg16 = [
    '#2b0f54',
    '#ab1f65',
    '#ff4f69',
    '#fff7f8',
    '#ff8142',
    '#ffda45',
    '#3368dc',
    '#49e7ec',
  ]

  loader
    .add('vid', 'D:\/px-anima\/static\/vid.mp4')
    .load(() => {
      const video = loader.resources['vid'].data

      const videoTexture = Texture.from(video)

      const vidSprite = Sprite.from(videoTexture)

      if (video instanceof HTMLVideoElement) {
        videoController = video
        video.volume = 0
        video.loop = true
        video.playbackRate = 1.0
        renderer.ticker.maxFPS = 8
      }

      console.log(vidSprite)
      vidSprite.scale.x = 1.5
      vidSprite.scale.y = 1.5
      parent.addChild(vidSprite)

      const palette: RgbColor[] = []
      edg16.map(c => palette.push(hexStringToRgb(c)))

      const adjustment = new PixiFilters.AdjustmentFilter({ brightness: 1.1, gamma: 1.4, contrast: 2.7, saturation: 1.0, red: 1.0, green: 1.0 })
      const paletteLimiter = new PaletteLimiterBuilder(palette)

      vidSprite.filters = [
        adjustment,
        paletteLimiter,
        new PixiFilters.PixelateFilter(16),
        // new WaveyStripes(),
        // new filters.AlphaFilter(0.3),
        // new SketchFilter()
      ]
    })
}

const update = (delta: number) => {
  if (videoController instanceof HTMLVideoElement) {

  }
}

const hexStringToRgb = (hex: string) => {
  const c = new Color(hex)
  return { r: c.red(), g: c.green(), b: c.blue() }
}