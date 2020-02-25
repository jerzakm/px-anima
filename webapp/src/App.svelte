<script lang="ts">
    import {initPixiCanvas} from './canvas/renderer'
    import {Graphics, Sprite}     from 'pixi.js'

    const {renderer, ticker, stage, canvas} = initPixiCanvas()

    const g = new Graphics()
    stage.addChild(g)

    const sprite = Sprite.from('test.jpg')
    sprite.scale.set(0.25, 0.25)
    stage.addChild(sprite)

    ticker.add(()=> {

    })
</script>