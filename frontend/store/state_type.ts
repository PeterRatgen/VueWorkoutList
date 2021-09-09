import { IWorkout } from '../src/types/index';
import { AxiosInstance } from 'axios';

export interface State {
    workouts : IWorkout[],
    workingOut : boolean,
    currentWorkoutId : string,
    apiInstance : AxiosInstance,
    userData : Object,
    loading: boolean,
    email : string,
    password : string
}
