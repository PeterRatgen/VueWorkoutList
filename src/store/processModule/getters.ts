import { GetterTree } from '../../../node_modules/vuex'

import { IWorkout } from '@/types'

import State from './state_type'

export const getters : GetterTree<State, State> = {
  getStartTime (state : State) : number | undefined {
    if (state.workout.timeOfStart !== undefined) {
      return state.workout.timeOfStart
    } else {
      return undefined
    }
  },
  getEndTime (state : State) : number | undefined {
    if (state.workout.timeOfEnd !== undefined) {
      return state.workout.timeOfEnd
    } else {
      return undefined
    }
  },
  getOngoingWorkout (state : State) : IWorkout {
    return state.workout
  }
}

export default getters
