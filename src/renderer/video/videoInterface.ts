const { dialog } = require('electron').remote
import { createVideoSlider } from './videoSlider'
import { createSettingsSliders } from '../videoSettings/settingSliders'
import { playVideo, videoSource, videoPlaybackSettings } from './videoView'
import { createPlaybackSliders } from '../videoSettings/vidPlayback'

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
  makeVidButtons()

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

const makeVidButtons = () => {
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

  const loadProject = document.createElement('button')
  loadProject.className = 'pxBtn'
  loadProject.innerText = 'Load project'
  loadProject.style.marginLeft = '50px'
  loadProject.style.backgroundColor = '#63C64D'
  playbackControlls.appendChild(loadProject)

  const saveProject = document.createElement('button')
  saveProject.className = 'pxBtn'
  saveProject.innerText = 'Save project'
  saveProject.style.backgroundColor = '#17A1A9'
  playbackControlls.appendChild(saveProject)

  play.addEventListener('pointerdown', () => {
    if (videoSource) {
      videoSource.paused ? videoSource.play() : videoSource.pause()
    }
  })

  test.addEventListener('pointerdown', () => {
    videoPlaybackSettings.recordingMode ? videoPlaybackSettings.recordingMode = false : videoPlaybackSettings.recordingMode = true
  })

  loadProject.addEventListener('pointerdown', () => {
    console.log('loadingProject')
  })

  saveProject.addEventListener('pointerdown', () => {
    console.log('savingProject')
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
