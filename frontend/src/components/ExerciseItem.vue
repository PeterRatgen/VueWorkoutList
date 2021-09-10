<template> 
    <div class="divder"></div>
    <div class="name" 
        @mouseover="displayEdit" 
        @mouseleave="isHover = false"
        @click.stop="contracted = !contracted"
    >
        <transition name="fade" mode="out-in">
            <div class="description" v-if="contracted">
                <!--
                    The ExerciseItem is contracted.
                -->
                <div class="item-header">
                    <h4 class="clickable-header"> {{ exerciseItem.name }}</h4>    
                    <span test-data="set-counter" >  
                            <span 
                                class="icon-container"  
                                @click.stop="delExercise" 
                                v-if="isHover"
                            >
                                <fa 
                                    class="edit-icon" 
                                    icon="trash-alt" >
                                </fa> 
                            </span>
                            {{ exerciseItem.set.length }} sæt 
                    </span>
                </div>
            </div>
            <div v-else>
                <!--
                    The ExerciseItem is expanded.
                -->
                <div class="item-header">
                    <InputField
                        id="exerciseTitle"
                        :fontSize="'1rem'"
                        :fontWeight="'700'"
                        :initialValue="exerciseItem.name"
                        v-on:result="titleSubmitEdit"
                        @click.stop
                    />
                    <span test-data="set-counter" >  
                        <span 
                            class="icon-container" 
                            @click.stop="delExercise" 
                            v-if="isHover"
                        >
                            <fa 
                                class="edit-icon" v-bind:class="{ editiconactive : isHover }" 
                                icon="trash-alt" >
                            </fa> 
                        </span>
                        {{ exerciseItem.set.length }} sæt 
                    </span>
                </div>
                <div class="repetition-container">
                    <!--
                        In here all the repetitions are displayed
                    -->
                    <div class="repetition" @click.stop v-for="(rep, index) in exerciseItem.set" v-bind:key="rep">
                        <Repetition  
                            :workoutId="workoutId"
                            :exerciseId="exercise.id"
                            v-bind:repetition="rep"
                            v-bind:index="index"
                            v-on:delete-rep="deleteRep"
                            v-on:completed-rep-edit="repChange"
                        />
                    </div>
                    <div class="repetition add-repetition"> 
                        <NewRepetition
                            v-on:new-repetition="newRepetition"
                        />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Repetition from './Repetition.vue';
import InputField from "./InputField.vue";
import NewRepetition from "./repetitions/NewRepetition.vue";

import { IExercise } from '../types';
import { mapActions }  from '../../node_modules/vuex';

export default defineComponent({
    /*
        Displays an exercise, and its repetitions.
    */
    name: "ExerciseItem",
    props: {
        ["workoutId"] : String,
        ["exerciseItem"] : Object as () => IExercise, 
        ["edit"] : Boolean,
    },
    components: {
        Repetition,
        InputField,
        NewRepetition
    },
    data () {
        return {
            showWeight: false,
            contracted: true,
            isHover : false
        };
    }, 
    methods : {
        ...mapActions([
            'changeExerciseName',
            'deleteExercise'
        ]),
        titleSubmitEdit(result : string) {
            /*
                Submit the new title of a workout.
            */
            if (this.exerciseItem != undefined) {
                this.changeExerciseName({
                    exerciseId : this.exerciseItem.id, 
                    name : result 
                    }
                );
            }
        },
        displayEdit() {
            this.isHover = true;        
        },
        delExercise() {
            if (this.exerciseItem != undefined) {
                this.deleteExercise({exerciseId : this.exerciseItem.id});
            }
        },
    },
    mounted() {
        if (this.exerciseItem != undefined) {
            if (this.exerciseItem.name === '') {
                this.contracted = false;
            }
        }
    }
});
  

</script>


<style lang="scss" scoped>
@import '../assets/variables.scss';

.repetition-container {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    padding: 0 15%
}

.repetition {
    display: flex;
    width: calc(33.3% - 0.3rem * 2);
    box-sizing: border-box;
    border: 1px solid darken($divider-color, 10%);
    border-radius: 4px;
    margin-top: 0.5rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    padding: 0.35rem;
    justify-content: center;
    align-items: center;
    height: fit-content;
    position: relative;
}

.trash-rep {
    display: none;
    position: relative;
    right: 50px;
    top: 20px;
    color: red;
}

.trashrepvisible {
    display: block;
    position: relative;
}

.add-repetition {
    padding: 0;
    border: none;
}

.item-header {
    display: flex;
    justify-content: space-between;
    white-space: nowrap;

    h4 {
        display: inline;
    }
}


.button {
    @include button;
    width: 5rem;
}

.clickable-header {
    font-size: 1rem;
    &:hover {
        cursor: pointer;
    }
}

.edit-icon {
    opacity: 0;
    color: $text-color;
    transition: all 0.2s linear;
    display: inline;

    &:hover {
        cursor: pointer;
    }

}

.editiconactive {
    opacity: 0.6;
    transition: all 0.2s linear;
}

.icon-container {
    margin: 0 0.5rem;
}

.divder {
  @include divider;
}

.name {
  margin: 0.6rem 0.5rem;
}

h4 {
  font-weight: 700;
  text-align: left;
}

.fade-enter-active {
  animation: move-list 0.2s linear;
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

@media only screen and (max-width: 600px) {
    .repetition-container {
        padding: 0;
    }

    .repetition {
        width: calc(50% - 0.3rem * 2)
    }
}
  
</style>


