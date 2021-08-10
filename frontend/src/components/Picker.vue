<template>
    <div class="picker" ref="picker">
        <span class="icon-container"  @click.stop="dec('weight')">
            <fa class="icon" icon=minus  ></fa>
        </span>
        {{ data }}
        <span class="icon-container"  @click.stop="inc('weight')">
            <fa class="icon" icon=plus  ></fa>
        </span>
    </div>
</template>


<script charset="utf-8">

export default {
    name : "Picker",
    data() {
        return { 
            data : {}
        }
    },
    methods : {
        showPicker(data) {
            this.$refs.picker.style.display = "block"
            this.data = data.weight
            console.log(data)
        }
    },
    mounted() {
        this.emitter.on('picker', this.showPicker)
    }
}
    
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";

.picker {
    @include workout-card;
    position: absolute;
    top: 50%;
    left: 30%;
    width: 40%; 
    display: none;
}

.icon {
    color: lighten($text-color, 5%);
}

.icon-container {
    display: flex;
    width: 1.75rem;
    height: 2rem;
    justify-content: center;
    align-items: center;
}
</style>
