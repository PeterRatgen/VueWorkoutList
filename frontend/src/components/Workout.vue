<template>
  <div class="workout-item" @click.stop="expand_card">
    <div v-bind:class="{ outside : displayHover }"  @click.stop="displayHover = false"></div>
    <div class="flex-container">
        <h3 id="title">{{ workout.title }}</h3>
        <InputField 
            :startEdit="editingTitle"   
            :fontSize="'1.3rem'"
            :fontWeight="'700'"
            v-on:result="submitEdit"
            v-on:stop-edit="editEnd"
        />
        <fa class="dots" icon="ellipsis-v" 
            @click.stop="displayHover = true"></fa>
        <HoverMenu 
            :menuItems=hovMen 
            :display=displayHover  
            @option="handleOption"
            @click.prevent
        />
    </div>
    <transition name="fade" mode="out-in">
      <div class="description" v-if="contracted">
        <p class="exercise-desc" v-bind:key="index" v-for="(exercise, index) in workout.exerciseList.slice(0,3)">
        {{ nameWithComma(index) }}
        </p>
      </div>
      <div v-else class="description-expand">
        <div v-bind:key="exercise" v-for="(exercise, index) in workout.exerciseList">
          <ExerciseItem 
            :exerciseItem="exercise"
            :index="index"
            v-on:new-repetition="newRepetition"
            v-on:completed-rep-edit="changeRep"
            v-on:exercise-name="changeExerciseName"
            v-on:delete-exercise="deleteExercise"
        /> 
        </div>
        <NewExercise
            v-on:add-item="this.emitter.emit('add-item', this.workout._id)"
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
    name: "Workout",
    props: ["workout"],
    emits: ["title-change", 'delete-workout'],
    components: {
        ExerciseItem,
        HoverMenu,
        InputField,
        NewExercise
    },
    data () {
    return {
        contracted: true,
        hovMen: ["Change title", "Delete workout"],
        displayHover: false,
        editingTitle : false
    }
    },
    methods : {
        nameWithComma(index) {
            if (index !== this.workout.exerciseList.slice(0,3).length - 1) {
                return `${this.workout.exerciseList[index].name}, `
            } else{
                return this.workout.exerciseList[index].name
            }
        },
        expand_card() {
            if (this.contracted) {
                this.contracted = false
            } else {
                this.contracted = true
            }
            this.emitter.emit('pressed-workout')
        },
        renameTitle(){
            if (!this.editingTitle) {
                let title_element = this.$el.querySelector("#title")
                title_element.style.display = "none"
                this.editingTitle = true
                this.displayHover = false
            }
        },
        handleOption(item){
            switch(item) {
                case "Change title":
                    this.renameTitle()        
                    break;
                case "Delete workout":
                    this.$emit('delete-workout', this.workout._id)
                    break;
            }
        },
        submitEdit(result) {
            this.$emit('title-change', this.workout._id, result)
        },
        editEnd(){
            let title_element = this.$el.querySelector("#title")
            title_element.style.display = "block"
        },
        newRepetition(index){
            this.emitter.emit('new-repetition', {index : index, id : this.workout._id}) 
        },
        changeRep(repItem, repIndex, exerciseIndex) {
            this.emitter.emit('completed-rep-edit', 
                {
                    repItem : repItem, 
                    repIndex : repIndex,
                    exerciseIndex: exerciseIndex,
                    workoutId: this.workout._id
                }
            )
        },
        changeExerciseName(data) {
            data.workoutId = this.workout._id
            this.emitter.emit('exercise-name-change', data)
        },
        deleteExercise(data) {
            data.workoutId = this.workout._id
            this.emitter.emit('delete-exercise', data)
        }
    },
    created() {
        this.emitter.on('pressed-background', () => {
            this.contracted = true;
        })
        this.emitter.on('')
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
    
    .dots {
        color: lighten($text-color, 30%);

        &:hover {
            color: $text-color; 
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
