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

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

//Store related imports
export let store : Store<State> = createStore({
    state,
    mutations,
    actions,
    getters
});

