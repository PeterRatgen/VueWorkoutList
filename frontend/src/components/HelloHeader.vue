<template>
  <div>
    <h1>Hej, {{ header.split(" ")[0] }} </h1>
    <div class="accent-divider"></div>
  </div>
</template>


<script>
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'HelloHeader',
  props : ["header"],
  data () {
    return {
      headerName: ''
    };
  },
  update () {
  }
});

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
