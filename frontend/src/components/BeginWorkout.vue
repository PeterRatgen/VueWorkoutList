<template>
    <transition name="fade" mode="out-in">
        <div v-if="displayPicker"  class="workout-selector-container"
        id="workout-picker" >
            <div class="workout-selector">
                <span class="cross-container" @click="displayPicker = false"  >
                    <fa class="plus-icon" icon="plus"></fa>
                </span>
                <h3>Vælg en træning</h3>
                <div class="workout-title" v-bind:key="workout.id" v-for="workout in workouts" >
                    <div class="divder"></div>
                    <p @click="workoutPicker(workout)">  {{ workout.title }} </p>
                </div>
            </div>
        </div>
        <div v-else class="start-workout" @click="startWorkout()">
            <div>
                <p class="start-workout-text">Start træning</p>
            </div>
        </div>
    </transition>
    <div class="background" v-if="displayPicker"></div>
</template>

<script>

export default {
    name : 'BeginWorkout',
    emits : {
       ["select-workout"] : String
    },
    props : {
        ["workouts"] : Object
    },
    data() {
        return {
            displayPicker : false,
            chosenWorkout: ""
        }
    },
    methods: {
        startWorkout() {
            this.displayPicker = true;    
        },
        workoutPicker(workout) {
            this.$emit("select-workout", workout)
        }
    }
}

</script>

<style scoped lang="scss">

@import "../assets/variables.scss";

.background {
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.3;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}

.workout-selector-container {
    @include workout-card;
    position: absolute;
    top: 45%;
    transform: translate(0, -50%);
    z-index: 5;
    width: 90%;
    max-height: 75%;
    left: 5%;
    box-shadow: none;


    .workout-selector {
        position: relative;

        h3 {
            margin-bottom: 0.6rem;
        }

        .workout-title > p {
            text-align: left;
            margin: 0.6rem 0.5rem;

        }

        .cross-container {
            position: absolute;
            top: 0px;
            right: 0px;
        }
    }
}

.divder {
  @include divider;
  margin-bottom: 0.6rem;
}

.plus-icon {
    transform: rotate(45deg) scale(1.2);
}
 
.start-workout {
    @include workout-card;
    position: absolute;  
    bottom: 2rem;
    height: 3rem;
    width: 30%;
    background-color: darken($go-color, 3%);
    border-radius: 10px;
    padding: 12px;
    left: calc((100% - 30%) / 2);
    margin: 0;

    &:hover {
        background-color: darken($go-color, 6%);
    }
}

.start-workout-text {
    font-weight: 700;
    color: white;
    margin: auto;
}


.fade-enter-active {
  animation: move-list 0.1s linear;
}

.fade-leave-active {
  animation: move-list 0.1s linear reverse;
}

@keyframes move-list {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media only screen and (max-width: 1000px) {
    .todo-block {
        width: 80%;
    }
    .hello-header {
        width: 80%;
    }
    .start-workout {
        width: 40%;
        left: calc((100% - 40%) / 2);
    }
}

@media only screen and (max-width: 600px) {
  .todo-block {
   width: 100%;
  }
  .hello-header {
    width: 95%;
  }
  .start-workout {
        width: 90%;
        left: 5%;
  }
}
    
</style>

