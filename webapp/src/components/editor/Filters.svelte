<script>

import { flip } from "svelte/animate";
import { quintOut, quadIn, sineIn } from 'svelte/easing';
import Sortable from "svelte-sortablejs";
import * as Filters from 'pixi-filters'
import { filterArray } from "../../stores";

let list = [];
let options = {
  draggable: ".filters"
};

list.push({id: 0, name: 'Zoom',value: new Filters.ZoomBlurFilter()})
list.push({id: 1, name: 'CrossHatch', value: new Filters.CrossHatchFilter()})

$: list && filterArray.set(list) && console.log('changed filter list')
</script>

<style>
  .filters{
    list-style-type: none;
  }
  .filter-container {
    margin: 5px;
    background-color: #eeeeee;
  }
</style>

<Sortable {options} bind:list>
        {#each list as filter (filter.name)}
          <li
            animate:flip={{ duration: 150, easing: sineIn }}
            sortable-id={filter.name}
            class="filters">
            <div class="filter-container">{filter.name}</div>
          </li>
        {/each}
</Sortable>