<template>
    <div @click="backgroundPressed()"  v-if="!workingOut">

        <HelloHeader class="hello-header" v-bind:header="name" v-on:click="getWorkout"/>
        <div class="todo-block">
            <div class="todo">
                <div v-bind:key="workout" v-for="(workout) in workouts" >
                    <Workout 
                        :workout="workout" 
                    />
                </div>
                <AddWorkout/>
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
import { defineComponent } from 'vue';
import { mapActions, mapState }  from '../../node_modules/vuex';

import { IWorkout } from '../types/index';

import AddWorkout from '../components/AddWorkout.vue';
import HelloHeader from '../components/HelloHeader.vue';
import Workout from '../components/Workout.vue';

const BeginWorkout = () => import('../components/BeginWorkout.vue');
const WorkoutProcess = () => import('../views/WorkoutProcess.vue');

import mitt, { Emitter } from 'mitt';

type Events = {
  foo: string;
  bar?: number;
};

let mittInstance  : Emitter<Events>= mitt<Events>();

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
    provide : {
        emitter : mittInstance
    },
    computed : mapState([
        'workouts',
        'workingOut',
        'name'
    ]),
    methods: {
        ...mapActions([
            'login',
            'getWorkout',
            'setWorkingOut',
            'currentWorkout'
        ]),
        backgroundPressed() {
            (mittInstance as any).emit('pressed-background');
        },
        selectedWorkout(workout : IWorkout) {
            this.setWorkingOut(true);
            this.currentWorkout(workout);
        },
        continueWorkout() {
            this.currentWorkout({});
            this.setWorkingOut(true);
        }
    },
    mounted() {
        /**
            Receiving emitted events
        */
        this.login().then(() => {
            this.getWorkout();
        });
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

