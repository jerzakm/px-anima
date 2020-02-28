<script lang="ts">
    import Card, {Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons} from '@smui/card';
    import Button, {Label} from '@smui/button';
    import IconButton, {Icon} from '@smui/icon-button';
    import List, {Item, Text} from '@smui/list';
    import Ripple from '@smui/ripple';
</script>

<style>
    .toolbar{
        position: fixed;
        top: 50px;
        left: 50px;
        user-select: none;
    }
    .toolbar-button{
        cursor: pointer;
        padding: 5px;
    }
    .inactive {
        opacity: 0.9;
    }
</style>

<div class="card-container toolbar">
    <div>
        <Card>
            <div use:Ripple={{ripple: true, unbounded: true, color: 'primary'}} class="toolbar-button inactive"><Icon class="material-icons">grid_on</Icon></div>
        </Card>
    </div>
</div>