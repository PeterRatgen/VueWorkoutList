import { IWorkout } from '@/types'
import { AxiosInstance } from 'axios'

export interface State {
  workout : IWorkout,
  currentWorkout : number,
  apiInstance : AxiosInstance
}

export default State
