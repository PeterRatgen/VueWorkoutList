<template>
    <div @click="backgroundPressed()"  v-if="!workingOut">

        <HelloHeader class="hello-header" v-bind:header="jwtData.name" v-on:click="getWorkout"/>
        <div class="todo-block">
            <div class="todo">
                <div v-bind:key="workout" v-for="(workout) in workouts" >
                    <Workout 
                        :workout="workout" 
                    />
                </div>
                <AddWorkout
                    @new-workout="submitWorkout"
                />
            </div>
        </div>
        <BeginWorkout 
            :workouts="workouts"
            @select-workout="selectedWorkout"
            @continue-workout="continueWorkout"
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
import { mapActions }  from '../../node_modules/vuex';

import { IWorkout } from '../types/index';

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
            'workingOut',
            'currentWorkout'
        ]),
        backgroundPressed() {
            (this as any).emitter.emit('pressed-background');
        },
        selectedWorkout(workout : IWorkout) {
            this.workingOut(true);
            this.currentWorkout(workout);
        },
        continueWorkout() {
            this.currentWorkout({});
            this.workingOut(true);
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

