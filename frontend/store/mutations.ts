import { State } from './state_type';
import { AxiosInstance } from 'axios';

import { IWorkout, IExercise, IRepetition, repData } from '../types';


export const mutations = {
    setLoading(state : State , status : boolean) {
        state.loading = status;
    },

    setApiInstance(state : State, instance : AxiosInstance) {
        state.apiInstance = instance;
    },

    setUserData(state : State, userData : Object ) {
        state.userData = userData;
    },

    addRepetition(state : State, data : repData) {
        const workout: IWorkout | undefined = state.workouts.find(element => element["_id"] == data.workoutId);
        if (workout != undefined) {
            const exercise: IExercise | undefined = (workout as IWorkout).exerciseList.find((element: any) => element.id == data.exerciseId);
            if ( exercise != undefined) {
                exercise.set.push(data.repItem);
            }
        }
    }
};

export default mutations;
