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
      <h1 class="header">{{ work.title }}</h1>
      <div class="accent-divider"></div>
    </div>
    <div class="workout-section" v-for="exercise in work.exerciseList" :key="exercise.id"> <!-- Exercise section -->
      <WorkoutDisplay
          v-bind:exercise="exercise"
          v-on:send-rep="sendRep"
          v-on:change-set="changeSet"
          @skipped="skippedExercise"
          />
      <!---v-bind:expand="currentExercise == index"-->
    </div>
  </div>
  <Picker/>
  <WorkoutResult
      @ended="endWorkout"
      />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import WorkoutDisplay from '../components/WorkoutDisplay.vue'
import WorkoutResult from '../components/WorkoutResult.vue'
import Picker from '../components/Picker.vue'

import { IWorkout, IExercise } from '../types'
import axios, { AxiosInstance } from 'axios'

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
    workout: Object as () => IWorkout,
    jwtData: String
  },
  emits: {
    back: null,
    'workout-completed': (
      payload: workoutDone
    ) => {
      console.log(payload)
      return true
    }
  },
  data () {
    return {
      timeSinceStart: '',
      work: {} as IWorkout,
      currentExercise: 0,
      apiInstance: {} as AxiosInstance
    }
  },
  methods: {
    calcTime () {
      let startTime = 0
      if (this.work.timeOfStart === undefined) {
        const time = new Date()
        this.work.timeOfStart = time.getTime()
        startTime = time.getTime()
      } else {
        startTime = this.work.timeOfStart
      }
      setInterval(() => {
        let date : Date
        let secs : number
        if (this.work.timeOfEnd === undefined) {
          const now = new Date().getTime()
          date = new Date(now - startTime)
          secs = date.getSeconds()
        } else {
          date = new Date(this.work.timeOfEnd - startTime)
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
    async startWorkout () {
      const a = []
      for (const i of this.work.exerciseList) {
        a.push(i.id)
      }
      if (this.apiInstance !== undefined || this.jwtData !== '') {
        try {
          const res = await this.apiInstance.post('/workout_history', {
            workoutId: this.work._id,
            exerciseList: a
          })
          this.work.historyId = res.data
        } catch (err) {
          console.trace()
          console.log(err)
        }
      }
    },
    async sendRep (data : any) {
      const ex : IExercise | undefined = this.work.exerciseList.find(ele => ele.id === data.exerciseId)
      if (ex !== undefined) {
        for (const set of ex.set) {
          if ((set.completed === undefined || set.completed === false) &&
            (this.apiInstance !== undefined || this.jwtData)) {
            try {
              await this.apiInstance.post('/workout_history/send_rep', {
                historyId: this.work.historyId,
                exerciseId: data.exerciseId,
                repetitions: data.set.repetitions,
                weight: data.set.weight
              })
            } catch (err) {
              console.trace()
              console.log(err)
            }
            break
          }
        }
      }
    },
    async skippedExercise (data : any) {
      const ele : IExercise | undefined = this.work.exerciseList.find(ele => ele.id === data.exerciseId)
      if (ele !== undefined && this.apiInstance !== undefined && this.jwtData) {
        ele.skipped = true
        try {
          await this.apiInstance.put('/workout_history/skip_exercise', {
            historyId: this.work.historyId,
            exerciseId: data.exerciseId
          })
        } catch (err) {
          console.trace()
          console.log(err)
        }
      }
    },
    changeSet (data : any) {
      const ex : IExercise | undefined = this.work.exerciseList.find(ele => ele.id === data.exerciseId)
      if (ex !== undefined) {
        ex.set[data.index] = data.newSet
      }
    },
    async showEndCard () {
      if (this.apiInstance !== undefined || this.jwtData) {
        try {
          const res = await this.apiInstance.put('/workout_history/end_exercise', {
            historyId: this.work.historyId
          })
          this.work.timeOfEnd = res.data
          this.$emit('workout-completed', {
            timeOfStart: this.work.timeOfStart,
            timeOfEnd: res.data,
            workout: this.work
          } as workoutDone)
        } catch (err) {
          console.trace()
          console.log(err)
        }
      }
    },
    endWorkout () {
      localStorage.removeItem('onGoingWorkout')
      // this.work = {};
      this.$emit('back')
    },
    returnToFront () {
      localStorage.setItem('onGoingWorkout', JSON.stringify(this.work))
      this.$emit('back')
    },
    createInstance () {
      /**
                Saves an instance of the API connection, as not to repeat the
                Bearer Token
       */
      return axios.create({
        baseURL: process.env.VUE_APP_API_URL,
        headers: {
          Authorization: `Bearer ${this.jwtData}`
        }
      })
    }
  },
  mounted () {
    this.apiInstance = this.createInstance()
    const onGoingWorkout = localStorage.getItem('onGoingWorkout')
    if (onGoingWorkout !== null) {
      this.work = (JSON.parse(onGoingWorkout) as IWorkout)
    } else {
      if (this.workout !== undefined) {
        const tempWork : IWorkout | undefined = this.workout
        if (tempWork !== undefined && tempWork.exerciseList !== undefined) {
          tempWork.timeOfStart = undefined
          for (const ex of tempWork.exerciseList) {
            for (const set of ex.set) {
              set.completed = undefined
            }
          }
          this.work = (tempWork as IWorkout)
        }
      }
    }
    this.calcTime()
    this.startWorkout()
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
