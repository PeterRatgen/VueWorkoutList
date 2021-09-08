import { IWorkout } from '../src/types/index';
import { AxiosInstance } from 'axios';

export interface State {
    workouts : IWorkout[] | null,
    workingOut : boolean,
    currentWorkoutId : string,
    apiInstance : AxiosInstance,
    token : string,
    loading: boolean,
    email : string,
    password : string
}
