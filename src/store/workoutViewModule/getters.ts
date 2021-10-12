import { WorkoutViewState } from './state_type'

import { IWorkout, IExercise, IRepetition, repData } from '../../types/index'

export const getters = {
  getWorkout (state : WorkoutViewState, data : {
        workoutId : string,
    }) : IWorkout | undefined {
    if (state.workouts !== undefined) {
      const workout: IWorkout | undefined = state.workouts.find((element : IWorkout) => element._id === data.workoutId)
      return workout
    }
  },
  getExercise (state : WorkoutViewState, data : {
        workoutId : string,
        exerciseId : string
    }) : IExercise | undefined {
    const workout = this.getWorkout(state, { workoutId: data.workoutId })
    if (workout !== undefined) {
      const exercise: IExercise | undefined = (workout as IWorkout).exerciseList.find((element: IExercise) => element.id === data.exerciseId)
      if (exercise !== undefined) {
        return exercise
      }
    }
  },
  getRepetition (state : WorkoutViewState, data : repData) : IRepetition | undefined {
    if (state.workouts !== undefined) {
      const workout : IWorkout | undefined = state.workouts.find((element : IWorkout) => element._id === data.workoutId)
      if (workout !== undefined) {
        const exercise : IExercise | undefined = workout.exerciseList.find((element : IExercise) => element.id === data.exerciseId)
        if (exercise !== undefined) {
          const rep : IRepetition | undefined = exercise.set.find((element : IRepetition) => element.id === data.repItem.id)
          if (rep !== undefined) {
            return rep
          }
          return undefined
        }
        return undefined
      }
      return undefined
    }
  },
  getFirstName (state : WorkoutViewState) : string {
    if (state.userData.name !== undefined) {
      return state.userData.name.split(' ')[0]
    }
    return ' '
  }
}

export default getters
