<template>
    <div class="workout-card">
        <div class="exercise-name">
            <h3>{{ work.name }}</h3>
        </div>
        <transition name="fade" mode="out-in">
            <div class="rep-table" v-if="!contracted">
                <div class="top-row">
                    <div class="table-header">Set</div>
                    <div class="table-header">Vægt</div>
                    <div class="table-header">Reps</div>
                    <div class="table-header">Status</div>
                </div>
                <div v-for="(set, index) in work.set" :key="set.id">
                    <div  class="repetition-row"
                        v-bind:class="{repetitionRowCompleted : set.completed}" >
                        <div class="table-content set" >{{ index + 1 }}</div>
                        <div 
                            class="table-content" 
                            v-bind:class="{tableContentCompleted : set.completed}"
                            @click="weightPicker(set)"
                        >
                            {{ set.weight }}
                        </div>
                        <div
                            class="table-content" 
                            v-bind:class="{tableContentCompleted : set.completed}"
                            @click="repPicker(set)"
                        >
                            {{ set.repetitions }}
                        </div>
                        <div 
                            class="table-content set" 
                            @click="approveWorkout(set, index, work.id)"
                        ><fa icon="check"></fa></div>
                    </div>
                    <div class="divder"></div>
                </div>
            </div>
            <div class="exercise-summary" v-else>
                <p >Øvelse færdig, {{ avgWeight }} kg (gns.) x {{ work.set.length }} sæt</p>
            </div>
        </transition>
    </div>
</template>


<script>
export default {
    /*
        A workout is displayed in the context of an ongoing workout.
    */
    name : 'WorkoutDisplay',
    components : {
    },
    props : {
        ["exercise"] : Object
    },
    emits : {
        ["send-rep"] : Object
    },
    data() {
        return {
            work : {},
            contracted : false
        }
    },
    computed: {
        avgWeight() {
            let amount = 0
            for (let set of this.work.set){
                amount = amount + set.weight 
            }
            return amount / this.work.set.length
        }
    },
    methods : {
        approveWorkout(set, index, exerciseId) {
            let allApproved = true
            for (let i = 0; i < index; i++) {
                if (this.work.set[i].completed != true) {
                    allApproved = false 
                    break;
                }
            }
            if (allApproved)  {
                set.completed = true
                this.$emit('send-rep', { set : set, exerciseId : exerciseId}) 
                if (index == this.work.set.length - 1) {
                    this.contracted = true
                }
            }
        },
        repPicker(set){
            this.emitter.emit('picker', set)
        },
        weightPicker(set){
            console.log(set)
        }
    },
    updated() {
    },
    mounted() {
        this.work = this.exercise
    }
}
</script>



<style scoped lang="scss">
@import "../assets/variables.scss";

.workout-card {
    @include workout-card
}

.exercise-name {
    margin-bottom: 1rem;
}

.divder {
  @include divider;
}

.exercise-summary {


    
    & > p {
        text-align: left;
    }
}

.rep-table {
    display: table;
    width: 100%;
    padding: 0 0.5rem;

    .top-row {
        display: flex; 
        justify-content: space-between;
        .table-header {
            flex: 1;
            padding: 0.3rem 0;
            font-weight: 700;
        }
    }

    .repetition-row {
        display: flex;
        justify-content: space-between;
        margin: 0.25rem 0;
        border-radius: 4px;

        .table-content {
            flex: 1;
            padding: 0.25rem 1.25rem;
            margin: 0 0.5rem; 
            background-color: $background-color;
            border-radius: 4px;
        }

        .table-content.set {
            background-color: transparent;
        }


        .tableContentCompleted {
            background-color: transparent;
        }

    }
}

.fade-enter-active {
  animation: move-list 0.4s linear;
}

.fade-leave-active {
  animation: move-list 0.2s linear reverse;
}

@keyframes move-list {
  0% {
    max-height: 0px;
    opacity: 0;
  }
  100% {
    max-height: 600px;
    opacity: 1;
  }
}

.repetitionRowCompleted {
    background-color: lighten($go-color, 30%);
}


</style>
