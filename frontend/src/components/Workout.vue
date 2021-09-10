<template>
    <div class="workout-item"  @click.stop="contracted = !contracted">
        <div v-bind:class="{ outside : displayHover }"  @click.stop="displayHover = false"></div>
            <transition name="fade" mode="out-in">
                <div v-if="contracted">
                    <!--
                        Here the workout is contracted, the title cannot be
                        edited.
                    -->
                    <div class="flex-container">
                        <h2 id="title">{{ workout.title }}</h2>
                        <span class="icon-container" @click.stop="displayHover = !displayHover">
                            <fa class="dots" icon="ellipsis-v"></fa>
                        </span>
                        <span v-if="displayHover">
                            <HoverMenu 
                                :menuItems=hovMen 
                                @option="handleOption"
                                @click.stop
                            />
                        </span>
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
                    <span class="icon-container" @click.stop="displayHover = !displayHover">
                        <fa class="dots" icon="ellipsis-v"></fa>
                    </span>
                    <span v-if="displayHover">
                        <HoverMenu 
                            :menuItems=hovMen 
                            @option="handleOption"
                            @click.stop
                        />
                    </span>
                </div>
                <div v-bind:key="exercise" v-for="(index, exercise) in workout.exerciseList">
                    <!--
                        List all the exercises contained in the workout.
                    -->
                    <ExerciseItem 
                        :workoutId="workout._id"
                        :exerciseItem="exercise"
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
import { inject, defineComponent, mapActions} from 'vue';
import { mapActions }  from 'vuex';

import ExerciseItem from "./ExerciseItem.vue";
import HoverMenu from "./HoverMenu.vue";
import InputField from "./InputField.vue";
import NewExercise from "./NewExercise.vue";

import { IWorkout } from '../types';

export default defineComponent ({
    /**
        Display a single workout. Provides functionality for modifying the
        existing workout, though the child components.
    */
    name: "Workout",
    setup () {
        const emitter = inject('emitter');

        return {
            emitter
        };
    },
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
        ...mapActions([
            'titleChange',
            'deleteWorkout',
            'addRepetition'
        ]),
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
        handleOption(item : string){
            /*
                Handle the option clicked in the HoverMenu component.
            */
            switch(item) {
                case "Delete workout":
                    this.deleteWorkout({ workoutId : this.workout._id });
                    break;
            }
        },
        submitEdit(title : string) {
            /*
                Submit upon ending the editing of the title of the workout.
            */
            this.titleChange({ workoutId : this.workout._id, title : title});
        },
        editEnd(){
            /*
                End of edit
            */
            let title_element = this.$el.querySelector("#title");
            title_element.style.display = "block";
        },
        addExercise() {
            /*
                @data contains the id of the exercise being added.
            */
            this.addExercise( {workoutId : this.workout._id} );
        }
    },
    created() {
        // Contract the workout, then the background has been pressed.
        (this as any).emitter.on('pressed-background', () => {
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
