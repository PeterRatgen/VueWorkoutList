<template>
    <div class="add-exercise-button" @click.stop="$emit('add-item')">
        <fa class="plus-icon" icon="plus"></fa>
    </div>
</template>

<script>

export default {
  name: "NewExercise",
  components : {
  },
  emits: ['add-item'],
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
  .add-exercise-button {
    background-color: lighten($accent-color, 5%); 
    width: 5rem;
    height: 1.8rem;
    margin: auto;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: lighten($accent-color, 20%); 
    }
  }

  .plus-icon {
    transform: scale(1.2);
    color: white;
  }
    
</style>
