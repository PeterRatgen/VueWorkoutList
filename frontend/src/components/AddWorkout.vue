<template>
  <div class="add-card">  
    <fa class="plus-icon" icon="plus"></fa>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      title: ''
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';

  .add-card {
    @include workout-card;
    background-color: rgba(255,255,255, 0.6);
  }

  .plus-icon {
    transform: scale(2);
    color: lighten($accent-color, 5%);
  }

</style>
