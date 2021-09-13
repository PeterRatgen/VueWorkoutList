//Imports from modules
import { createStore } from '../../node_modules/vuex';

//Type imports
import axios, { AxiosInstance } from 'axios';

//Store related imports
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

let instance : AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers : {
    },
    withCredentials: true
});
//Creation of the store 
const store = createStore({
    state : {
        workouts : undefined,
        workingOut : false,
        currentWorkout : undefined,
        apiInstance : instance,
        userData : {},
        email : 'peter@pratgen.dk',
        password : 'safe',
        loading : false,
        name : "Peter Ratgen"
    },
    mutations,
    actions,
    getters
});

export default store;
