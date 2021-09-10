//Imports from modules
import { createStore } from 'vuex';
import { AxiosInstance} from 'axios';

//Type imports

//Store related imports
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

//Creation of the store 
const store = createStore({
    state : {
        workouts : null,
        currentWorkout : {},
        userData : {},
        workingOut : false,
        email : 'peter@pratgen.dk',
        password : 'safe',
        loading : false
    },
    mutations,
    actions,
    getters
});

export default store;
