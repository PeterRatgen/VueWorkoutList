// Imports from modules
import { createStore } from '../../node_modules/vuex'

import workoutViewModule from './workoutViewModule/store'
import processModule from './processModule/store'

// Store related imports
export const store = createStore({
  modules: {
    workoutView: workoutViewModule,
    workoutProcess: processModule
  }
})
