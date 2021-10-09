<template>
    <div class="end-card" ref="endCard">
        <div class="end-card-content">
            <fa
                class="cross"
                icon="plus"
                @click="removeEndCard"
                ></fa>
            <div class="header">
                <h3>Træning afsluttet</h3>
            </div>
            <div v-for="stat in statArr" :key="stat.title">
                <div class="divder"></div>
                <div class="row">
                    <div class="content-cell title">{{ stat.title }} </div>
                    <div class="content-cell">{{ stat.value }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Stat } from '../types'

export default defineComponent({
  name: 'WorkoutResult',
  emits: {
    ended: null
  },
  data () {
    return {
      statArr: [] as Stat[]
    }
  },
  methods: {
    removeEndCard () {
      this.$emit('ended')
    },
    stats (data : {
      timeOfStart : number,
      timeOfEnd : number
    }) {
      (this.$refs.endCard as HTMLElement).style.display = 'block'
      const timeVal = data.timeOfEnd - data.timeOfStart
      let date = new Date(timeVal)
      const secs = date.getSeconds()
      let secPrint : string
      if (secs < 10) {
        secPrint = '0' + secs
      } else {
        secPrint = secs.toString()
      }

      const hours = date.getHours() - 1
      let print = ''
      if (hours < 1) {
        print = date.getMinutes() + ':' + secPrint
      } else {
        print = hours + ':' + date.getMinutes() + ':' + secPrint
      }

      this.statArr.push({
        title: 'Tid',
        value: print.toString()
      } as Stat)

      date = new Date(data.timeOfStart)
      this.statArr.push({
        title: 'Start',
        value: date.getHours() + ':' + date.getMinutes() +
                ':' + date.getSeconds()
      } as Stat)

      date = new Date(data.timeOfEnd)
      this.statArr.push({
        title: 'Slut',
        value: date.getHours() + ':' + date.getMinutes() +
                ':' + date.getSeconds()
      } as Stat)
    }
  }
})

</script>

<style lang="scss">
@import "../assets/variables.scss";

.end-card {
    @include workout-card;
    display: none;
    position: fixed;
    width: 95%;
    top: 30%;

    .end-card-content {
        position: relative;
        .header {
            margin-bottom: 1rem;
        }

        .cross {
            position: absolute;
            right: 0.5rem;
            top: 0rem;
            transform: rotate(45deg);
        }

        .row {
            width: 80%;
            margin: 0.25rem auto;
            padding: 0 10%;
            display: flex;
            justify-content: space-between;
            .content-cell {
                padding: 0.25rem 1.25rem;
                text-align: left;

                &.title{
                    font-weight: 700;
                }
            }
        }
    }
}

.divder {
  @include divider;
}

</style>
