// vuex.d.ts
import { Store } from 'vuex'
import WorkoutProcessState from './src/store/processModule/state_type'
import WorkoutViewState from './src/store/workoutViewModule/state_type'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface RootStore {
    workoutView: WorkoutViewState
    workoutProcess: WorkoutProcessState
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<RootStore>
  }
}
