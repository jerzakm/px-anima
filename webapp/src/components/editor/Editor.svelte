<script>
    import Canvas from './Canvas.svelte'
    import Filters from './Filters.svelte'
    import Layers from './Layers.svelte'
</script>

<!-- <Canvas/> -->

<style>
    .card{
        background-color: #FFFFFF;
        min-height: 50px;
        width: 500px;
        position: fixed;
        top: 96px;
        right:32px;
        display: flex;
        flex-direction: row;
    }
    .layers{
        background-color: #CECECE;
        width: 150px;
    }
    .filters{
        background-color: #DDDDDD;
        width:100%;
    }
</style>

<div class="card">
    <div class="layers">
        <Layers/>
    </div>
    <div class="filters">
        <Filters/>
    </div>
</div>


<!-- <Filters/> -->