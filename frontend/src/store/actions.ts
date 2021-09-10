import { Commit, Getter } from 'vuex';
import { State } from './state_type';
import user from './../api/user'
import { AxiosInstance } from 'axios';

import { IWorkout, IExercise, IRepetition, repData } from '../types/index';

import { SET_LOADING, SET_API_INSTANCE, SET_USER_DATA} from './mutation_types';

export const actions = {
    async login ({commit , state } : { commit : Commit, state : State}){
        /**
            Logs in with the stored credentials, and stores the JSON Web
            Token returned by the endpoint
        */
        let instance : AxiosInstance = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            headers : {
            },
            withCredentials: true
        });
        commit(SET_API_INSTANCE, instance);

        user.validateToken(instance).then((status : {
            validated : boolean
            payload? : string
        }) => {
            if (status.validated) {
                this.getWorkout({commit , state });
            } else {
                user.login(instance, {
                    email : state.email,
                    password : state.password
                }).then(() => {
                })
            }
        })

        commit(SET_LOADING, true);
    },
    async getWorkout({commit , state } : { commit : Commit, state : State}) {
        /**
            Retrieve the workouts of the user, and save the response.
        */
        try {
            commit(SET_LOADING, true);
            const response = await state.apiInstance.get('/workout');
            state.workouts = JSON.parse(response.request.response);
            commit(SET_LOADING, false);
        } catch (err) {
            console.trace();
            console.log(err);
            commit(SET_LOADING, false);
        }

    },
    async titleChange({commit , state } : { commit : Commit, state : State}, data : any){
        /**
            Change the title of a workout.
        */
        try {
            await state.apiInstance.post('/workout/rename',
                {
                    id : data.workoutId,
                    title : data.title
                }
            );
        } catch (err) {
            console.trace();
            console.log(err);
        }
        if (state.workouts != null) {
            const ele: any = state.workouts.find((element : any) => element._id == data.workoutId);
            if (ele != undefined) {
                ele.title = data.title;
            }
        }
    },
    deleteWorkout({commit , state } : { commit : Commit, state : State}, data : any) {
        /**
            Delete one workout. First on the database, and then in the data
            stores locally.
        */
        try {
            state.apiInstance.delete('/workout/' + data.workoutId );
            let ele: IWorkout | undefined = state.workouts.find(element => element["_id"] == data.workoutId);
            if (ele != undefined) {
                let index: number = state.workouts.indexOf(ele);
                if (index != -1 ) {
                    state.workouts.splice(index, 1);
                }
            }
        }
        catch (err) {
            console.trace();
            console.log(err);
        }
    },
    async addRepetition({getters, commit , state } : 
            {
                getters : Getter, 
                commit : Commit, 
                state : State
            }, data : repData){
        /**
            Add a repetition to a workout. If another repetition exists
            before it, then add the same weight and reps to the new one.
            
            @exerciseId - id of the exercise
            @workoutId - id of the workout
        */
        let exercise = getters.getExercise(data);
        const length = exercise.set.length;
        let weight = 0;
        let repetitions = 0; 
        if (length > 0) {
            weight = exercise.set[length - 1].weight;
            repetitions = exercise.set[length - 1].repetitions;
        } 
        let repItem : IRepetition = {
            weight : weight,
            repetitions : repetitions
        };
        data.repItem = repItem;
        try {
            let res = await state.apiInstance.put('/workout/add_repetition', data);
            if(res.status == 200) {
                data.repItem.id = res.data;
                commit('addRepetition', data);
            } 
        }
        catch (err) {
            console.trace();
            console.log(err);
        }
    },
    async changeRep ({getters, commit , state } : 
            {
                getters : Getter, 
                commit : Commit, 
                state : State
            }, data : repData){
        /**
            Change a rep of the workout. First in the local data, then in
            the database.
        */
        let rep : IRepetition | undefined = getters.getRepetition(state, data);
        if (rep != undefined) {
            rep.repetitions = data.repItem.repetitions;
            rep.weight = data.repItem.weight;
            try {
                let res = await state.apiInstance.put('/workout/rep_change', {
                    workoutId: data["workoutId"],
                    exerciseId : data["exerciseId"],
                    repItem: data["repItem"]
                });
                if (res.status == 200) {
                    commit('addRepetition', data);
                    console.log("changed rep to " + JSON.stringify(data["repItem"]));
                } else {
                    Promise.reject("API call to change rep failed");
                }
            }
            catch (err) {
                console.trace();
                console.log(err);
            }
        } else {
            Promise.reject("No such repetition exists");
        }
    },
    async submitWorkout({getters, commit , state } : 
            {
                getters : Getter, 
                commit : Commit, 
                state : State
            }, data :  IWorkout) {
        /**
            Add a new workout to the user.
        */
        try {
            const res = await state.apiInstance.post('/workout', data);
            if (res.status == 200) {
                data._id =  res.data;
                commit('addWorkout', data);
            }
        }
        catch (err) {
            console.trace();
            console.log(err);
        }
    },
    async changeExerciseName({getters, commit , state } : 
            {
                getters : Getter, 
                commit : Commit, 
                state : State
            }, data : {
                workoutId : string,
                exerciseId : string,
                name : string
            }) {
        /**
            Change the name of an exercise.
        */
        try {
            let res = await state.apiInstance.put('/workout/rename_exercise', {
                id: data["workoutId"],
                exerciseId : data["exerciseId"],
                name : data["name"]
            });
            if (res.status == 200) {
                commit('changeExerciseName', data);
            }
        }
        catch (err) {
            console.trace();
            console.log(err);
        }
    },
    async deleteExercise({getters, commit , state } : 
            {
                getters : Getter, 
                commit : Commit, 
                state : State
            }, data : any) {
        /*
            Delete an exercise.
        */
        let workout : IWorkout = getters.getWorkout(state, data);
        
        try {
            let res = await state.apiInstance.post('/workout/update_exercise', {
                id: data["workoutId"],
                exerciseList : workout["exerciseList"]
            });
            if( res.status == 200) {
                commit('deleteExercise', data);
            }
        }
        catch (err) {
            console.trace();
            console.log(err);
        }
    },
};

export default actions;
