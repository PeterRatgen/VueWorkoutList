import { IWorkout } from '@/types'
import { AxiosInstance } from 'axios'

export interface State {
  workout : IWorkout,
  currentWorkout : number,
  completed : boolean,
  apiInstance : AxiosInstance
}

export default State
