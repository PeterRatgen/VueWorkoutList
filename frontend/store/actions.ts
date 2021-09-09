import { Commit, Getter } from 'vuex';
import axios, { AxiosInstance } from 'axios';
import { State } from './state_type';

import { IWorkout, IExercise, IRepetition, repData } from '../types';

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
        commit(SET_LOADING, true);
        try {
            let response = await state.apiInstance.get("/user_validateToken");
            if (response.status == 200) {
                commit(SET_USER_DATA, response.data);
                await this.getWorkout({commit , state });
            } else if (response.status == 401) {
                try {
                    let response = await axios.post(process.env.VUE_APP_API_URL + '/login',
                    {
                        email : state.email, 
                        password: state.password
                    });
                    commit(SET_USER_DATA, response.data);
                    await this.getWorkout({commit , state });
                    commit(SET_LOADING, false);
                } catch (err) {
                    console.trace();
                    console.log(err);
                }
            }
        } catch (err) {
            console.trace();
            console.log(err);
        }
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
};

export default actions;
