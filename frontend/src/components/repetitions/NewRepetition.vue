<template>
    <div class="add-exercise-button" @click.stop="this.$emit('new-repetition')">
        <fa class="plus-icon" icon="plus"></fa>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
    name: "NewRepetition",
    emits: ["new-repetition"],
    components : {
    }
});

</script>


<style lang="scss" scoped>
@import '../../assets/variables.scss';
  .plus-icon {
    transform: scale(1.2);
    color: white;
  }

  .add-exercise-button {
    background-color: lighten($accent-color, 5%); 
    width: 100%;
    border-radius: 3px;
    display: block;
    height: 2.15rem;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;
    padding: 0.35rem;

    &:hover {
      background-color: lighten($accent-color, 20%); 
    }
  }
</style>
