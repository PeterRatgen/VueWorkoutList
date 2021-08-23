<template>
    <div @click="backgroundPressed()"  v-if="!workingOut">
        <HelloHeader class="hello-header" v-bind:header="jwtData.name" v-on:click="getWorkout"/>
        <div class="todo-block">
            <div class="todo">
                <div v-bind:key="workout" v-for="workout in workouts" >
                    <Workout 
                        v-bind:workout="workout" 
                    />
                </div>
                <AddWorkout/>
            </div>
        </div>
        <BeginWorkout 
            v-bind:workouts="workouts"
            v-on:select-workout="selectedWorkout"
            v-on:continue-workout="continueWorkout"
        />
    </div>
    <WorkoutProcess v-else 
        :workout="currentWorkout"  
        :apiInstance="apiInstance"
        v-on:back="workingOut = false"
    />
</template>

<script lang="ts">
import { inject, defineComponent } from 'vue';

import AddWorkout from '../components/AddWorkout.vue';
import HelloHeader from '../components/HelloHeader.vue';
import Workout from '../components/Workout.vue';
import BeginWorkout from '../components/BeginWorkout.vue';
import WorkoutProcess from '../views/WorkoutProcess.vue';
import axios, {AxiosInstance} from 'axios';

import { IWorkout, IExercise, IRepetition } from '../types';


export default defineComponent({
    /**
        View of the workouts.
    */
    name: 'WorkoutView',
    components: {
        Workout,
        HelloHeader,
        AddWorkout,
        BeginWorkout,
        WorkoutProcess
    },
    data() {
        return {
            /*
                The user is the JWT Token, which stores the token of the
                user, which is logged in.
            */
            user: {},
            headerItem : '',
            email : 'peter@pratgen.dk',
            password : 'safe',
            /*
                Instance of the axios connection, where queries to the API
                can be performed.
            */
            apiInstance : {} as AxiosInstance,
            /* 
               Array of the workouts 
            */
            workouts : [],
            workingOut : false,
            currentWorkout : {}
        };
    },
    methods: {
        async init() {
            /*
                Init script, initializes the website with data, and API instances.
            */
            this.apiInstance = this.createInstance();  
            await this.login();
            await this.getWorkout();
        },
        async login() {
            /**
                Logs in with the stored credentials, and stores the JSON Web
                Token retured by the endpoint
            */
            try {
                let response = await this.apiInstance.post('/login',
                {
                    email : this.email, 
                    password: this.password
                });
                let token = response.data;
                localStorage.setItem("user", token);
            } catch (err) {
                console.log(err);
            }
        },
        createInstance() {
            /**
                Saves an instance of the API connection, as not to repeat the
                Bearer Token
            */
            const token = localStorage.getItem("user");
            return axios.create({
                baseURL: process.env.VUE_APP_API_URL,
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
        },
        async getWorkout() {
            /**
                Retrieve the workouts of the user, and save the response.
            */
            const response = await this.apiInstance.get('/workout');
            this.workouts = JSON.parse(response.request.response);
        },
        async titleChange(data : any){
            /**
                Change the title of a workout.
            */
            await this.apiInstance.post('/workout/rename',
                {
                    id : data.workoutId,
                    title : data.title
                }
            );
            const ele: any = this.workouts.find((element : any) => element._id == data.workoutId);
            if (ele != undefined) {
                ele.title = data.title;
            }
        },
        deleteWorkout(workoutId : any) {
            /**
                Delete one workout. First on the database, and then in the data
                stores locally.
            */
            this.apiInstance.delete('/workout/' + workoutId );
            let ele: IWorkout | undefined = this.workouts.find(element => element["_id"] == workoutId);
            if (ele != undefined) {
                let index: number = this.workouts.indexOf(ele);
                if (index != -1 ) {
                    this.workouts.splice(index, 1);
                }
            }
        },
        async addRepetition(data : any){
            /**
                Add a repetition to a workout. If another repetition exists
                before it, then add the same weight and reps to the new one.
                
                @exerciseId - id of the exercise
                @workoutId - id of the workout
            */
            const workout: IWorkout | undefined = this.workouts.find(element => element["_id"] == data.workoutId);
            if (workout != undefined) {
                const exercise: IExercise | undefined = (workout as IWorkout).exerciseList.find((element: any) => element.id == data.exerciseId);
                if (exercise != undefined ) {
                    const length = exercise.set.length;
                    let weight = 0;
                    let repetitions = 0; 
                    if (length > 0) {
                        weight = exercise.set[length - 1].weight;
                        repetitions = exercise.set[length - 1].repetitions;
                    } else {
                        weight = 0;
                        repetitions = 0;
                    }
                    let repItem : IRepetition = {
                        weight : weight,
                        repetitions : repetitions
                    };
                    data.repItem = repItem;
                    let res = await this.apiInstance.put('/workout/add_repetition', data);
                    repItem.id = res.data;
                    exercise.set.push(repItem);
                }
            }
        },
        async changeRep(data : any){
            /**
                Change a rep of the workout. First in the local data, then in
                the database.
            */
            let workout : IWorkout | undefined = this.workouts.find((element : IWorkout) => element._id == data.workoutId);
            if (workout != undefined) {
                let exercise : IExercise | undefined = (workout as IWorkout).exerciseList.find(element => element.id == data.exerciseId);
                if (exercise != undefined) {
                    let rep : IRepetition | undefined = exercise.set.find(element => element.id == data.repItem.id);
                    if (rep != undefined) {
                        rep.repetitions = data.repItem.repetitions;
                        rep.weight = data.repItem.weight;
                        this.apiInstance.put('/workout/rep_change', {
                            workoutId: data["workoutId"],
                            exerciseId : data["exerciseId"],
                            repItem: data["repItem"]
                        });
                        console.log("changed rep to " + JSON.stringify(data["repItem"]));
                    }
                }
            }
        },
        backgroundPressed() {
            const emitter : any = inject("emitter"); // Inject `emitter`
            emitter.emit('pressed-background');
        },
        async submitWorkout(data : any) {
            /**
                Add a new workout to the user.
            */
            const res = await this.apiInstance.post('/workout', data);
            data._id =  res.data;
            this.workouts.push((data as never));
        },
        async changeExerciseName(data : any) {
            /**
                Change the name of an exercise.
            */
            let workout : IWorkout | undefined = this.workouts.find(element => element["_id"] == data["workoutId"]);
            if (workout != undefined) {
                let exercise : IExercise | undefined = (workout as IWorkout).exerciseList.find(element => element["id"] == data["exerciseId"]);
                if (exercise != undefined) {
                    exercise.name = data["name"];
                    await this.apiInstance.put('/workout/rename_exercise', {
                        id: data["workoutId"],
                        exerciseId : data["exerciseId"],
                        name : data["name"]
                    });
                }
            }
        },
        deleteExercise(data : any) {
            /*
                Delete an exercise.
            */
            let workout : IWorkout | undefined = this.workouts.find(element => element["_id"] == data["workoutId"]);
            if ( workout != undefined) {
                let exercise : IExercise | undefined = (workout as IWorkout).exerciseList.find(element => element.id == data.exerciseId);
                if (exercise != undefined) {
                    let index : number =  (workout as IWorkout).exerciseList.indexOf(exercise);
                    (workout as IWorkout).exerciseList.splice(index, 1);
                    this.apiInstance.post('/workout/update_exercise', {
                        id: data["workoutId"],
                        exerciseList : workout["exerciseList"]
                    });
                }
            }
        },
        async addExercise(data : any) {
            /*
                @data contains 
                    workoutId - for the workout where the exercise should be
            */
            let response = await this.apiInstance.put('/workout/add_exercise', {
                workoutId : data.workoutId
            });
            let exerciseId = response.data;
            let workout : IWorkout | undefined = this.workouts.find(element => element["_id"] == data.workoutId);
            if (workout != undefined) {
                (workout as IWorkout)["exerciseList"].push({id :  exerciseId, name: "", set: []});
            }
        },
        deleteRep(data : any) {
            /*
                Delete a repetition of an exercise in a workout.
            */
            let workout : IWorkout | undefined = this.workouts.find(element => element["_id"] == data.workoutId);
            if (workout != undefined) {
                let exercise = (workout as IWorkout).exerciseList.find(element => element.id == data.exerciseId);
                if (exercise != undefined) {
                    exercise.set.splice(data.repIndex, 1);
                    this.apiInstance.post('/workout/update_exercise', {
                        id: data.workoutId,
                        exerciseList : (workout as IWorkout).exerciseList
                    });
                }
            }
        },
        selectedWorkout(workout : IWorkout) {
            this.workingOut = true;
            this.currentWorkout = workout;
        },
        continueWorkout() {
            this.currentWorkout = {};
            this.workingOut = true;
        }
    },
    computed : {
        jwtData() {
            /**
                Get the data stored within the jwt token.         
            */
            const token = localStorage.getItem("user");
            if (token) {
                return JSON.parse(atob(token.split('.')[1]));
            }
            else {
                return {
                    name : ''
                };
            }
        }
    },
    created() {
        this.init();
    },
    mounted() {
        /**
            Receiving emitted events
        */
        const emitter : any = inject("emitter"); // Inject `emitter`

        emitter.on('new-repetition', this.addRepetition);
        emitter.on('completed-rep-edit', this.changeRep);
        emitter.on('submit-new-workout', this.submitWorkout);
        emitter.on('exercise-name-change', this.changeExerciseName);
        emitter.on('delete-exercise', this.deleteExercise);
        emitter.on('add-exercise', this.addExercise);
        emitter.on('delete-rep', this.deleteRep);
        emitter.on('title-change', this.titleChange);
        emitter.on('delete-workout', this.deleteWorkout);
    },
    updated() {
    }
});
</script>

<style lang="scss" >
@import "../assets/variables.scss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}
.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}
.btn:hover {
  background: #666;
}
.addtodo {
  padding-top: 25px;
}

.todo {
  padding-top: 0.3rem;

}
.todo-block {
  width: $content-width;
  margin: 0 auto;
}

.hello-header {
    width: calc(#{$content-width} - 2%);
    margin: 0 auto;
}


@media only screen and (max-width: 1400px) {
  .todo-block {
    width: 60%;
  }
  .hello-header {
    width: 60%;
  }
}


@media only screen and (max-width: 1000px) {
    .todo-block {
        width: 80%;
    }
    .hello-header {
        width: 80%;
    }
    .start-workout {
        width: 40%;
        left: calc((100% - 40%) / 2);
    }
}

@media only screen and (max-width: 600px) {
  .todo-block {
   width: 100%;
  }
  .hello-header {
    width: 95%;
  }
  .start-workout {
        width: 90%;
        left: 5%;
  }
}

</style>

