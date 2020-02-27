<script lang="ts">
    import Layers from './components/Layers.svelte'
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

<div class="container">
  <Button on:click={() => clicked++}>
    <Icon class="material-icons">thumb_up</Icon>
    <Label>Click Me</Label>
  </Button>
  <p class="mdc-typography--body1">
    {#if clicked}
      You've clicked the button {clicked} time{clicked === 1 ? '' : 's'}.
    {:else}
      <span class="grayed">You haven't clicked the button.</span>
    {/if}
  </p>
</div>

<Layers/>