import { Container, Sprite, Texture } from "pixi.js";
import { loader, renderer } from "..";
// import * as PixiFilters from 'pixi-filters'
import { RgbColor } from "../shaders/PaletteLimiterBuilder";
import { updateVideoSlider } from "./videoSlider";
import { videoFilters } from "./activeFilters";
import { hexStringToRgb } from "../../common/color";
import { refreshVideoHeader } from "./videoInterface";

export let videoSource: undefined | HTMLVideoElement
let pixiVideoParent: Container | undefined
let vidSprite: undefined | Sprite

export const videoPlaybackSettings = {
  volume: 0,
  loop: true,
  scale: { x: 1, y: 1 },
  playbackSpeed: 1,
  tickerFps: 60,
  min: 0,
  max: 0
}

export const initVideoView = (parent: Container) => {
  pixiVideoParent = parent
  playVideo('D:\/px-anima\/static\/vid.mp4')
  return update
}

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
//'D:\/px-anima\/static\/vid.mp4'
export const playVideo = async (path: string) => {
  if (loader.resources[path]) {
    play()
  } else {
    loader
      .add(path, path)
      .load(() => {
        play()
      })
  }

  const name = path.split('\\')
  const title = name[name.length - 1].split('.')[0]
  refreshVideoHeader(title, path)

  function play() {
    if (pixiVideoParent) {
      const video = loader.resources[path].data

      const videoTexture = Texture.from(video)

      vidSprite = Sprite.from(videoTexture)

      if (video instanceof HTMLVideoElement) {
        videoSource = video
        video.volume = 0
        video.loop = true
        renderer.ticker.maxFPS = 144
        videoPlaybackSettings.max = videoSource.duration
        updateVideoSlider(videoSource.currentTime, videoSource.duration, videoPlaybackSettings.min, videoPlaybackSettings.max)
      }

      vidSprite.scale.x = 1.5
      vidSprite.scale.y = 1.5
      pixiVideoParent.removeChildren()
      pixiVideoParent.addChild(vidSprite)
      refreshFilters()
    }
  }
}

const update = (delta: number) => {
  if (videoSource instanceof HTMLVideoElement && !videoSource.paused) {
    if (videoSource.currentTime > videoPlaybackSettings.max) {
      videoSource.currentTime = videoPlaybackSettings.min
    }

    updateVideoSlider(videoSource.currentTime, videoSource.duration, videoPlaybackSettings.min, videoPlaybackSettings.max)
  }
}
