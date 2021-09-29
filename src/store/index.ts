// Imports from modules
import { createStore, Store } from '../../node_modules/vuex'
import serverUrl from '../configuration'

// Type imports
import axios, { AxiosInstance } from 'axios'

import { State } from './state_type'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
console.log(process.env.VUE_APP_API_URL)

const instance : AxiosInstance = axios.create({
  baseURL: serverUrl,
  headers: {
  },
  withCredentials: true
})

console.log(process.env)

const state = {
  workouts: undefined,
  workingOut: false,
  currentWorkout: undefined,
  apiInstance: instance,
  userData: {},
  email: 'peter@pratgen.dk',
  password: 'safe',
  loading: false,
  name: 'Peter Ratgen'
}

// Store related imports
export const store : Store<State> = createStore({
  state,
  mutations,
  actions,
  getters
})
