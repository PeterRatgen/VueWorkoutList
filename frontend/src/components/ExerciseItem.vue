<template> 
    <div class="divder"></div>
    <div class="name" @mouseover="displayEdit" @mouseleave="isHover = false" @click.stop="expand_card">
        <transition name="fade" mode="out-in">
            <div class="description" v-if="contracted">
                <!--
                    The ExerciseItem is contracted.
                -->
                <div class="item-header">
                    <h4 class="clickable-header"> {{ exerciseItem.name }}</h4>    
                    <span>  
                        <span class="icon-container" @click.stop="deleteExercise" >
                            <fa 
                                class="edit-icon" v-bind:class="{ editiconactive : isHover }" 
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
                        :fontSize="'1rem'"
                        :fontWeight="'700'"
                        :initialValue="exerciseItem.name"
                        v-on:result="titleSubmitEdit"
                        @click.stop
                    />
                    <span>  
                        <span class="icon-container" @click.stop="deleteExercise" >
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
                            v-bind:delMode="editing"
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

<script>
import Repetition from './Repetition'
import InputField from "./input_field/InputField";
import NewRepetition from "./repetitions/NewRepetition"

export default {
    /*
        Displays an exercise, and its repetitions.
    */
    name: "ExerciseItem",
    props: {
        ["exerciseItem"] : Object, 
        ["edit"] : Boolean,
    },
    emits: {
        ['new-repetition'] : null,
        //On completion of the edting of a repetion
        ['completed-rep-edit'] : null,
        //On completion on the editing of an exercise name
        ['exercise-name'] : null, 
        ['delete-exercise'] : null,
        ['delete-rep'] : null
    },
    components: {
        Repetition,
        InputField,
        NewRepetition
    },
    data () {
        return {
            ex: '',
            showWeight: false,
            contracted: true,
            editing: false,
            isHover : false
        }
    }, 
    methods : {
        expand_card() {
            /*
                Expands the card of the ExerciseItem
            */
            if (this.contracted) {
                this.contracted = false
            } else {
                this.contracted = true
            }
            this.emitter.emit('pressed-exerciseItem')
        },
        titleSubmitEdit(result) {
            /*
                Submit the new title of a workout.
            */
            this.$emit('exercise-name', { exerciseId :  this.exerciseItem.id, name : result })
        },
        repChange(repItem) {
            console.log("change some rep of ex: " + this.exerciseItem.id)
            this.$emit('completed-rep-edit', repItem, this.exerciseItem.id)             
        },
        newRepetition() {
            this.$emit('new-repetition', this.exerciseItem.id)
        }, 
        displayEdit() {
            this.isHover = true;        
        },
        editName() {
            this.editing = true;
        },
        deleteExercise() {
            this.$emit('delete-exercise', {exerciseId : this.exerciseItem.id}) 
        },
        deleteRep(id) {
            this.$emit('delete-rep', { repId: id , exerciseId: this.exerciseItem.id })
        },
        saveEdit() {
            this.editing = false

        }
    },
    created() {
        this.ex = this.exerciseItem;
        this.editing = this.edit;
    },
    mounted() {
    }
}
  

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
  margin: 0.5rem 0.5rem;
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


