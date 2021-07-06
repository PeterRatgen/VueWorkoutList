<template>
    <div class="flex-box">
        <input class="header-input" 
        type="text" 
        v-model="workoutHeader" 
        placeholder="Titel" 
        @blur="checkHeader"/>
    </div>
    <div class="divider" v-show="exerciseList == 0"></div>
    <div v-bind:key="exercise" v-for="(exercise, index) in exerciseList" >
        <ExerciseItem 
            :exerciseItem="exercise"
            :index="index"
            :edit="true"
            v-on:new-repetition="$emit('new-repetition')"
        /> 
    </div>
    <div class="add-exercise-button" @click.stop="$emit('add-item')">
        <fa class="plus-icon" icon="plus"></fa>
    </div>
</template>


<script>
import ExerciseItem from './ExerciseItem.vue' ;


export default {
    name: "WorkoutFormAdder",
    components : {
        ExerciseItem
    },
    props: ['exerciseList'],
    emits: ['add-item', 'add-name', 'new-repetition'],
    created() {
    },
    data() {
        return {
            workoutHeader : '',
            picked : ''        }
    },
    methods: {
        checkHeader() {
            this.emitter.emit('workout-header', this.workoutHeader)
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
  
  .add-exercise-button {
    background-color: lighten($accent-color, 5%); 
    width: 2.5rem;
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

  .divider {
    @include divider;
    margin: 1rem 0;
  }

</style>
