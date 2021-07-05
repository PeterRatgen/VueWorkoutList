<template>
 <div class="list">
  <div v-bind:key="workout.dateCreated" v-for="workout in workouts" >
    <Workout v-bind:workout="workout" v-on:title-change="emitTitleChange" />
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
  emit: ['title-change'],
  created() {
    console.log("created List " + this.workouts);
  },
    methods: {
        emitTitleChange(id, name) {
            this.$emit('title-change', id, name)            
        }
    }
}
</script>

<style scoped>


@media only screen and (max-width: 600px) {
}

</style>
