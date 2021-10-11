<template>
    <div>
        <h1>Hej, {{ getFirstName }} </h1>
        <div class="accent-divider"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from '../../node_modules/vuex'

export default defineComponent({
  name: 'HelloHeader',
  props: ['header'],
  computed: {
    ...mapGetters('workoutView', [
      'getFirstName'
    ])
  }
})

</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';

  h1 {
      @include header;
  }

  .accent-divider {
    margin-top: 0.3rem;
    width: 10rem;
    height: 0.5rem;
    background: $accent-color;
  }

</style>
