import { Commit } from '../../../node_modules/vuex'
import * as types from './mutation_types'

import { IExercise, IRepetition } from '@/types'

import State from './state_type'

const actions = {
  setStartTime ({ commit } : { commit : Commit }, time : number) : void {
    commit(types.SET_START_TIME, time)
  },
  async startWorkout ({ state, commit } : {state : State, commit : Commit}) : Promise<void> {
    const a = []
    for (const i of state.workout.exerciseList) {
      a.push(i.id)
    }
    try {
      const res = await state.apiInstance.post('/workout_history', {
        workoutId: state.workout._id,
        exerciseList: a
      })
      if (res.status === 200) {
        state.workout.historyId = res.data
      }
    } catch (err) {
      console.trace()
      console.log(err)
    }
  },
  async sendRep ({ state, commit } : {state : State, commit : Commit}, data : {
      exerciseId : string,
      set : IRepetition}) : Promise<void> {
    const ex : IExercise | undefined = state.workout.exerciseList.find((ele : IExercise) => ele.id === data.exerciseId)
    if (ex !== undefined) {
      for (const set of ex.set) {
        if (set.completed === false) {
          try {
            await state.apiInstance.post('/workout_history/send_rep', {
              historyId: state.workout.historyId,
              exerciseId: data.exerciseId,
              repetitions: data.set.repetitions,
              weight: data.set.weight
            })
            commit(types.APPEND_COMPLETED_REPETITION, data)
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
}

export default actions
