<template>
  <div class="add-card">  
    <font-awesome-icon class="icon" icon="plus" size="2x" fixed-width/>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
  import { library } from "@fortawesome/fontawesome-svg-core";
  import { faPlus } from "@fortawesome/free-solid-svg-icons";

  Vue.component('font-awesome-icon', FontAwesomeIcon)
  library.add(faPlus);


export default {
  name: "AddTodo",
  data() {
    return {
      title: ''
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';

  .add-card {
    @include workout-card;
    background-color: rgba(0,0,0, 0.02);
    border: 4px solid rgba(200,200,200, 0.5);
  }

  .icon {
    color: $accent-color;
  }

</style>
