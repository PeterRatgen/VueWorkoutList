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
                v-on:new-repetition="newRepetition"
                v-on:exercise-name="addName"
            />
            <div class="divider"></div>
            <button class="button" @click="collapseCard">Cancel</button>
            <button class="button" @click="submitWorkout">Save</button>
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
        console.log("The name of the new rep is " + name)
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
        if(this.contracted == false) {
            console.log("Data" + JSON.stringify(data) + " " + "set the name ")
            let ele = this.exerciseList[data["exerciseIndex"]]
            ele.name = data["name"] 
        }
    },
    submitWorkout() {
        this.emitter.emit('submit-new-workout', {title : this.title, exerciseList: this.exerciseList}) 
        this.title = ''
        this.exerciseList = []
        this.createButton = true
    },
    titleEditEnd(index) {
        this.exerciseList.splice(index, 1) 
    }
  },
  mounted() {
        this.emitter.on('exercise-name', this.addName)
        this.emitter.on('workout-header', (data) => {this.title = data})
        this.emitter.on('title-edit-end', this.titleEditEnd)
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

  .button {
    @include button;
    width: 4rem;
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
