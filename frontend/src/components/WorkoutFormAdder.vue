<template>
    <div class="flex-box">
        <input class="header-input" 
        type="text" 
        v-model="workoutHeader" 
        placeholder="Titel" 
        @blur="checkHeader"/>
    </div>
    <div class="divider"></div>
    <div v-bind:key="exercise" v-for="(exercise, index) in exerciseList" >
        <ExerciseItem 
            :exerciseItem="exercise"
            :index="index"
            :edit="true"
            v-on:exercise-item="addName"
            v-on:new-repetition="newRepetition"
        /> 
    </div>
    <div class="add-exercise-button" @click.stop="addItem">
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
    created() {
    },
    data() {
        return {
            workoutHeader : '',
            picked : '',
            exerciseList: []
        }
    },
  methods: {
    checkHeader() {
      console.log(this.workoutHeader)
    },
    newRepetition(name){
        let exercise = this.exerciseList.find(ele => ele["name"] == name)
        const length = exercise["set"].length
        if (length > 1) {
            const weight = exercise["set"][length - 1]["weight"];
            const reps = exercise["set"][length - 1]["repetitions"];
            exercise["set"].push({repetitions : reps, weight : weight}) 
        } else {
            exercise["set"].push({repetitions : 0, weight : 0}) 
        }
    },
    addItem() {
        console.log("pusing")
        this.exerciseList.push({ name: "", set: []})
        console.log(this.exerciseList)
    },
    addName(item, newName) {
        let ele = this.exerciseList.find(element => element == item) 
        ele.name = newName
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
