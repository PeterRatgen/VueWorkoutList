import State from './state_type'

import { IWorkout, IExercise, IRepetition } from '@/types'

const mutations = {
  setStartTime (state : State, time : number) : void {
    state.workout.timeOfStart = time
  },
  startWorkout (state : State, workout : IWorkout) : void {
    state.workout = workout
  },
  sendRep (state : State, data : {
    exerciseId : string,
    repetition : IRepetition
  }) : void {
    const ex : IExercise | undefined = state.workout.exerciseList.find((ele : IExercise) => ele.id === data.exerciseId)
    if (ex !== undefined) {
      ex.set.push(data.repetition)
    }
  },
  skipExercise (state : State, data : {
    exerciseId : string
  }) : void {
    const ele : IExercise | undefined = state.workout.exerciseList.find((ele : IExercise) => ele.id === data.exerciseId)
    if (ele !== undefined) {
      ele.skipped = true
    }
  }
}

export default mutations
