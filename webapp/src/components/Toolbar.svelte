<script lang="ts">
    import Card, {Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons} from '@smui/card';
    import Button, {Label} from '@smui/button';
    import IconButton, {Icon} from '@smui/icon-button';
    import List, {Item, Text} from '@smui/list';
</script>

<style>
    .toolbar{
        position: fixed;
        top: 50px;
        left: 50px;
    }
    .active {
        color: red;
    }
</style>

<div class="card-container toolbar">
    <div>
    <Card>
        <Content component={List}>
            <Item>
                <Icon class="material-icons active" on>grid_on</Icon>
            </Item>
        </Content>
    </Card>
    </div>
</div>