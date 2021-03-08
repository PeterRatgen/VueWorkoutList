<template>
  <div class="workout-item">
    <h3>{{ workout.title }}</h3>
    <div v-bind:key="exercise" v-for="exercise in workout.exerciseList" >
      <p>{{ exercise }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Workout",
  props: ["workout"],
  created() {
    console.log("created workout");
  }
}
</script>

<style scoped>
  .workout-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
    border-radius: 20px;
    margin: 10px 0;
  }
  h3 {
    
  }
</style>
