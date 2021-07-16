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
        /> 
    </div>
    <NewExercise v-on:add-exercise ="addExercise" />
</template>


<script>
import ExerciseItem from './ExerciseItem.vue';
import NewExercise from './NewExercise.vue';


export default {
    name: "WorkoutFormAdder",
    components : {
        ExerciseItem,
        NewExercise
    },
    props: ['exerciseList'],
    emits: ['add-exercise', 'new-repetition', 'exercise-name', 'workout-header'],
    created() {
    },
    data() {
        return {
            workoutHeader : '',
            picked : ''        }
    },
    methods: {
        checkHeader() {
            this.$emit('workout-header', this.workoutHeader)
        },
        newRepetition(id) {
            this.$emit('new-repetition', id)
        },
        changeExerciseName(data) {
            this.$emit('exercise-name', data)
        },
        addExercise(id) {
            this.$emit('add-exercise', id)
        }
    }
}

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
