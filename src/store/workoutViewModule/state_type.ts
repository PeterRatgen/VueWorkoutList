import { IWorkout } from '../../types/index'
import { AxiosInstance } from 'axios'

export interface UserData {
  name : string,
  email : string,
  password : string
}

export interface WorkoutViewState {
  workouts : IWorkout[] | undefined,
  workingOut : boolean,
  currentWorkout: IWorkout | undefined,
  apiInstance : AxiosInstance,
  userData : UserData,
  loading: boolean
}

export default WorkoutViewState
