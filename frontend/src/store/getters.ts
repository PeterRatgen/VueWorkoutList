import { State } from './state_type';
import { AxiosInstance } from 'axios';

import { IWorkout, IExercise, IRepetition, repData } from '../types/index';

export const getters = {
    getWorkout(state : State, data : {
        workoutId : string,
    }) {
        if ( state.workouts != undefined) {
            const workout: IWorkout | undefined = state.workouts.find(element => element["_id"] == data.workoutId);
            return workout;
        }
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
    },
    getRepetition(state : State, data : repData) : IRepetition | undefined {
        if ( state.workouts != undefined) {
            let workout : IWorkout | undefined = state.workouts.find((element : IWorkout) => element._id == data.workoutId);
            if (workout != undefined) {
                let exercise : IExercise | undefined = workout.exerciseList.find((element : IExercise) => element.id == data.exerciseId);
                if (exercise != undefined) {
                    let rep : IRepetition | undefined = exercise.set.find((element : IRepetition) => element.id == data.repItem.id);
                    if (rep != undefined) {
                        return rep;
                    }
                    return undefined;
                }
                return undefined;
            }
            return undefined;
        }
    }
};

export default getters;
