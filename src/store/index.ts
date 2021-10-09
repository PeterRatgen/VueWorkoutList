// Imports from modules
import { createStore } from '../../node_modules/vuex'

import workoutViewModule from './workoutViewModule/store'
import processModule from './processModule/store'

import WorkoutViewState from './workoutViewModule/state_type'
import WorkoutProcessState from './processModule/state_type'

export interface RootState {
  workoutView : WorkoutViewState,
  workoutProcess : WorkoutProcessState
}

// Store related imports
export const store = createStore<RootState>({
  modules: {
    workoutView: workoutViewModule,
    workoutProcess: processModule
  }
})
