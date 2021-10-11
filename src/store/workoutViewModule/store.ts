// Type imports
import axios, { AxiosInstance } from 'axios'

// State of the module
import WorkoutViewState from './state_type'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import serverUrl from '../../configuration'
const instance : AxiosInstance = axios.create({
  baseURL: serverUrl,
  withCredentials: true
})

const state : WorkoutViewState = {
  workouts: undefined,
  workingOut: false,
  currentWorkout: undefined,
  apiInstance: instance,
  userData: {
    name: 'Peter Ratgen'
  },
  email: 'peter@pratgen.dk',
  password: 'safe',
  loading: false
}

export const workoutViewModule = {
  state,
  mutations,
  actions,
  getters
}

export default workoutViewModule
