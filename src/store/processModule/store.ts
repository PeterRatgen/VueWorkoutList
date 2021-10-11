import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import { IWorkout } from '../../types/index'
import { WorkoutProcessState } from './state_type'

// Type imports
import axios, { AxiosInstance } from 'axios'

import serverUrl from '../../configuration'
const instance : AxiosInstance = axios.create({
  baseURL: serverUrl,
  withCredentials: true
})

const state : WorkoutProcessState = {
  currentWorkout: 0,
  completed: false,
  workout: {} as IWorkout,
  apiInstance: instance,
  pickerState: {
    visible: false,
    pickerData: undefined,
    data: undefined
  }
}

export const processModule = {
  state,
  mutations,
  actions,
  getters
}

export default processModule
