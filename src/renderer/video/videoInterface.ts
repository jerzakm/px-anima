import { createVideoSlider } from './videoSlider';
import { createSettingsSliders } from '../videoSettings/settingSliders';

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
}

export const refreshVideoHeader = (title: string, path: string) => {
  videoHeaderI.title.innerText = title
  videoHeaderI.path.innerText = path
}

export const makeVideoSettings = () => {
  videoSettingsContainer.className = 'videoSettingsContainer'
  //Settings sliders
  createSettingsSliders(videoSettingsContainer)

  return videoSettingsContainer
}