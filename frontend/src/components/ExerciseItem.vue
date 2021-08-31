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
                                @click.stop="deleteExercise" 
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
                            @click.stop="deleteExercise" 
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
import InputField from "./input_field/InputField.vue";
import NewRepetition from "./repetitions/NewRepetition.vue";

import { IExercise, IRepetition } from '../types';

export default defineComponent({
    /*
        Displays an exercise, and its repetitions.
    */
    name: "ExerciseItem",
    props: {
        ["exerciseItem"] : Object as () => IExercise, 
        ["edit"] : Boolean,
    },
    emits: {
        ['new-repetition'] : (data : { exerciseId : string }) => {
            if (data.exerciseId.length > 0 ) {
                return true;
            } else {
                console.error("The exerciseId was not of correct length.");
                return false;
            }
        },
        //On completion of the edting of a repetion
        ['completed-rep-edit'] : (data : {
            exerciseId : string,
            repItem : IRepetition}) => { 
            if(data.exerciseId != ''){
                return true;
            }
        },
        //On completion on the editing of an exercise name
        ['exercise-name'] : (data : {
            exerciseId : string,
            name : string}) => {
            if (data.name != '' && data.exerciseId != ''){
                return true;
            }
        },
        ['delete-exercise'] : (data : {
            exerciseId : string}) => {
            if(data.exerciseId != ''){
                return true;
            }
        }
        ,
        ['delete-rep'] : (data: {
            exerciseId : string,
            repId: string}) => {
            if(data.exerciseId != '' && data.repId != ''){
                return true;
            }
        }
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
        titleSubmitEdit(result : string) {
            /*
                Submit the new title of a workout.
            */
            if (this.exerciseItem != undefined) {
                this.$emit('exercise-name', { 
                    exerciseId : this.exerciseItem.id, 
                    name : result 
                    }
                );
            }
        },
        repChange(data : any ) {
            if (this.exerciseItem != undefined) {
                data.exerciseId = this.exerciseItem.id;
                this.$emit('completed-rep-edit', data);
            }
        },
        newRepetition() {
            if (this.exerciseItem != undefined) {
                this.$emit('new-repetition', {exerciseId : this.exerciseItem.id});
            }
        }, 
        displayEdit() {
            this.isHover = true;        
        },
        deleteExercise() {
            if (this.exerciseItem != undefined) {
                this.$emit('delete-exercise', {exerciseId : this.exerciseItem.id});
            }
        },
        deleteRep(data : any) {
            if (this.exerciseItem != undefined) {
                this.$emit('delete-rep', { repId: data.repId , exerciseId: this.exerciseItem.id });
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


