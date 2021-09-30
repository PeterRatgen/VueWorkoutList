import { IWorkout } from '../types/index'
import { AxiosInstance } from 'axios'

export interface UserData{
  name : string
}

export interface State {
    workouts : IWorkout[] | undefined,
    workingOut : boolean,
    currentWorkout: IWorkout | undefined,
    apiInstance : AxiosInstance,
    userData : UserData,
    loading: boolean,
    email : string,
    password : string
}
