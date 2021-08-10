<template>
    <div class="top-bar"> <!-- Top bar -->
        <div class="back-button" @click="$emit('back')"> 
            <fa class="arrow" icon="arrow-left"  ></fa>
        </div>
        <p class="timer">{{ timeSinceStart }}</p>
    </div>
    <div class="header-container"> <!-- Header -->
        <h1 class="header">{{ workout.title }}</h1>
        <div class="accent-divider"></div>
    </div>
    <div class="workout-section" v-for="exercise in workout.exerciseList" :key="exercise.id"> <!-- Exercise section -->
        <WorkoutDisplay 
            v-bind:exercise="exercise"
            v-on:send-rep="sendRep"
        />
    </div>
    <Picker/>
</template>


<script>
import WorkoutDisplay from '../components/WorkoutDisplay'
import Picker from '../components/Picker.vue'

export default {
    name : 'WorkoutProcess',
    components : {
        WorkoutDisplay,
        Picker
    },
    props : {
        ["workout"] : Object,
        ["apiInstance"] : Function
    },
    emits : {
        ["back"] : undefined
    },
    data() {
        return {
            timeSinceStart : '',
            work : {}
        }
    },
    computed: {
    },
    methods : {
        calcTime() {
            let timeOfStart = new Date()
            setInterval(() => {
                let a = new Date()
                let toExpired = a.valueOf() - timeOfStart.valueOf()
                let date = new Date(toExpired)
                let secs = date.getSeconds()
                if (secs < 10) {
                    secs = "0" + secs
                } 
                let print = date.getMinutes() + ':' + secs
                this.timeSinceStart = print
            }, 1000)
        },
        async startWorkout () {
            console.log(this.work)
            let a = []
            for (let i of  this.work.exerciseList) {
                a.push(i.id) 
            }
            let res = await this.apiInstance.post('/workout_history', {
                workoutId : this.work._id,
                exerciseList : a
            })
            this.work.historyId = res.data
            console.log(res.data)
        },
        async sendRep(data){
            let res = await this.apiInstance.post('/workout_history/send_rep', {
                historyId : this.work.historyId,
                exerciseId : data.exerciseId,
                repetitions : data.set.repetitions,
                weight : data.set.weight
            }) 
            console.log(res.data)
        }
    },
    mounted() {
        this.calcTime()
        this.work = this.workout
        this.startWorkout()
    }
}
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

    .timer {
        display: inline;
        font-weight: 600;
        font-size: 1.2rem;
    }
}

.workout-section {

}


</style>
