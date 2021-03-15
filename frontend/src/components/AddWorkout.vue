<template>
  <div class="add-card">  
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
    background-color: rgba(0,0,0, 0.02);
    border: 4px solid rgba(200,200,200, 0.5);
  }

</style>
