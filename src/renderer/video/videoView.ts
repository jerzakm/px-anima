import { Container, Sprite, Texture } from "pixi.js";
import { loader, renderer } from "..";
// import * as PixiFilters from 'pixi-filters'
import { RgbColor } from "../shaders/PaletteLimiterBuilder";
import { updateVideoSlider } from "./videoSlider";
import { videoFilters } from "./activeFilters";
import { hexStringToRgb } from "../../common/color";


export const initVideoView = (parent: Container) => {


  return update
}

export let videoSource: undefined | HTMLVideoElement

let vidSprite: undefined | Sprite


export const refreshFilters = () => {
  if (vidSprite) {
    vidSprite.filters = [
      videoFilters.adjustment,
      videoFilters.pixelate,
      videoFilters.paletteLimiter,
      videoFilters.edgeDetect
    ]
  }
}

const test = async (parent: Container) => {

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
        renderer.ticker.maxFPS = 144
        updateVideoSlider(videoSource.currentTime, videoSource.duration)
      }

      vidSprite.scale.x = 1.5
      vidSprite.scale.y = 1.5
      parent.addChild(vidSprite)


      // const vidSprite2 = Sprite.from(videoTexture)
      // vidSprite2.scale.x = 1.5
      // vidSprite2.scale.y = 1.5
      // parent.addChild(vidSprite2)
      // vidSprite2.filters = [
      //   videoFilters.adjustment,
      //   new KawaseBlurFilter(6, 3),
      //   videoFilters.paletteLimiter,
      //   new EdgeDetectShader(),
      //   videoFilters.pixelate,
      // ]

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
