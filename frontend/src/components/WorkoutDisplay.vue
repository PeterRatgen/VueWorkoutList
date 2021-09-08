<template>
    <div class="workout-card">
        <div class="flex-container">
            <h3>{{ exercise.name }}</h3>
            <span class="icon-container" @click.stop="displayHover = !displayHover">
                <fa class="dots" icon="ellipsis-v"></fa>
            </span>
            <HoverMenu 
                :menuItems=hovMen 
                :display=displayHover  
                @option="handleOption"
                @minimize="displayHover = false"
                @click.stop
            />
        </div>
        <transition name="fade" mode="out-in">
            <div class="rep-table" v-if="!contracted">
                <div class="top-row">
                    <div class="table-header">Set</div>
                    <div class="table-header">Vægt</div>
                    <div class="table-header">Reps</div>
                    <div class="table-header">Status</div>
                </div>
                <div v-for="(set, index) in exercise.set" :key="set.id">
                    <div  class="repetition-row"
                        v-bind:class="{repetitionRowCompleted : set.completed}" >
                        <div 
                            class="table-content set" 
                            v-bind:class="{tableContentCompleted : set.completed}"
                            data-test="index"
                        >{{ index + 1 }}
                        </div>
                        <div 
                            class="table-content" 
                            v-bind:class="{tableContentCompleted : set.completed}"
                            @click="weightPicker(index, set)"
                            data-test="weight"
                        >
                            {{ set.weight }}
                        </div>
                        <div
                            class="table-content" 
                            v-bind:class="{tableContentCompleted : set.completed}"
                            @click="repPicker(index, set)"
                            data-test="repetitions"
                        >
                            {{ set.repetitions }}
                        </div>
                        <div 
                            class="table-content set" 
                            v-bind:class="{tableContentCompleted : set.completed}"
                            @click="approveWorkout(set, index, exercise.id)"
                            data-test="checkmark"
                        ><fa icon="check"></fa></div>
                    </div>
                    <div class="divder"></div>
                </div>
            </div>
            <div class="exercise-summary" v-else-if="exercise.skipped">
                <p data-test="skipped-exercise">Øvelse sprunget over.</p>
            </div>
            <div class="exercise-summary" v-else-if="allApproved">
                <p data-test="done-exercise">Øvelse færdig, {{ avgWeight }} kg x {{ exercise.set.length }} sæt</p>
            </div>
            <div class="exercise-summary" v-else>
                <p data-test="minimize-exercise">{{ avgWeight }} kg x {{ exercise.set.length }} sæt</p>
            </div>
        </transition>
    </div>
</template>


<script lang="ts">
import { defineComponent, inject } from 'vue';
import {  IRepetition } from '../types';

import HoverMenu from "../components/HoverMenu.vue";

export default defineComponent ({
    /*
        A workout is displayed in the context of an ongoing workout.
    */
    name : 'WorkoutDisplay',
    components : {
        HoverMenu
    },
    props : {
        ["exercise"] : Object,
        ["expand"] : Boolean
    },
    emits : {
        ["send-rep"] : Object,
        ["skipped"] : Object,
        ["change-set"] : Object
    },
    setup() {
        const emitter = inject('emitter');

        return {
            emitter
        };
    },
    data() {
        return {
            contracted : false,
            hovMen: ["Skip exercise"],
            displayHover: false,
            allApproved : false
        };
    },
    computed: {
        avgWeight() : number {
            let amount = 0;
            if (this.exercise != undefined) {
                for (let set of this.exercise.set){
                    amount = amount + set.weight;
                }
                return Math.round(amount / this.exercise.set.length);
            }
            return 0;
        }
    },
    methods : {
        approveWorkout(set : IRepetition, index : number, exerciseId : string) {
            let allApproved = true;
            if(this.exercise != undefined) {
                for (let i = 0; i < index; i++) {
                    if (this.exercise.set[i].completed != true) {
                        allApproved = false;
                        break;
                    }
                }
                if (allApproved )  {
                    set.completed = true;
                    this.$emit('send-rep', { set : set, exerciseId : exerciseId});
                    if (index == this.exercise.set.length - 1) {
                        this.contracted = true;
                        this.allApproved = true;
                    }
                }
            }
        },
        repPicker(index : number, set : IRepetition){
            (this as any).emitter.emit('picker', {
                number : set.repetitions, 
                unit : "reps", 
                steps : 1
            });
            (this as any).emitter.on('picker-completed', (data : any) => {
                this.onCompleteReps(data, index);
                (this as any).emitter.off('picker-completed');
            });
        },
        weightPicker(index : number, set : IRepetition){
            (this as any).emitter.emit('picker', {
                number : set.weight, 
                unit : "kg",
                steps : 2.5
            });
            (this as any).emitter.on('picker-completed', (data : any) => {
                this.onCompleteWeight(data, index);
                (this as any).emitter.off('picker-completed');
            });
        },
        handleOption(item : any){
            /*
                Handle the option clicked in the HoverMenu component.
            */
            if (this.exercise != undefined) {
                switch(item) {
                    case this.hovMen[0]:
                        this.contracted = true;
                        this.$emit("skipped", {exerciseId : this.exercise.id });
                        break;
                }
            }
        },
        checkAllApproved() {
            if (this.exercise != undefined) {
                let allApproved = true;
                for (let i = 0; i < this.exercise.set.length - 1; i++) {
                    if (this.exercise.set[i].completed != true) {
                        allApproved = false ;
                        break;
                    }
                }
                return allApproved;
            }
        },
        onCompleteWeight(data : number, index : number) {
            if (this.exercise != undefined) {
                let set = this.exercise.set[index];
                set.weight = data;
                this.$emit('change-set', {
                    newSet : set,
                    index : index,
                    exerciseId : this.exercise.id
                });
            }
        },
        onCompleteReps(data : number, index : number) {
            if (this.exercise != undefined) {
                let set = this.exercise.set[index];
                set.repetitions = data;
                this.$emit('change-set', {
                    newSet : set,
                    index : index,
                    exerciseId : this.exercise.id
                });
            }
        }
    },
    updated() {
        this.contracted = !this.expand;
        let allApp : boolean | undefined  = this.checkAllApproved();
        if ( allApp != undefined) {
            this.allApproved = allApp;
        }
    },
    mounted() {

    }
});
</script>



<style scoped lang="scss">
@import "../assets/variables.scss";

.workout-card {
    @include workout-card
}


.flex-container {
    display: flex;
    position: relative;
    flex-direction: row;  
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;

    h3 {
        font-weight: 700; 
        text-align: left;
        font-size: 1.3rem;
    }

    #title:hover {
        cursor: pointer;
    }


    .icon-container {
        width: 2rem;
    }

    .dots {
        color: lighten($text-color, 30%);

        &:hover {
            color: $text-color; 
            cursor: pointer;
        }
    }
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
            color: white;
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
    background-color: lighten( $accent-color , 40%);
}


</style>
