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
        commit(types.START_WORKOUT)
      }
    } catch (err) {
      console.trace()
      console.log(err)
    }
  },
  async sendRep ({ state, commit } : {state : State, commit : Commit}, data : {
      exerciseId : string,
      repetition : IRepetition}) : Promise<void> {
    const ex : IExercise | undefined = state.workout.exerciseList.find((ele : IExercise) => ele.id === data.exerciseId)
    if (ex !== undefined) {
      for (const set of ex.set) {
        if (set.completed === false) {
          try {
            await state.apiInstance.post('/workout_history/send_rep', {
              historyId: state.workout.historyId,
              exerciseId: data.exerciseId,
              repetitions: data.repetition.repetitions,
              weight: data.repetition.weight
            })
            commit(types.SEND_REP, data)
          } catch (err) {
            console.trace()
            console.log(err)
          }
          break
        }
      }
    }
  },
  async skippedExercise ({ state, commit } : {state : State, commit : Commit}, data : {
    exerciseId : string
  }) : Promise<void> {
    try {
      await state.apiInstance.put('/workout_history/skip_exercise', {
        historyId: state.workout.historyId,
        exerciseId: data.exerciseId
      })
      commit(types.SKIP_EXERCISE, data)
    } catch (err) {
      console.trace()
      console.log(err)
    }
  },
  changeSet ({ commit } : { commit : Commit}, data : {
    exerciseId : string
    index : number
    newSet : IRepetition
  }) : void {
    commit(types.CHANGE_SET, data)
  },
  async showEndCard ({ state, commit } : { state : State, commit : Commit}) : Promise<void> {
    if (state.apiInstance !== undefined) {
      try {
        const res = await state.apiInstance.put('/workout_history/end_exercise', {
          historyId: state.workout.historyId
        })
        commit(types.SET_END_TIME, res.data)
        commit(types.SET_COMPLETED, true)
      } catch (err) {
        console.trace()
        console.log(err)
      }
    }
  },
  showPicker ({ commit } : { commit : Commit }, bool : boolean) : void {
    commit(types.SET_PICKER_VISIBILITY, bool)
  },
  setPickerDisplayData ({ commit } : { commit : Commit }, data : {
    unit: string,
    steps: number,
    number: number
  }) : void {
    commit(types.SET_PICKER_DISPLAY, data)
  },
  setPickerData ({ commit } : { commit : Commit }, data : {tod : number}) : void {
    commit(types.SET_PICKER_DATA, data.tod)
  }
}

export default actions
