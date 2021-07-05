<template>
  <div class="workout-item" @click.stop="expand_card">
    <div v-bind:class="{ outside : displayHover }"  @click.stop="displayHover = false"></div>
    <div class="flex-container">
        <h3 id="title">{{ workout.title }}</h3>
        <div class="title-editor" id="titleEditor">
            <input ref="titleInput" class="title-input" type="text">
            <span class="icon" @click.stop="acceptEdit"><fa class="" icon="check" ></fa></span>
            <span class="icon" @click.stop ="stopEditing"><fa class="cross" icon="plus" ></fa></span>
        </div>
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
        <div v-bind:key="exercise" v-for="exercise in workout.exerciseList">
          <ExerciseItem v-bind:exerciseItem="exercise"/> 
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ExerciseItem from "./ExerciseItem"
import HoverMenu from "./HoverMenu/HoverMenu.vue"

export default {
    name: "Workout",
    props: ["workout"],
    emits: ["title-change", 'delete-workout'],
    components: {
        ExerciseItem,
        HoverMenu
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
        },
        renameTitle(){
            if (!this.editingTitle) {
                let title_element = this.$el.querySelector("#title")
                title_element.style.display = "none"
                let title_editor = this.$el.querySelector("#titleEditor")
                title_editor.style.display = "flex"
                this.editingTitle = true
                this.displayHover = false
                this.$refs.titleInput.focus()
            }
            console.log("State of editingTtle " + this.editingTitle)
        },
        stopEditing() {
            let title_element = this.$el.querySelector("#title")
            title_element.style.display = "block"
            let title_editor = this.$el.querySelector("#titleEditor")
            title_editor.style.display = "none"
            this.editingTitle = false
        },
        acceptEdit(){
                const editValue = this.$refs.titleInput.value
                console.log("Edit value " + editValue)
                this.$emit('title-change', this.workout._id, editValue)
                this.stopEditing();
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
        }
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

.title-editor {
    display: none;
    align-items: center;
    width: 80%;

    .title-input {
        font-weight: 700;
        font-size: 1.3rem;
        border: none;
        width: 80%;
    }

    .cross {
        transform: rotate(45deg);
    }

}

.icon {
    display: inline-block;
    width: 2.5rem;
    transform: scale(1.2);
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
