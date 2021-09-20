//Imports from modules
import { createStore, Store } from '../../node_modules/vuex';

//Type imports
import axios, { AxiosInstance } from 'axios';

import { State } from './state_type';


let instance : AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    headers : {
    },
    withCredentials: true
});

let state = {
        workouts : undefined,
        workingOut : false,
        currentWorkout : undefined,
        apiInstance : instance,
        userData : {},
        email : 'peter@pratgen.dk',
        password : 'safe',
        loading : false,
        name : "Peter Ratgen"
    };

//Store related imports
let mutations : any; 
let actions : any;
let getters : any;
export let store : Store<State>;

import('./mutations').then((mutationsImport) => {
        mutations = mutationsImport;
        import('./actions').then((actionsImport) => {
            actions = actionsImport;
            import('./getters').then((getterImport) => {
                getters = getterImport
                //Creation of the store 
                store = createStore({
                    state,
                    mutations,
                    actions,
                    getters
                });
            });
        });
});



