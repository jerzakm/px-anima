import { createVideoSlider } from '../video/videoController';

let videoTitle: HTMLHeadingElement | undefined
const videoContainer = document.createElement('div')


export const makeVideoPlayer = () => {
  videoContainer.className = 'videoContainer'

  const videoCanvas = document.createElement('canvas')
  videoCanvas.className = 'videoCanvas'
  videoCanvas.id = 'videoCanvas'

  //Header
  renderVideoTitle('Demo video file')
  //Canvas
  videoContainer.appendChild(videoCanvas)
  //Slider
  const videoSlider = createVideoSlider()
  videoContainer.appendChild(videoSlider)


  return videoContainer
}

const renderVideoTitle = (title: string) => {
  if (videoTitle) {
    videoTitle.innerText = title
  } else {
    const videoTitle = document.createElement('h1')
    videoTitle.innerText = title
    videoContainer.appendChild(videoTitle)
  }
}