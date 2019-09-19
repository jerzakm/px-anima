import { Container, Sprite, Texture } from "pixi.js"
import { loader, renderer } from ".."
import { updateVideoSlider } from "./videoSlider"
import { videoFilters } from "./activeFilters"
import { refreshVideoHeader } from "./videoInterface"
import { saveFrameToImage } from "./videoSaving"

export let videoSource: undefined | HTMLVideoElement
let pixiVideoParent: Container | undefined
export let vidSprite: undefined | Sprite

export const videoPlaybackSettings = {
  volume: 0,
  loop: true,
  scale: { x: 1, y: 1 },
  playbackSpeed: 1,
  tickerFps: 60,
  min: 0,
  max: 0,
  recordingMode: false
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
export let videoPath = ''
export const playVideo = async (path: string) => {
  if (loader.resources[path]) {
    play()
  } else {
    loader
      .add(path, path)
      .load(() => {
        videoPath = path
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

      vidSprite.scale.x = 1
      vidSprite.scale.y = 1
      pixiVideoParent.removeChildren()
      pixiVideoParent.addChild(vidSprite)
      refreshFilters()
    }
  }
}

let vidTime = 0

const update = (delta: number) => {
  if (videoSource instanceof HTMLVideoElement && !videoSource.paused) {
    if (videoSource.currentTime > videoPlaybackSettings.max) {
      videoSource.currentTime = videoPlaybackSettings.min
      vidTime = videoPlaybackSettings.min
    }

    updateVideoSlider(videoSource.currentTime, videoSource.duration, videoPlaybackSettings.min, videoPlaybackSettings.max)

    if (videoPlaybackSettings.recordingMode) {
      saveFrameToImage()
      vidTime += 0.123
      videoSource.currentTime = vidTime
      renderer.ticker.maxFPS = 3
    } else {
      renderer.ticker.maxFPS = 60
    }
  }
}
