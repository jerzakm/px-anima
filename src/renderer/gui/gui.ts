import '@fortawesome/fontawesome-free/css/all.css'
import './style.scss';

const { dialog } = require('electron').remote



export const initGui = () => {
  makeMain()
  // const g = dialog.showOpenDialog({ properties: ['openFile'] })

  // console.log(g)
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


  const videoCanvas = document.createElement('canvas')
  videoCanvas.className = 'videoCanvas'
  videoCanvas.id = 'videoCanvas'
  videoCanvas.style.width = `${960}px`
  videoCanvas.style.height = `${540}px`

  videoSide.appendChild(videoCanvas)
  return main
}
