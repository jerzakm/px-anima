import * as PIXI from 'pixi.js'

export function initRenderer() {

  const videoCanvas: any = document.getElementById('videoCanvas')

  const renderer = new PIXI.Renderer(
    {
      width: window.innerWidth,
      height: window.innerHeight,
      view: videoCanvas,
      backgroundColor: 0x999999,
      forceFXAA: false,
      antialias: true,
      powerPreference: 'high-performance',
      clearBeforeRender: true,
      preserveDrawingBuffer: false
    }
  )

  const ticker = new PIXI.Ticker()
  ticker.maxFPS = 144

  let stage = new PIXI.Container();

  ticker.add(() => {
    renderer.render(stage)
  }, PIXI.UPDATE_PRIORITY.HIGH)

  ticker.start()

  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

  return { renderer, stage, ticker }
}