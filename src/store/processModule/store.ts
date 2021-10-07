import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import serverUrl from '../../configuration'

import { IWorkout } from '../../types/index'
import { State } from './state_type'

// Type imports
import axios, { AxiosInstance } from 'axios'

const instance : AxiosInstance = axios.create({
  baseURL: serverUrl,
  withCredentials: true
})

const state : State = {
  currentWorkout: 0,
  completed: false,
  workout: {} as IWorkout,
  apiInstance: instance
}

export const processModule = {
  state,
  mutations,
  actions,
  getters
}

export default processModule
