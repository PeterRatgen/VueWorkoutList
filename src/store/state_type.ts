import { IWorkout } from '../types/index';
import { AxiosInstance } from 'axios';

export interface State {
    workouts : IWorkout[] | undefined,
    workingOut : boolean,
    currentWorkout: IWorkout | undefined,
    apiInstance : AxiosInstance,
    userData : Object,
    loading: boolean,
    email : string,
    password : string
}
