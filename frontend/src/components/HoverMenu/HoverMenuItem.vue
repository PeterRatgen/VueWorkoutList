<template>
    <div @click.stop="emitOption(item)" class="menu-item">
        <p>{{ item }}</p>
    </div>
</template>

<script>

export default {
    name: "HoverMenuItem",
    props: [ "item" ], 
    emits: ["option"],
    methods: {
        emitOption(item) {
            this.$emit("option", item)
        }
    }
}
</script>

<style lang="scss" scoped>


.menu-item {
    padding: 0.5rem 0;
}
</style>
