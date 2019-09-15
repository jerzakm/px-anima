import '@fortawesome/fontawesome-free/css/all.css'
import './style.scss';
import { makeVideoPlayer, makeVideoSettings } from './mainGui';

export const initGui = () => {
  makeMain()
}

const makeMain = () => {
  const main = document.createElement('div')
  main.className = 'main'
  document.body.appendChild(main)

  const settingsSide = document.createElement('div')
  settingsSide.id = 'sSide'
  const videoSide = document.createElement('div')
  videoSide.id = 'vSide'

  main.appendChild(settingsSide)
  main.appendChild(videoSide)


  const videoContainer = makeVideoPlayer()
  videoSide.appendChild(videoContainer)

  const videoSettings = makeVideoSettings()
  settingsSide.appendChild(videoSettings)

  return main
}