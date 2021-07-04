<template>
    <div class="hover-menu" v-bind:class="{ hoverVisible : display }" >
        <div class="hover-menu-content" v-for="item in items" :key="item">
            <HoverMenuItem :item="item"/> 
        </div>
    </div>
</template>

<script>
import HoverMenuItem from "./HoverMenuItem.vue"

export default {
    name: "HoverMenu",
    props: [ "menuItems", "display" ], 
    components: {
        HoverMenuItem
    },
    data () {
        return {
            items: []
        }
    },
    created() {
        this.items = this.menuItems;
    }, 
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
$menu-width: 13rem;

.hover-menu{
    display: none;
    position: absolute;
    background-color: #fff;
    width: $menu-width;
    z-index: 5;
    top: 150px;
    right: calc(( #{$menu-width} + 1rem) / 2);
    box-shadow: 4px 2px 8px #b2b2b2;
    border-radius: 4px;
}

.hoverVisible {
    display: block;
}

</style>
