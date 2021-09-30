import { State, UserData } from './state_type'
import { AxiosInstance } from 'axios'

import { IWorkout, IExercise, IRepetition, repData } from '../../types'

interface ExerciseLocator {
    workoutId : string,
    exerciseId : string
    repetitionId? : string
}

export const mutations = {
  setLoading (state : State, status : boolean) : void {
    state.loading = status
  },

  setApiInstance (state : State, instance : AxiosInstance) : void {
    state.apiInstance = instance
  },

  setUserData (state : State, userData : UserData) : void {
    state.userData = userData
  },
  addRepetition (state : State, data : repData) : void {
    if (state.workouts !== undefined) {
      const workout: IWorkout | undefined =
                state.workouts.find(element => element._id === data.workoutId)
      if (workout !== undefined) {
        const exercise: IExercise | undefined =
                    workout.exerciseList.find(
                      (element: IExercise) => element.id === data.exerciseId
                    )
        if (exercise !== undefined) {
          exercise.set.push(data.repItem)
        }
      }
    }
  },
  changeRepetition (state : State, data : repData) : void {
    if (state.workouts !== undefined) {
      const workout : IWorkout | undefined =
                state.workouts.find(
                  (element : IWorkout) => element._id === data.workoutId
                )
      if (workout !== undefined) {
        const exercise : IExercise | undefined =
                    workout.exerciseList.find(
                      (element : IExercise) => element.id === data.exerciseId
                    )
        if (exercise !== undefined) {
          let rep : IRepetition | undefined =
                        exercise.set.find(
                          (element : IRepetition) => element.id === data.repItem.id
                        )
          if (rep !== undefined) {
            rep = data.repItem
          }
          return undefined
        }
        return undefined
      }
      return undefined
    }
  },
  deleteWorkout (state : State, data : {
        workoutId : string
    }) : void {
    if (state.workouts !== undefined) {
      const ele: IWorkout | undefined =
                state.workouts.find(element => element._id === data.workoutId)
      if (ele !== undefined) {
        const index: number = state.workouts.indexOf(ele)
        if (index !== -1) {
          state.workouts.splice(index, 1)
        }
      }
    }
  },
  addWorkout (state : State, data : IWorkout) : void {
    if (state.workouts !== undefined) {
      state.workouts.push(data)
    }
  },
  changeExerciseName (state : State, data : {
        workoutId : string,
        exerciseId : string,
        name : string
    }) : void {
    if (state.workouts !== undefined) {
      const workout : IWorkout | undefined =
                state.workouts.find(
                  (element : IWorkout) => element._id === data.workoutId
                )
      if (workout !== undefined) {
        const exercise : IExercise | undefined =
                    workout.exerciseList.find(
                      (element : IExercise) => element.id === data.exerciseId
                    )
        if (exercise !== undefined) {
          exercise.name = data.name
        } else {
          console.warn('exercise not found')
        }
      } else {
        console.warn('workout not found')
      }
    } else {
      console.warn('state.workouts undefined')
    }
  },
  changeWorkoutTitle (state : State, data : {
        workoutId : string,
        title : string
    }) : void {
    console.log(state)
    if (state.workouts !== undefined) {
      const workout : IWorkout | undefined =
                state.workouts.find(
                  (element : IWorkout) => element._id === data.workoutId
                )
      if (workout !== undefined) {
        workout.title = data.title
        console.log(state)
      } else {
        console.warn('workout not found')
      }
    } else {
      console.warn('state.workouts undefined')
    }
  },
  deleteExercise (state : State, data : ExerciseLocator) : void {
    if (state.workouts !== undefined) {
      const workout : IWorkout | undefined =
                state.workouts.find(element => element._id === data.workoutId)
      if (workout !== undefined) {
        const exercise : IExercise | undefined =
                    workout.exerciseList.find(
                      (element : IExercise) => element.id === data.exerciseId
                    )
        if (exercise !== undefined) {
          const index : number = workout.exerciseList.indexOf(exercise)
          workout.exerciseList.splice(index, 1)
        }
      }
    }
  },
  setWorkouts (state : State, workouts : IWorkout[]) : void {
    state.workouts = workouts
  },
  deleteRepetition (state : State, data : ExerciseLocator) : void {
    if (state.workouts !== undefined) {
      const workout : IWorkout | undefined =
                state.workouts.find(element => element._id === data.workoutId)
      if (workout !== undefined) {
        const exercise : IExercise | undefined =
                    workout.exerciseList.find(
                      (element : IExercise) => element.id === data.exerciseId
                    )
        if (exercise !== undefined) {
          const rep = exercise.set.find(rep => rep.id === data.repetitionId)
          if (rep !== undefined) {
            const index : number = exercise.set.indexOf(rep)
            exercise.set.splice(index, 1)
          }
        }
      }
    }
  },
  setWorkingOut (state : State, bool : boolean) : void {
    state.workingOut = bool
  },
  setCurrentWorkout (state : State, workout : IWorkout) : void {
    state.currentWorkout = workout
  }
}

export default mutations
