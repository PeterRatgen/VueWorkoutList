<template>
    <div class="top-bar"> <!-- Top bar -->
        <div class="back-button" @click="returnToFront"> 
            <fa class="arrow" icon="arrow-left"  ></fa>
        </div>
        <div class="right-flex">
            <p class="timer">{{ timeSinceStart }}</p>
            <button class="stop-button" @click="showEndCard">Afslut</button>
        </div>
    </div>
    <div class="workout-block"> 
        <div class="header-container"> <!-- Header -->
            <h1 class="header">{{ work.title }}</h1>
            <div class="accent-divider"></div>
        </div>
        <div class="workout-section" v-for="(exercise, index) in work.exerciseList" :key="exercise.id"> <!-- Exercise section -->
            <WorkoutDisplay 
                v-bind:exercise="exercise"
                v-bind:expand="currentExercise(work.exerciseList) == index"
                v-on:send-rep="sendRep"
                v-on:change-set="changeSet"
                @skipped="skippedExercise"
            />
        </div>
    </div>
    <Picker/>
    <WorkoutResult
        @ended="endWorkout"
    />
</template>


<script lang="ts">
import { defineComponent, inject } from 'vue';

import WorkoutDisplay from '../components/WorkoutDisplay.vue';
import WorkoutResult from '../components/WorkoutResult.vue';
import Picker from '../components/Picker.vue';

import { IWorkout, IExercise} from '../types';
import {AxiosInstance} from 'axios';

export default defineComponent ({
    name : 'WorkoutProcess',
    components : {
        WorkoutDisplay,
        WorkoutResult,
        Picker
    },
    props : {
        ["workout"] : Object as () => IWorkout,
        ["apiInstance"] : Object as () => AxiosInstance,
    },
    data() {
        return {
            timeSinceStart : '',
            work : {} as IWorkout,
        };
    },
    computed: {
        currentExercise(exerciseList : IExercise[]) : number {
            /*
                Returns the index of the current exercise
            */
            let currentEx = 0;
            for (let ex of exerciseList) {
                for (let set of ex.set) {
                    if (set.completed == undefined || set.completed == false) {
                        return currentEx;
                    }
                }
                currentEx = currentEx + 1;
            }
            return currentEx;
        }
    },
    methods : {
        calcTime() {
            let startTime = 0;
            if(this.work.timeOfStart == undefined)  {
                let time = new Date();
                this.work.timeOfStart = time.getTime();
                startTime = time.getTime();
            } else {
                startTime = this.work.timeOfStart;
            }
            setInterval(() => {
                let date : Date;
                let secs : number;
                if (this.work.timeOfEnd == undefined) {
                    let now = new Date().getTime();
                    date = new Date(now - startTime);
                    secs = date.getSeconds();
                } else {
                    date = new Date(this.work.timeOfEnd - startTime);
                    secs = date.getSeconds();
                }
                let secPrint : string;
                if (secs < 10) {
                    secPrint = "0" + secs.toString();
                } else {
                    secPrint = secs.toString();
                }
                let print = date.getMinutes().toString() + ':' + secPrint;
                this.timeSinceStart = print;
            }, 1000);
        },
        async startWorkout () {
            let a = [];
            for (let i of  this.work.exerciseList) {
                a.push(i.id);
            }
            if ( this.apiInstance != undefined) {
                let res = await this.apiInstance.post('/workout_history', {
                    workoutId : this.work._id,
                    exerciseList : a
                });
                this.work.historyId = res.data;
            }
        },
        async sendRep(data : any){
            let ex : IExercise | undefined = this.work.exerciseList.find(ele => ele.id == data.exerciseId);
            if ( ex != undefined) {
                for (let set of ex.set) {
                    if ((set.completed == undefined || set.completed == false ) && this.apiInstance != undefined ) {
                        await this.apiInstance.post('/workout_history/send_rep', {
                            historyId : this.work.historyId,
                            exerciseId : data.exerciseId,
                            repetitions : data.set.repetitions,
                            weight : data.set.weight
                        }); 
                        break;
                    } 
                }
            }
        },
        async skippedExercise(data : any ) {
            let ele : IExercise | undefined = this.work.exerciseList.find(ele => ele.id == data.exerciseId);
            if ( ele != undefined && this.apiInstance != undefined ) {
                ele.skipped = true;
                await this.apiInstance.put('/workout_history/skip_exercise', {
                    historyId : this.work.historyId,
                    exerciseId : data.exerciseId
                });
            }
        },
        changeSet(data : any) {
            let ex : IExercise | undefined = this.work.exerciseList.find(ele => ele.id == data.exerciseId);
            if ( ex != undefined ) {
                ex.set[data.index] = data.newSet;
            }
        },
        async showEndCard() {
            if (this.apiInstance != undefined) {
                let res = await this.apiInstance.put('/workout_history/end_exercise', {
                    historyId: this.work.historyId
                });
                this.work.timeOfEnd = res.data;
                const emitter : any = inject("emitter"); // Inject `emitter`
                emitter.emit('workout-completed', {
                    timeOfStart : this.work.timeOfStart,
                    timeOfEnd : res.data,
                    workout : this.work
                });
            }
        },
        async endWorkout() {
            localStorage.removeItem('onGoingWorkout');
            //this.work = {};
            this.$emit('back');
        },
        returnToFront() {
            localStorage.setItem('onGoingWorkout', JSON.stringify(this.work));
            this.$emit('back');
        }
    },
    mounted() {
        let onGoingWorkout = localStorage.getItem('onGoingWorkout');
        if (onGoingWorkout != undefined) {
            this.work  = (JSON.parse(onGoingWorkout) as IWorkout);
        } else {
            if (this.workout != undefined) {
                let tempWork : IWorkout | undefined = this.workout;
                console.log(tempWork);
                if (tempWork != undefined && tempWork.exerciseList != undefined) {
                    tempWork.timeOfStart = undefined;
                    for (let ex of tempWork.exerciseList) {
                        for (let set of ex.set) {
                            set.completed = undefined;
                        }
                    }
                    this.work = (tempWork as IWorkout);
                }
            }
        }
        this.calcTime();
        this.startWorkout();
    },
    updated() {
    }
});
</script>



<style scoped lang="scss">
@import "../assets/variables.scss";

.header-container {
    width: 95%;
    margin: auto;
    margin-top: 3.2rem;
    margin-bottom: 1rem;
    .header {
        @include header;
    }
}

.accent-divider {
    margin-top: 0.3rem;
    width: 10rem;
    height: 0.5rem;
    background: $accent-color;
}


.top-bar {
    width: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    padding: 0.5rem 1rem;

    .back-button {
        display: inline-block;
        position: relative;
        width: 2.5rem;
        height: 2.5rem;
        background-color: #fff;
        border: 2px #ddd solid;
        border-radius: 50%;

        .arrow {
            font-size: 1.5rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .right-flex {
        display: flex;
        width: 9rem;
        align-items: center;
        justify-content: space-between;

        .timer {
            display: inline;
            font-weight: 600;
            font-size: 1.2rem;
        }

        .stop-button {
            @include button;
            background-color: $delete-color; 
            color: white;
            border-color: $delete-color;
            font-weight: 600;
            padding:  0.35rem 0.5rem;
            
            &:hover {
                background-color: darken($delete-color, 5%)
            }

        }
    }

}

.workout-block {
    width: $content-width;
    margin: auto;
}

@media only screen and (max-width: 1000px) {
    .workout-block {
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
  .workout-block {
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
