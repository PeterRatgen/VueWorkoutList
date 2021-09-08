import { Commit } from 'vuex';
import axios, { AxiosInstance } from 'axios';
import { State } from './state_type';

import { SET_LOADING} from './mutation_types';

export const actions = {
    async login ({commit , state } : { commit : Commit, state : State}){
        commit(SET_LOADING, true);
        /**
            Logs in with the stored credentials, and stores the JSON Web
            Token returned by the endpoint
        */
        try {
            let response = await axios.post(process.env.VUE_APP_API_URL + '/login',
            {
                email : state.email, 
                password: state.password
            });
            let token = response.data;
            state.token = token;
            commit(SET_LOADING, false);
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
        const token = localStorage.getItem("user");
        let instance : AxiosInstance = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        state.apiInstance = instance;
    },
};

export default actions;
