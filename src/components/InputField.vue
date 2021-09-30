<template>
    <div class="title-editor" id="titleEditor">
        <input ref="titleInput" class="header-input" @blur="acceptEdit" type="text">
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputField',
  props: ['fontSize', 'fontWeight', 'initialValue', 'visibility'],
  emits: ['result'],
  methods: {
    acceptEdit () {
      const editValue = this.$refs.titleInput.value
      this.$emit('result', editValue)
    }
  },
  mounted () {
    const titleInput = this.$refs.titleInput
    titleInput.style.fontSize = this.fontSize
    titleInput.style.fontWeight = this.fontWeight
    titleInput.value = this.initialValue
  }
})
</script>

<style lang="scss">
@import '../assets/variables.scss';

.title-editor {
    display: inline;

    .header-input {
        font-weight: 700;
        text-align: left;
        font-size: 1.3rem;
        background-color: #fff;
        color: $text-color;
        border: none;
        outline: none;
        width: 100%;
        @include input-field;
    }
}

</style>
