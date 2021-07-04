<template>
  <div class="workout-item" @click="expand_card">
    <div class="flex-container">
        <h3>{{ workout.title }}</h3>
        <fa class="dots" id="dots" icon="ellipsis-v" 
            @click="toggleMenu"></fa>
        <HoverMenu 
            :menuItems=hovMen 
            :display=displayHover  
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
  components: {
    ExerciseItem,
    HoverMenu
  },
  data () {
    return {
        contracted: true,
        hovMen: ["this", "is", "great"],
        displayHover: false,
    }
  },
  methods : {
      toggleMenu(e) {
            if(this.displayHover) {
                this.displayHover = false
            } else {
                this.displayHover = true
            }
            e.stopPropagation();
      },
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
    }, ret_Date(dateString) {
      let dat = new Date(0)
      dat.setTime(dateString)
      const options = { weekday: 'long', year : 'numeric', month: 'long', day: 'numeric'}
      return dat.toLocaleDateString('en-UK', options)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';

.workout-item {
  @include workout-card;

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
