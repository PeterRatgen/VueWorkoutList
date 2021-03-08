<template>
 <div>
  <div v-bind:key="workout.dateCreated" v-for="workout in workouts" >
    <Workout v-bind:workout="workout" v-on:toggle-todo="$emit('toggle-todo',todo.id)" v-on:del-todo="$emit('del-todo',todo.id)" />
  </div>
 </div> 
</template>

<script>
import Workout from './Workout.vue'

export default {
  name: "WorkoutList", 
  components: {
    Workout
  },
  props: ["workouts"],
  created() {
    console.log("created List " + this.workouts);
  }
}
</script>

<style scoped>

</style>
