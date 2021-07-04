<template> 
    <span v-show="showWeight"> 
        {{ repItem.weight }} kg x
    </span>
    <span class="item">
        {{ repItem.repetitions }}
    </span> 
</template>

<script>

export default {
  name: "Repetition",
  props: ["repetition"],
  data () {
    return {
      showWeight: false,
      alignment: 'left',
      repItem: ''
    }
  }, 
  created() {
    if (this.repetition.weight) {
      this.showWeight = true;
    }
    if (!this.showWeight) {
      this.alignment = 'right'
    }
    this.repItem = this.repetition
  },
  methods: {
    check (e) {
      console.log(e)
      if (this.repItem.weight > 100) {
        e.originalTarget.style.color = 'red'
      }
      if ( this.repItem.weight < 100) {
        e.originalTarget.style.color = 'black'
      }
      console.log(this.repItem.weight)
    },
    printWeight() {
      console.log(this.repItem.weight)
    }
  }
}

  
</script>


<style lang="scss" scoped>
@import '../assets/variables.scss';

@media only screen and (max-width: 1350px) {
  .item-header{
  }
  .item-content{
    
  }
}
@media only screen and (max-width: 600px) {
  .todo-block {
   width: 95%;
  }
}
  
</style>


