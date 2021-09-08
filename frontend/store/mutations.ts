import { State } from './state_type';


export const mutations = {
    setLoading(state : State , status : boolean) {
        state.loading = status;
    },
    setToken(state : State, token : string) {
        state.token = token;    
    }
};

export default mutations;
