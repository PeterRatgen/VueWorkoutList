<template>
    <div class="add-card" 
        v-bind:style="{backgroundColor: addCardColor}" 
        @click="createCard">  
    <transition name="cardTransition" mode="out-in">
        <div v-if="createButton">
            <fa class="plus-icon" icon="plus"></fa>
        </div>
        <div class="add-form" @click.stop v-else>
            <WorkoutFormAdder
                :exerciseList="exerciseList"
                v-on:add-item="addItem"
                v-on:add-name="addName"
            />
            <button @click="collapseCard">Cancel</button>
            <button @click="submitWorkout">Save</button>
        </div>
    </transition>
    </div>
</template>

<script>
import WorkoutFormAdder from './WorkoutFormAdder'

export default {
  name: "AddTodo",
  components : {
    WorkoutFormAdder
  },
  emits: ["new-workout"],
  data() {
    return {
      title: '',
      createButton: true,
      addCardColor : '#efefef',
        exerciseList: []

    }
  },
  methods: {
    createCard() {
      if(this.createButton) {
        this.createButton = false;
        this.addCardColor = "#fff"
      }
    },
    collapseCard() {
      if(!this.createButton) {
        this.createButton = true;
        this.addCardColor = "#fff"
      }
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
    addName(data) {
        let ele = this.exerciseList.find(element => element == data["oldItem"]) 
        ele.name = data["title"] 
    },
    submitWorkout() {
        this.emitter.emit('submit-new-workout', {title : this.title, exerciseList: this.exerciseList}) 
    }
  },
  mounted() {
        this.emitter.on('exercise-name', this.addName)
        this.emitter.on('workout-header', (data) => {this.title = data})
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';

  .add-card {
    @include workout-card;
    background-color: #f9f9f9;
    transition: background-color 0.4s;
  }

  .plus-icon {
    transform: scale(2);
    color: lighten($accent-color, 5%);
  }

  .divider {
    @include divider;
    margin: 1rem 0;
  }
    
  .cardTransition-enter-active {
    animation: move-list 0.6s linear;
  }

  .cardTransition-leave-active {
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
</style>
