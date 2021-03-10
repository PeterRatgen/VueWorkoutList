<template>
  <div class="workout-item" @click="expand_card">
    <div class="flex-container">
      <h3>{{ workout.title }}</h3>
      <p class="due-date"> {{ workout.dueDate }}</p>
    </div>
    <transition name="fade" mode="out-in">
      <div class="description" v-if="expand == false">
        <p class="exercise-desc" v-bind:key="index" v-for="(exercise, index) in workout.exerciseList.slice(0,3)">
        {{ nameWithComma(index) }}
        </p>
      </div>
      <div v-else class="description-expand">
        <div v-bind:key="exercise" v-for="exercise in workout.exerciseList">
          <ExerciseItem v-bind:exerciseItem="exercise"/> 
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ExerciseItem from "./ExerciseItem"

export default {
  name: "Workout",
  props: ["workout"],
  components: {
    ExerciseItem
  },
  data () {
    return {
      expand: false
    }
  },
  created() {
    console.log("created workout");
  },
  methods : {
    nameWithComma(index) {
      if (index !== this.workout.exerciseList.slice(0,3).length - 1) {
        return `${this.workout.exerciseList[index].name}, `
      } else{
        return this.workout.exerciseList[index].name
      }
    },
    expand_card() {
      if (this.expand) {
        this.expand = false
      } else {
        this.expand = true
      }
    }
  }
}
</script>

<style scoped>
  .workout-item {
    background: #fff;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    margin: 10px auto;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
  }

  .due-date {
    font-size: 0.8rem;
    display: inline-block;
  }
  .flex-container {
    display: flex;
    flex-direction: row;  
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;
  }
  .description {
    text-align: left;
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
  .exercise-desc {
    text-align: left;
    display: inline;
  }
  h3 {
    font-weight: 700; 
    text-align: left;
    font-size: 1.3rem;
  }

.fade-enter-active {
  animation: move-list 0.8s linear;
}

.fade-leave-active {
  animation: move-list 0.6s linear reverse;
}

@keyframes move-list {
  0% {
    max-height: 0px;
    opacity: 0;
  }
  100% {
    max-height: 600px;
    opacity: 1;
  }
}

@media only screen and (max-width: 600px) {
  .workout-item {
    border-radius: 6px;
  }
}

</style>
