import { State } from './state_type';
import { AxiosInstance } from 'axios';

import { IWorkout, IExercise, IRepetition } from '../types';

export const getters = {
    getWorkout(state : State, data : {
        workoutId : string,
    }) {
        const workout: IWorkout | undefined = state.workouts.find(element => element["_id"] == data.workoutId);
        return workout;
    },
    getExercise(state : State, data : {
        workoutId : string,
        exerciseId : string
    }) {
        const workout = this.getWorkout(state, { workoutId : data.workoutId} );
        if (workout != undefined) {
            const exercise: IExercise | undefined = (workout as IWorkout).exerciseList.find((element: any) => element.id == data.exerciseId);
            if ( exercise != undefined) {
                return exercise;
            }
        }
    }
};

export default getters;
