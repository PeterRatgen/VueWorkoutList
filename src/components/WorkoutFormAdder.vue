<template>
    <div class="flex-box">
        <input class="header-input"
        type="text"
        v-model="workoutHeader"
        placeholder="Titel"
        @input="checkHeader"/>
    </div>
    <div class="divider" v-show="exerciseList == 0"></div>
    <div v-bind:key="exercise" v-for="exercise in exerciseList" >
        <ExerciseItem
            :exerciseItem="exercise"
            :edit="true"
            v-on:new-repetition="newRepetition"
            v-on:exercise-name="changeExerciseName"
            data-test="exercise-item"
        />
    </div>
    <NewExercise v-on:add-exercise ="addExercise" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ExerciseItem from './ExerciseItem.vue'
import NewExercise from './NewExercise.vue'

export default defineComponent({
  name: 'WorkoutFormAdder',
  components: {
    ExerciseItem,
    NewExercise
  },
  props: ['exerciseList'],
  emits: ['add-exercise', 'new-repetition', 'exercise-name', 'workout-header'],
  data () {
    return {
      workoutHeader: '',
      picked: ''
    }
  },
  methods: {
    checkHeader () {
      this.$emit('workout-header', this.workoutHeader)
    },
    newRepetition (data : any) {
      this.$emit('new-repetition', data)
    },
    changeExerciseName (data : any) {
      this.$emit('exercise-name', data)
    },
    addExercise () {
      this.$emit('add-exercise')
    }
  }
})

</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';

  .flex-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;

    .header-input {
      font-weight: 700;
      text-align: left;
      font-size: 1.3rem;
      padding: 0.0rem 0.25rem;
      background-color: #fff;
      @include input-field;
    }
  }

  .divider {
    @include divider;
    margin: 1rem 0;
  }

</style>
