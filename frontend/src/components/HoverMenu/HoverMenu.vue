<template>
    <div class="hover-menu" v-bind:class="{ hoverVisible : display }" >
        <div class="hover-menu-content" v-for="item in items" :key="item">
            <HoverMenuItem :item="item" @option="emitOption"/> 
            <div v-if="item != items[items.length]">
                <div class="divder"></div>
             </div>
        </div>
    </div>
</template>

<script>
import HoverMenuItem from "./HoverMenuItem.vue"

export default {
    name: "HoverMenu",
    props: [ "menuItems", "display" ], 
    emits: [ "option" , "minimize"],
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
    methods: {
        emitOption(item) {
            this.$emit("option", item)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/variables.scss';
$menu-width: 13rem;

.hover-menu{
    display: none;
    position: absolute;
    background-color: lighten($background-color, 5%);
    width: $menu-width;
    z-index: 5;
    top: 1.5rem;
    right: -0.5rem;
    box-shadow: 4px 2px 8px #b2b2b2;
    border-radius: 4px;
    overflow: visible;
}

.hoverVisible {
    display: block;
}


.divder {
  @include divider;
  width: 90%;
  margin: auto;
}

.outside {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 4;
    background-color: black;
}


@media only screen and (max-width: 600px) {
    .hover-menu{
        right: 1rem;
    }
}


</style>
