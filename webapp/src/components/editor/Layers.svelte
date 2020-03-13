<script>

import { flip } from "svelte/animate";
import { quintOut, quadIn, sineIn } from 'svelte/easing';
import Sortable from "svelte-sortablejs";
import * as Filters from 'pixi-filters'
import { filterArray } from "../../stores";

let list = [];
let options = {
  draggable: ".layers"
};

list.push({id: 0, name: 'Layer A'})
list.push({id: 1, name: 'Layer B'})

// $: list && filterArray.set(list) &&console.log('changed filter list')
</script>

<style>
    .layer-preview {
        width: 50px;
        height: 50px;
        background-color: white;
        margin: 5px;
    }
    .layers{
        list-style-type: none;
    }
    .layer-entry-container{
        display:flex;
        flex-direction: row;
        align-items: center;
        background-color: #DDDDDD;
        margin: 6px;
    }
    .layer-name{
        font-size: 0.75rem;
    }

</style>

<Sortable {options} bind:list>
        {#each list as layer (layer.name)}
          <li
            animate:flip={{ duration: 70, easing: sineIn }}
            sortable-id={layer.name}
            class="layers">
            <div class="layer-entry-container">
                <div class="layer-preview"/>
                <span class="layer-name">{layer.name}</span>
            </div>
          </li>
        {/each}
</Sortable>