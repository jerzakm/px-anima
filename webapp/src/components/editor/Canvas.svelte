<script>
    import {onMount} from 'svelte'
    import * as PIXI from 'pixi.js'

    let renderer
    let ticker
    let stage

    onMount(()=> {
        renderer = new PIXI.Renderer(
            {   width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: 0xFFFFFF,
                forceFXAA: false,
                powerPreference: 'high-performance',
            }
        )

        window.addEventListener('resize', ()=> {
            renderer.view.width = window.innerWidth
            renderer.view.height = window.innerHeight
        })


        ticker = new PIXI.Ticker()
        ticker.maxFPS = 60

        stage = new PIXI.Container();

        const g = new PIXI.Graphics()
        stage.addChild(g)
        g.beginFill(0xdedede)
        g.drawRect(100,100,500,500)
        g.endFill()

        ticker.add(() => {
            renderer.render(stage)
        }, PIXI.UPDATE_PRIORITY.LOW)

        ticker.start()

        document.body.appendChild(renderer.view)
        renderer.view.className = 'main-canvas'

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST}

    )


</script>