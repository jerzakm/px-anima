<script>

import { flip } from "svelte/animate";
import { quintOut, quadIn, sineIn } from 'svelte/easing';
import Sortable from "svelte-sortablejs";

let list = [];
let options = {
  group: "people",
  draggable: ".todo"
};

for(let i =0;i< 15;i++) {
    list.push({id: i, name: `testName${i}`})
}

</script>

<Sortable {options} bind:list>
        {#each list as todo (todo.id)}
          <li
            animate:flip={{ duration: 150, easing: sineIn }}
            sortable-id={todo.id}
            class="todo">
            {todo.name}
          </li>
        {/each}
</Sortable>