<template>
  <div class="top-bar"> <!-- Top bar -->
    <div class="back-button" @click="returnToFront">
      <fa class="arrow" icon="arrow-left"  ></fa>
    </div>
    <div class="right-flex">
      <p class="timer">{{ timeSinceStart }}</p>
      <button class="stop-button" @click="showEndCard">Afslut</button>
    </div>
  </div>
  <div class="workout-block">
    <div class="header-container"> <!-- Header -->
      <h1 class="header">{{ workout.title }}</h1>
      <div class="accent-divider"></div>
    </div>
    <div class="workout-section" v-for="exercise in workout.exerciseList" :key="exercise.id"> <!-- Exercise section -->
      <WorkoutDisplay
          v-bind:exercise="exercise"
          />
    </div>
  </div>
  <Picker/>
  <WorkoutResult
      @ended="endWorkout"
      />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapGetters, mapActions, mapState } from '../../node_modules/vuex'

import WorkoutDisplay from '../components/WorkoutDisplay.vue'
import WorkoutResult from '../components/WorkoutResult.vue'
import Picker from '../components/Picker.vue'

import { IWorkout } from '../types'

export interface workoutDone {
  timeOfEnd : number,
  timeOfStart: number
  workout: IWorkout
}

export default defineComponent({
  name: 'WorkoutProcess',
  components: {
    WorkoutDisplay,
    WorkoutResult,
    Picker
  },
  props: {
    workoutData: {
      type: Object as PropType<IWorkout>
    }
  },
  emits: {
    back: null,
    workoutCompleted (payload: workoutDone) {
      return payload.timeOfStart > 0
    }
  },
  computed: {
    ...mapState('workoutProcess', ['workout']),
    ...mapGetters('workoutProcess', ['getStartTime', 'getEndTime'])
  },
  data () {
    return {
      timeSinceStart: ''
    }
  },
  methods: {
    calcTime () {
      if (this.getStartTime === undefined) {
        const time = new Date()
        this.setStartTime(time.getTime())
      }
      setInterval(() => {
        let date : Date
        let secs : number
        if (this.getEndTime === undefined) {
          const now = new Date().getTime()
          date = new Date(now - this.getStartTime)
          secs = date.getSeconds()
        } else {
          date = new Date(this.getEndTime - this.getStartTime)
          secs = date.getSeconds()
        }
        let secPrint : string
        if (secs < 10) {
          secPrint = '0' + secs.toString()
        } else {
          secPrint = secs.toString()
        }
        const print = date.getMinutes().toString() + ':' + secPrint
        this.timeSinceStart = print
      }, 1000)
    },
    ...mapActions('workoutProcess', [
      'setStartTime',
      'startWorkout',
      'getOngoingWorkout'
    ]),
    endWorkout () {
      localStorage.removeItem('onGoingWorkout')
      this.$emit('back')
    },
    returnToFront () {
      localStorage.setItem('onGoingWorkout', JSON.stringify(this.getOngoingWorkout()))
      this.$emit('back')
    }
  },
  mounted () {
    let tempWorkout : IWorkout
    const onGoingWorkout = localStorage.getItem('onGoingWorkout')
    if (onGoingWorkout !== null) {
      tempWorkout = (JSON.parse(onGoingWorkout) as IWorkout)
      this.startWorkout(tempWorkout)
      this.calcTime()
    } else {
      if (this.workoutData !== undefined) {
        tempWorkout = this.workoutData
        for (const ex of tempWorkout.exerciseList) {
          for (const set of ex.set) {
            set.completed = undefined
          }
        }
        tempWorkout.timeOfStart = undefined
        this.startWorkout(tempWorkout)
        this.calcTime()
      }
    }
  }
})
</script>

<style scoped lang="scss">
@import "../assets/variables.scss";

.header-container {
  width: 95%;
  margin: auto;
  margin-top: 3.2rem;
  margin-bottom: 1rem;
  .header {
    @include header;
  }
}

.accent-divider {
  margin-top: 0.3rem;
  width: 10rem;
  height: 0.5rem;
  background: $accent-color;
}

.top-bar {
  width: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 0.5rem 1rem;

  .back-button {
    display: inline-block;
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    background-color: #fff;
    border: 2px #ddd solid;
    border-radius: 50%;

    .arrow {
      font-size: 1.5rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .right-flex {
    display: flex;
    width: 9rem;
    align-items: center;
    justify-content: space-between;

    .timer {
      display: inline;
      font-weight: 600;
      font-size: 1.2rem;
    }

    .stop-button {
      @include button;
      background-color: $delete-color;
      color: white;
      border-color: $delete-color;
      font-weight: 600;
      padding:  0.35rem 0.5rem;

      &:hover {
        background-color: darken($delete-color, 5%)
      }

    }
  }

}

.workout-block {
  width: $content-width;
  margin: auto;
}

@media only screen and (max-width: 1000px) {
  .workout-block {
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
  .workout-block {
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
