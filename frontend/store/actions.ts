import { Commit } from 'vuex';
import axios, { AxiosInstance } from 'axios';
import { State } from './state_type';

import { SET_LOADING} from './mutation_types';

export const actions = {
    async login ({commit , state } : { commit : Commit, state : State}){
        /**
            Logs in with the stored credentials, and stores the JSON Web
            Token returned by the endpoint
        */
        let token = localStorage.getItem("token");
        commit(SET_LOADING, true);
        try {
            let response = await axios.post(process.env.VUE_APP_API_URL + '/login',
            {
                email : state.email, 
                password: state.password
            });
            let token = response.data;
            state.token = token;
            commit(SET_LOADING, false);
            this.createInstance({ state });
        } catch (err) {
            console.trace();
            console.log(err);
        }
    }, 
    createInstance({ state } : { state : State}) {
        /**
            Saves an instance of the API connection, as not to repeat the
            Bearer Token
        */
        let instance : AxiosInstance = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            headers : {
                Authorization : `Bearer ${state.token}`
            }
        });
        state.apiInstance = instance;
    },
};

export default actions;
