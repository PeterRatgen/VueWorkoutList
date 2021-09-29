<template>
    <div class="add-exercise-button" @click.stop="addExercise">
        <fa class="plus-icon" icon="plus"></fa>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NewExercise',
  components: {
  },
  emits: {
    'add-exercise': null
  },
  methods: {
    addExercise () {
      this.$emit('add-exercise')
    }
  },
  mounted () {
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';

.add-exercise-button {
    width: 5rem;
    height: 1.8rem;
    margin: auto;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;

    &:hover {
        background-color: $divider-color;
        cursor: pointer;
    }
}

.plus-icon {
    transform: scale(1.6);
    color: lighten($accent-color, 5%);
}

</style>
