<template>
    <div class="hover-menu"  >
        <div class="hover-menu-content" v-for="item in items" :key="item">
            <div @click.stop="emitOption(item)" class="menu-item">
                <p>{{ item }}</p>
            </div>
            <div v-if="item != items[items.length]">
                <div class="divder"></div>
             </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';

export default defineComponent ({
    name: "HoverMenu",
    props: [ "menuItems"], 
    emits: [ "option" , "minimize"],
    data () {
        return {
            items: []
        };
    },
    created() {
        this.items = this.menuItems;
    }, 
    methods: {
        emitOption(item : any) {
            this.$emit("option", item);
        }
    }
});
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

.menu-item {
    padding: 0.5rem 0;
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
