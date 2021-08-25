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
                        <h2 id="title">{{ workout.title }}</h2>
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
                        <p class="description" data-test="description-paragraph"> 
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
                <div class="divder"></div>
                <NewExercise
                    v-on:add-exercise="addExercise"
                />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { inject, defineComponent} from 'vue';

import ExerciseItem from "./ExerciseItem.vue";
import HoverMenu from "./HoverMenu/HoverMenu.vue";
import InputField from "./input_field/InputField.vue";
import NewExercise from "./NewExercise.vue";

import { IWorkout } from '../types';

export default defineComponent ({
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
            type: Object as () => IWorkout,
            required: true
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
            displayHover: false
        };
    },
    methods : {
        /*
            Split the exercises contained in the workouts, and present them as a
            summary.
        */
        nameWithComma(index : number) : string {
            if (index !== this.workout.exerciseList.slice(0,3).length - 1) {
                return `${this.workout.exerciseList[index].name}, `;
            } else {
                return this.workout.exerciseList[index].name;
            }
        },
        expand_card() {
            /*
                Expand the workout card.
            */
            if (this.contracted) {
                this.contracted = false;
            } else {
                this.contracted = true;
            }
        },
        handleOption(item : string){
            /*
                Handle the option clicked in the HoverMenu component.
            */
            const emitter : any = inject("emitter"); // Inject `emitter`
            switch(item) {
                case "Delete workout":
                    emitter.emit('delete-workout', this.workout._id);
                    break;
            }
        },
        submitEdit(title : string) {
            /*
                Submit upon ending the editing of the title of the workout.
            */
            const emitter : any = inject("emitter"); // Inject `emitter`
            emitter.emit('title-change', { workoutId : this.workout._id, title : title});
        },
        editEnd(){
            /*
                End of edit
            */
            let title_element = this.$el.querySelector("#title");
            title_element.style.display = "block";
        },
        newRepetition(data : any ){
            /*
                @data contains the exerciseId of where to add a repetition
            */
            const emitter : any = inject("emitter"); // Inject `emitter`
            data.workoutId = this.workout._id;
            emitter.emit('new-repetition', data);
        },
        changeRep(data : any) {
            const emitter : any = inject("emitter"); // Inject `emitter`
            emitter.emit('completed-rep-edit', 
                {
                    repItem : data.repItem, 
                    exerciseId: data.exerciseId,
                    workoutId: this.workout._id
                }
            );
        },
        changeExerciseName(data : any) {
            /*
                Change the name of an exercise
            */
            const emitter : any = inject("emitter"); // Inject `emitter`
            data.workoutId = this.workout._id;
            emitter.emit('exercise-name-change', data);
        },
        deleteExercise(data : any) {
            /*
                Delete and exercise from the workout
            */
            const emitter : any = inject("emitter"); // Inject `emitter`
            data.workoutId = this.workout._id;
            emitter.emit('delete-exercise', data);
        },
        deleteRep(data : any) {
            /*
                Delete a repetition of a an exercise of a workout.
                @data contains the id of the exercise being deleted.
            */
            const emitter : any = inject("emitter"); // Inject `emitter`
            data.workoutId = this.workout._id;
            emitter.emit('delete-rep', data);
        },
        addExercise() {
            /*
                @data contains the id of the exercise being added.
            */
            const emitter : any = inject("emitter"); // Inject `emitter`
            emitter.emit('add-exercise', {workoutId : this.workout._id} );
        }
    },
    created() {
        // Contract the workout, then the background has been pressed.
        const emitter : any = inject("emitter"); // Inject `emitter`
        emitter.on('pressed-background', () => {
            this.contracted = true;
        });
    }
});
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';

.workout-item {
  @include workout-card;
  position: relative;
  overflow: visible;

  .flex-container {
    display: flex;
    position: relative;
    flex-direction: row;  
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;

    h2 {
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

.divder {
  @include divider;
  margin-bottom: 0.6rem;
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
