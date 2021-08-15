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
                v-bind:expand="currentExercise == index"
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


<script>
import WorkoutDisplay from '../components/WorkoutDisplay'
import WorkoutResult from '../components/WorkoutResult.vue'
import Picker from '../components/Picker.vue'

export default {
    name : 'WorkoutProcess',
    components : {
        WorkoutDisplay,
        WorkoutResult,
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
            work : {},
        }
    },
    computed: {
        currentExercise () {
            /*
                Returns the index of the current exercise
            */
            let currentEx = 0
            for (let ex of this.work.exerciseList) {
                for (let set of ex.set) {
                    if (set.completed == undefined || set.completed == false) {
                        return currentEx
                    }
                }
                currentEx = currentEx + 1
            }
            return currentEx
        }
    },
    methods : {
        calcTime() {
            let startTime = 0
            if(this.work.timeOfStart == undefined)  {
                let time = new Date();
                this.work.timeOfStart = time.getTime()
                startTime = time.getTime()
            } else {
                startTime = this.work.timeOfStart
            }
            setInterval(() => {
                let date = ""
                let secs = ""
                if (this.work.timeOfEnd == undefined) {
                    let now = new Date().getTime()
                    date = new Date(now - startTime)
                    secs = date.getSeconds()
                    console.log(date + " " + secs)
                } else {
                    date = new Date(this.work.timeOfEnd - startTime)
                    secs = date.getSeconds()
                }
                if (secs < 10) {
                    secs = "0" + secs
                } 
                let print = date.getMinutes() + ':' + secs
                this.timeSinceStart = print
            }, 1000)
        },
        async startWorkout () {
            let a = []
            for (let i of  this.work.exerciseList) {
                a.push(i.id) 
            }
            let res = await this.apiInstance.post('/workout_history', {
                workoutId : this.work._id,
                exerciseList : a
            })
            this.work.historyId = res.data
        },
        async sendRep(data){
            let ex = this.work.exerciseList.find(ele => ele.id == data.exerciseId)
            for (let set of ex.set) {
                if (set.completed == undefined || set.completed == false) {
                    await this.apiInstance.post('/workout_history/send_rep', {
                        historyId : this.work.historyId,
                        exerciseId : data.exerciseId,
                        repetitions : data.set.repetitions,
                        weight : data.set.weight
                    }) 
                    break;
                } 
            }
        },
        async skippedExercise(data) {
            let ele = this.work.exerciseList.find(ele => ele.id == data.exerciseId)
            ele.skipped = true
            await this.apiInstance.put('/workout_history/skip_exercise', {
                historyId : this.work.historyId,
                exerciseId : data.exerciseId
            })
        },
        changeSet(data) {
            let ex = this.work.exerciseList.find(ele => ele.id == data.exerciseId)
            ex.set[data.index] = data.newSet
        },
        async showEndCard() {
            let res = await this.apiInstance.put('/workout_history/end_exercise', {
                historyId: this.work.historyId
            })
            this.work.timeOfEnd = res.data
            this.emitter.emit('workout-completed', {
                timeOfStart : this.work.timeOfStart,
                timeOfEnd : res.data,
                workout : this.work
            })

        },
        async endWorkout() {
            localStorage.removeItem('onGoingWorkout')
            this.work = {}
            this.$emit('back')
        },
        returnToFront() {
            localStorage.setItem('onGoingWorkout', JSON.stringify(this.work))
            this.$emit('back')
        }
    },
    mounted() {
        let onGoingWorkout = localStorage.getItem('onGoingWorkout')
        if (onGoingWorkout != undefined) {
            this.work = JSON.parse(onGoingWorkout)
        } else {
            let tempWork = this.workout
            tempWork.timeOfStart = undefined
            for (let ex of tempWork.exerciseList) {
                for (let set of ex.set) {
                    set.completed = undefined
                }
            }
            console.log(tempWork)
            this.work = tempWork
        }
        this.calcTime()
        this.startWorkout()
    },
    updated() {
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
