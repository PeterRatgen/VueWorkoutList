// import { State } from './state_type'

import serverUrl from '../../configuration'

// Type imports
import axios, { AxiosInstance } from 'axios'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const instance : AxiosInstance = axios.create({
  baseURL: serverUrl,
  withCredentials: true
})

const state = {
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
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default workoutViewModule
