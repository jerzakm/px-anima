import { settings, Renderer, Container, Ticker, UPDATE_PRIORITY, SCALE_MODES } from 'pixi.js'

export const initPixiCanvas = () => {

    const renderer = new Renderer(
        {
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            autoDensity: true,
            forceFXAA: false,
            powerPreference: 'high-performance'
        }
    )

    const ticker = new Ticker()
    ticker.maxFPS = 60

    const stage = new Container();

    ticker.add(() => {
        renderer.render(stage)
    }, UPDATE_PRIORITY.LOW)

    ticker.start()

    document.body.appendChild(renderer.view)

    settings.SCALE_MODE = SCALE_MODES.NEAREST

    return {renderer, ticker, stage, canvas: renderer.view}
}


