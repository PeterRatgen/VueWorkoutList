<template>
    <div class="rep-container"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
    >
        <div @click.stop="repetition_click()" data-test="repetition-clicker">
            <transition name="fade" mode="out-in">
            <div v-if="editing">
                <div class="item" data-test="expanded-weight" @wheel.prevent="scrolledWeight" >
                    <span class="icon-container" data-test="weight-minus" @click.stop="dec('weight')">
                        <fa class="icon" icon="minus"  ></fa>
                    </span>
                    <p  > <span data-test="weight-count" > {{ repItem.weight }} </span> kg </p>
                    <span class="icon-container" data-test="weight-plus"  @click.stop="inc('weight')">
                        <fa class="icon" icon="plus"  ></fa>
                    </span>
                </div>
                <div class="item" @wheel.prevent="scrolledReps">
                    <span class="icon-container" data-test="rep-minus" @click.stop="dec('reps')">
                        <fa class="icon" icon="minus" ></fa>
                    </span>
                    <p>
                        <span data-test="rep-count"> {{ repItem.repetitions }} </span>
                        reps
                    </p>
                    <span class="icon-container" data-test="rep-plus" @click.stop="inc('reps')">
                        <fa class="icon" icon="plus" ></fa>
                    </span>
                </div>

            </div>
            <div v-else>
                <span v-if="repItem.weight > 0"  >
                    <p data-test="no-edit-weight">{{ repItem.weight }} kg x {{ repItem.repetitions }}</p>
                </span>
                <span v-else  >
                    <p data-test="no-edit-rep" >{{ repItem.repetitions }} reps</p>
                </span>
            </div>
            </transition>
        </div>
        <div class="trash-container"
                v-if="isHover"
                @click="delRep"
            >
            <fa
                class="trash-rep"
                icon="trash-alt" >
            </fa>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IRepetition } from '../types'

import { mapActions } from '../../node_modules/vuex'

export default defineComponent({
  name: 'Repetition',
  props: {
    repetition: {
      type: Object as () => IRepetition
    },
    workoutId: {
      type: String
    },
    exerciseId: {
      type: String
    }
  },
  inject: ['emitter'],
  data () {
    return {
      showWeight: false,
      alignment: 'left',
      repItem: {} as IRepetition,
      editing: false,
      isHover: false
    }
  },
  created () : void {
    if (this.repetition != undefined) {
      if (this.repetition.weight) {
        this.showWeight = true
      }
      if (!this.showWeight) {
        this.alignment = 'right'
      }
      this.repItem = this.repetition;

      (this as any).emitter.on('pressed-repetition', () => {
        this.editing = false
      })
    }
  },
  methods: {
    ...mapActions([
      'changeRep',
      'deleteRep'
    ]),
    delRep () {
      /**
                Deleting a rep.
            */
      if (this.repItem.id != undefined) {
        this.deleteRep(
          {
            workoutId: this.workoutId,
            exerciseId: this.exerciseId,
            repId: this.repItem.id
          })
      }
    },
    inc (target : string) {
      /**
                Increment the weight or reps.
            */
      switch (target) {
        case 'weight':
          this.repItem.weight = this.repItem.weight + 2.5
          break
        case 'reps':
          this.repItem.repetitions = this.repItem.repetitions + 1
          break
      }
    },
    dec (target : string) {
      /**
                Decrement the weight or rep.
            */
      switch (target) {
        case 'weight':
          if (this.repItem.weight != 0) {
            this.repItem.weight = this.repItem.weight - 2.5
          }
          break
        case 'reps':
          if (this.repItem.repetitions != 0) {
            this.repItem.repetitions = this.repItem.repetitions - 1
          }
          break
      }
    },
    repetition_click () {
      /**
                What happens when a repetition is clicked.
            */
      const oldEdit = this.editing
      this.editing = !this.editing;
      (this as any).emitter.emit('pressed-repetition')
      if (oldEdit == false) {
        this.editing = true
      } else {
        this.editing = false
        this.changeRep({
          workoutId: this.workoutId,
          exerciseId: this.exerciseId,
          repItem: this.repItem
        })
      }
    },
    scrolledReps (event : any) {
      /**
                Scroll on reps.
            */
      if (event.deltaY < 0) {
        this.inc('reps')
      } else {
        this.dec('reps')
      }
    },
    scrolledWeight (event : any) {
      /**
                Scroll on weight.
            */
      if (event.deltaY < 0) {
        this.inc('weight')
      } else {
        this.dec('weight')
      }
    }
  }
})

</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';

.item {
    display: flex;
    margin: auto;
    width: 95%;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
}

.icon {
    color: lighten($text-color, 5%);
}

.icon-container {
    display: flex;
    width: 1.75rem;
    height: 2rem;
    justify-content: center;
    align-items: center;
}

.rep-container {
    width: 100%;
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

.trash-container {
    display: inline;
    position: absolute;
    right: -8px;
    top: -8px;
    color: $delete-color;
    background-color: white;
    width: 1.6rem;
    height: 1.6rem;
    border: 1px solid $divider-color;
    border-radius: 50px;
}

.trash-rep {
    font-size: 0.8rem;
}

@media only screen and (max-width: 1350px) {

}

@media only screen and (max-width: 600px) {
  .todo-block {
   width: 95%;
  }
}

</style>
