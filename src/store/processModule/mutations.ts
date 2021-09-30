import State from './state_type'


import { IWorkout, IRepetition } from '@/types'

const mutations = {
  setStartTime (state : State, time : number) : void {
    state.workout.timeOfStart = time
  },
  startWorkout (state : State, workout : IWorkout) : void {
    state.workout = workout
  },
  appendRepetitionToExercise (state : State, data : {
    exerciseId : string,
    set : IRepetition
  }) : void {
    const ex : IExercise | undefined = state.workout.exerciseList.find((ele : IExercise) => ele.id === data.exerciseId)
    if (ex !== undefined)
  }
}

export default mutations
