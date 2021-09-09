<template>
    <div @click="backgroundPressed()"  v-if="!workingOut">

        <HelloHeader class="hello-header" v-bind:header="jwtData.name" v-on:click="getWorkout"/>
        <div class="todo-block">
            <div class="todo">
                <div v-bind:key="workout" v-for="workout in workouts" >
                    <Workout 
                        v-bind:workout="workout" 
                        @new-repetition="addRepetition"
                        @completed-rep-edit="changeRep" 
                        @exercise-name-change="changeExerciseName"
                        @delete-exercise="deleteExercise"
                        @delete-rep="deleteRep"
                        @add-exercise="addExercise"
                    />
                </div>
                <AddWorkout
                    @new-workout="submitWorkout"
                />
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
        :jwtData="token"
        v-on:back="workingOut = false"
    />
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import { mapActions }  from 'vuex';

import AddWorkout from '../components/AddWorkout.vue';
import HelloHeader from '../components/HelloHeader.vue';
import Workout from '../components/Workout.vue';
import BeginWorkout from '../components/BeginWorkout.vue';
import WorkoutProcess from '../views/WorkoutProcess.vue';

import mitt from 'mitt';


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
    setup () {
        provide("emitter", mitt());
    },
    methods: {
        ...mapActions([
            'login',
            'getWorkout',
            'addRepetition',
            'changeRep',
            'submitWorkout'
        ]),
        backgroundPressed() {
            (this as any).emitter.emit('pressed-background');
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
                    try {
                        this.apiInstance.post('/workout/update_exercise', {
                            id: data["workoutId"],
                            exerciseList : workout["exerciseList"]
                        });
                    }
                    catch (err) {
                        console.trace();
                        console.log(err);
                    }
                }
            }
        },
        async addExercise(data : any) {
            /*
                @data contains 
                    workoutId - for the workout where the exercise should be
            */
            try {
                let response = await this.apiInstance.put('/workout/add_exercise', {
                    workoutId : data.workoutId
                });
                let exerciseId = response.data;
                let workout : IWorkout | undefined = this.workouts.find(element => element["_id"] == data.workoutId);
                if (workout != undefined) {
                    (workout as IWorkout)["exerciseList"].push({id :  exerciseId, name: "", set: []});
                }
            }
            catch (err) {
                console.trace();
                console.log(err);
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
                    try {
                        this.apiInstance.post('/workout/update_exercise', {
                            id: data.workoutId,
                            exerciseList : (workout as IWorkout).exerciseList
                        });
                    }
                    catch (err) {
                        console.trace();
                        console.log(err);
                    }
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
    mounted() {
        /**
            Receiving emitted events
        */
        this.login();
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

