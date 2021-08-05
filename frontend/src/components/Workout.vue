<template>
    <div class="workout-item" @click.stop="expand_card">
        <div v-bind:class="{ outside : displayHover }"  @click.stop="displayHover = false"></div>
            <transition name="fade" mode="out-in">
                <div v-if="contracted">
                    <!--
                        Here the workout is contracted, the title cannot be
                        edited.
                    -->
                    <div class="flex-container">
                        <h3 id="title">{{ workout.title }}</h3>
                            <span class="icon-container" @click.stop="displayHover = true">
                                <fa class="dots" icon="ellipsis-v"></fa>
                            </span>
                            <HoverMenu 
                                :menuItems=hovMen 
                                :display=displayHover  
                                @option="handleOption"
                                @click.stop
                            />
                        </div>
                        <p class="description "> 
                            <span v-bind:key="index" v-for="(exercise, index) in workout.exerciseList.slice(0,3)">
                                {{ nameWithComma(index) }}
                            </span>
                        </p>
                    </div>
                <div v-else >
                    <!---
                        The workout is expanded, we can edit the title, and the
                        exercies can be view and edited.
                    -->
                    <div class="flex-container">
                        <InputField 
                            :fontSize="'1.3rem'"
                            :fontWeight="'700'"
                            :initialValue="workout.title"
                            v-on:result="submitEdit"
                            @click.stop
                        />
                    <span class="icon-container" @click.stop="displayHover = true">
                        <fa class="dots" icon="ellipsis-v"></fa>
                    </span>
                    <HoverMenu 
                        :menuItems=hovMen 
                        :display=displayHover  
                        @option="handleOption"
                        @click.prevent
                    />
                </div>
                <div v-bind:key="exercise" v-for="exercise in workout.exerciseList">
                    <!--
                        List all the exercises contained in the workout.
                    -->
                    <ExerciseItem 
                        :exerciseItem="exercise"
                        v-on:new-repetition="newRepetition"
                        v-on:completed-rep-edit="changeRep"
                        v-on:exercise-name="changeExerciseName"
                        v-on:delete-exercise="deleteExercise"
                        v-on:delete-rep="deleteRep"
                    /> 
                </div>
                <NewExercise
                    v-on:add-exercise="addExercise"
                />
            </div>
        </transition>
    </div>
</template>

<script>
import ExerciseItem from "./ExerciseItem"
import HoverMenu from "./HoverMenu/HoverMenu.vue"
import InputField from "./input_field/InputField.vue";
import NewExercise from "./NewExercise.vue"

export default {
    /**
        Display a single workout. Provides functionality for modifying the
        existing workout, though the child components.
    */
    name: "Workout",
    props: {
        /*
            The workout to be displayed in this component
        */
        ["workout"] : {
            type: Object,
            required: true,
            validator: function(value) {
                return ( typeof(value._id) == "string" &&
                typeof(value.title) == "string" &&
                typeof(value.exerciseList ) == "object"
                ) === true
            }
        }
    },
    components: {
        ExerciseItem,
        HoverMenu,
        InputField,
        NewExercise
    },
    data () {
        return {
            contracted: true,
            /*
                The items in the hovermenu
            */
            hovMen: ["Change title", "Delete workout"],
            /*
                Is the dots menu hovering right now?
            */
            displayHover: false,
            editingTitle : false
        }
    },
    methods : {
        /*
            Split the exercises contained in the workouts, and present them as a
            summary.
        */
        nameWithComma(index) {
            if (index !== this.workout.exerciseList.slice(0,3).length - 1) {
                return `${this.workout.exerciseList[index].name}, `
            } else{
                return this.workout.exerciseList[index].name
            }
        },
        expand_card() {
            /*
                Expand the workout card.
            */
            if (this.contracted) {
                this.contracted = false
            } else {
                this.contracted = true
            }
        },
        renameTitle(){
            /*
                Rename the title of the workout.
            */
            if (!this.editingTitle) {
                let title_element = this.$el.querySelector("#title")
                title_element.style.display = "none"
                this.editingTitle = true
                this.displayHover = false
            }
        },
        handleOption(item){
            /*
                Handle the option clicked in the HoverMenu component.
            */
            switch(item) {
                case "Change title":
                    this.renameTitle()        
                    break;
                case "Delete workout":
                    this.emitter.emit('delete-workout', this.workout._id)
                    break;
            }
        },
        submitEdit(title) {
            /*
                Submit upon ending the editing of the title of the workout.
            */
            this.emitter.emit('title-change', { workoutId : this.workout._id, title : title})
            if (this.editingTitle) {
                let title_element = this.$el.querySelector("#title")
                title_element.style.display = "block"
                this.editingTitle = false
            }
        },
        editEnd(){
            /*
                End of edit
            */
            let title_element = this.$el.querySelector("#title")
            title_element.style.display = "block"
        },
        newRepetition(data){
            /*
                @data contains the exerciseId of where to add a repetition
            */
            data.workoutId = this.workout._id
            this.emitter.emit('new-repetition', data) 
        },
        changeRep(repItem, exerciseId) {
            this.emitter.emit('completed-rep-edit', 
                {
                    repItem : repItem, 
                    exerciseId: exerciseId,
                    workoutId: this.workout._id
                }
            )
        },
        changeExerciseName(data) {
            /*
                Change the name of an exercise
            */
            data.workoutId = this.workout._id
            this.emitter.emit('exercise-name-change', data)
        },
        deleteExercise(data) {
            /*
                Delete and exercise from the workout
            */
            data.workoutId = this.workout._id
            this.emitter.emit('delete-exercise', data)
        },
        deleteRep(data) {
            /*
                Delete a repetition of a an exercise of a workout.
                @data contains the id of the exercise being deleted.
            */
            data.workoutId = this.workout._id
            this.emitter.emit('delete-rep', data)
        },
        addExercise() {
            /*
                @data contains the id of the exercise being added.
            */
            this.emitter.emit('add-exercise', {workoutId : this.workout._id} )
        }
    },
    created() {
        // Contract the workout, then the background has been pressed.
        this.emitter.on('pressed-background', () => {
            this.contracted = true;
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';

.workout-item {
  @include workout-card;
  position: relative;
  overflow: visible;

  .flex-container {
    display: flex;
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

  .description {
    text-align: left;
    margin-top: 0.5rem;
    font-size: 0.8rem;

    .exercise-desc {
      text-align: left;
      display: inline;
    }
  }
}


.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
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

@media only screen and (max-width: 600px) {
  .workout-item {
    border-radius: 6px;
  }
}

</style>
