const { dialog } = require('electron').remote
import { createVideoSlider } from './videoSlider'
import { createSettingsSliders } from '../videoSettings/settingSliders'
import { playVideo, videoSource, vidSprite, videoPlaybackSettings } from './videoView'
import { renderer } from '..'
import { writeFile } from 'fs'
import { RenderTexture, Sprite } from 'pixi.js'
import { videoFilters } from './activeFilters';

const videoContainer = document.createElement('div')
const videoSettingsContainer = document.createElement('div')

let videoHeaderI: any = {}


export const makeVideoPlayer = () => {
  videoContainer.className = 'videoContainer'

  const videoCanvas = document.createElement('canvas')
  videoCanvas.className = 'videoCanvas'
  videoCanvas.id = 'videoCanvas'



  //Header
  makeVideoHeader()
  //Canvas
  videoContainer.appendChild(videoCanvas)
  //Slider
  const videoSlider = createVideoSlider()
  videoContainer.appendChild(videoSlider)
  //PlaybackControlls
  makePlaybackControlls()

  return videoContainer
}

const makeVideoHeader = () => {
  const videoHeader = document.createElement('div')
  videoHeader.className = 'vHeader'
  const hTitleContainer = document.createElement('div')
  const theader = document.createElement('h1')
  const tPath = document.createElement('span')
  const bMediaBtn = document.createElement('button')
  bMediaBtn.className = 'pxBtn'

  videoHeaderI.title = theader
  videoHeaderI.path = tPath

  videoHeader.appendChild(hTitleContainer)
  hTitleContainer.appendChild(theader)
  hTitleContainer.appendChild(tPath)
  videoHeader.appendChild(bMediaBtn)

  theader.innerText = 'No file has been loaded, press load button ===>'
  tPath.innerText = 'path/to/the/file/looks/kinda/like/this.mp4'
  bMediaBtn.innerText = 'Load video'

  videoContainer.appendChild(videoHeader)

  bMediaBtn.addEventListener('pointerdown', () => {
    const result = dialog.showOpenDialog({ properties: ['openFile'] })
    if (result && result.length > 0) {
      playVideo(result[0])
    }
  })
}

const makePlaybackControlls = () => {
  const playbackControlls = document.createElement('div')
  playbackControlls.className = 'playbackControlls'

  const play = document.createElement('button')
  play.className = 'pxBtn'
  play.innerText = 'Play / Pause'
  playbackControlls.appendChild(play)

  const test = document.createElement('button')
  test.className = 'pxBtn'
  test.innerText = 'Record'
  playbackControlls.appendChild(test)

  play.addEventListener('pointerdown', () => {
    if (videoSource) {
      videoSource.paused ? videoSource.play() : videoSource.pause()
    }
  })

  test.addEventListener('pointerdown', () => {
    videoPlaybackSettings.recordingMode ? videoPlaybackSettings.recordingMode = false : videoPlaybackSettings.recordingMode = true
  })

  videoContainer.appendChild(playbackControlls)
}

export const refreshVideoHeader = (title: string, path: string) => {
  videoHeaderI.title.innerText = title
  videoHeaderI.path.innerText = path
}

export const makeVideoSettings = () => {
  videoSettingsContainer.className = 'videoSettingsContainer'
  createSettingsSliders(videoSettingsContainer)

  return videoSettingsContainer
}

export const saveFrameToImage = async () => {
  if (vidSprite && videoSource) {
    const fps = 12;
    const ms = 1 / fps

    const makeimg = async () => {
      if (vidSprite) {
        const rt = RenderTexture.create({ width: vidSprite.width, height: vidSprite.height })
        renderer.renderer.render(vidSprite, rt);
        const sp = Sprite.from(rt)
        sp.scale.x = 1/videoFilters.pixelate.uniforms.size[0]
        console.log(videoFilters.pixelate.uniforms.size[0])
        sp.scale.y = 1/videoFilters.pixelate.uniforms.size[0]
        const b64 = renderer.renderer.extract.base64(sp)
        const base64Data = b64.replace(/^data:image\/png;base64,/, "");
        writeFile(`test/${new Date().getTime()}.png`, base64Data, 'base64', function (err) {
          console.log(err);
        });
      }
    }
    makeimg()
  }
}