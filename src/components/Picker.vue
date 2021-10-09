<template>
    <div class="picker" ref="picker">
        <div class="picker-container">
            <span class="icon-container" data-test="decrease" @click.stop="dec()">
                <fa class="icon" icon="minus"  ></fa>
            </span>
            <span data-test="data">{{ data }}</span> <span data-test="unit">{{ unit }}</span>
            <span class="icon-container" data-test="increase" @click.stop="inc()">
                <fa class="icon" icon="plus"  ></fa>
            </span>
        </div>
        <button class="button" @click="cancel()"><fa class="cross" icon="plus"></fa></button>
        <button class="button" @click="submit()"><fa icon="check"></fa></button>
    </div>
</template>

<script lang="ts">
import { inject, defineComponent } from 'vue'
import { mapActions } from '../../node_modules/vuex'

export default defineComponent({
  name: 'Picker',
  data () {
    return {
      data: 0,
      unit: '',
      steps: 1
    }
  },
  setup () {
    const emitter = inject('emitter')

    return {
      emitter
    }
  },
  methods: {
    ...mapActions([
      'setPickerData'
    ]),
    showPicker (data : {
      number: number,
      unit: string,
      steps: number
    }) {
      (this.$refs.picker as HTMLElement).style.display = 'block'
      this.data = data.number
      this.unit = data.unit
      this.steps = data.steps
    },
    cancel () {
      (this.$refs.picker as HTMLElement).style.display = 'none'
    },
    inc () {
      this.data = this.data + this.steps
    },
    dec () {
      this.data = this.data - this.steps
    },
    submit () {
      this.setPickerData( { tod: this.data} )
      (this.$refs.picker as HTMLElement).style.display = 'none'
    },
    ...mapActions([
      'setPickerData'
    ])
  }
})

</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";

.picker {
    @include workout-card;
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    left: 25%;
    width: 50%;
    display: none;

    .button {
        @include button;

        padding: 0.25rem 1rem;
        margin: 0.5rem;

        .cross {
            transform: rotate(45deg);
        }
    }

    .picker-container {
        display: flex;
        justify-content: space-between;

        margin: 1rem 0.25rem;

        .icon-container {
            display: inline;
            width: 1.75rem;
            justify-content: center;
            align-items: center;

            .icon {
                color: lighten($text-color, 5%);
            }
        }
    }
}

</style>
