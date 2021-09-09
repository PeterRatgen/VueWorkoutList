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
    },
    changeRepetition (state : State, data : repData) {
        let workout : IWorkout | undefined = state.workouts.find((element : IWorkout) => element._id == data.workoutId);
        if (workout != undefined) {
            let exercise : IExercise | undefined = workout.exerciseList.find((element : IExercise) => element.id == data.exerciseId);
            if (exercise != undefined) {
                let rep : IRepetition | undefined = exercise.set.find((element : IRepetition) => element.id == data.repItem.id);
                if (rep != undefined) {
                    rep = repData.repItem;
                }
                return undefined;
            }
            return undefined;
        }
        return undefined;
    },
    addWorkout (state : State, data : IWorkout) {
        state.workouts.push(data);
    },
    changeExerciseName( state : State, data : any) {
        let workout : IWorkout | undefined = state.workouts.find((element : IWorkout) => element._id == data.workoutId);
        if (workout != undefined) {
            let exercise : IExercise | undefined = workout.exerciseList.find((element : IExercise) => element.id == data.exerciseId);
            if (exercise != undefined) {
                exercise.name = data["name"];
            }
        }
    },
    deleteExercise ( state : State, data : any) {
        let workout : IWorkout | undefined = state.workouts.find(element => element["_id"] == data["workoutId"]);
        if ( workout != undefined) {
            let exercise : IExercise | undefined = workout.exerciseList.find((element : IExercise) => element.id == data.exerciseId);
            if (exercise != undefined) {
                let index : number =  (workout as IWorkout).exerciseList.indexOf(exercise);
                workout.exerciseList.splice(index, 1);
            }
        }
    }
};

export default mutations;
