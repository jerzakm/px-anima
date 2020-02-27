<script lang="ts">
    // import Layers from './components/Layers.svelte'
    import Toolbar from './components/Toolbar.svelte'
    // import {initPixiCanvas} from './canvas/renderer'
    // import {Graphics, Sprite}     from 'pixi.js'

    // const {renderer, ticker, stage, canvas} = initPixiCanvas()



    // const sprite = Sprite.from('test.jpg')
    // sprite.scale.set(0.25, 0.25)
    // stage.addChild(sprite)

    // ticker.add(()=> {
    // })
    import Button, { Group, GroupItem, Label, Icon } from "@smui/button";
    let clicked = 0;

</script>

<Toolbar/>