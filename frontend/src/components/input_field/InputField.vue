<template>
    <div class="title-editor" id="titleEditor">
        <input ref="titleInput" class="header-input" @blur="acceptEdit" type="text">
    </div>
</template>



<script>
import { defineComponent } from 'vue';
 
export default defineComponent ({
    name : 'InputField',
    props: ['fontSize', 'fontWeight', 'initialValue', 'visibility'],
    emits: ['result'],
    methods: {
        acceptEdit(){
            const editValue = this.$refs.titleInput.value;
            this.$emit('result', editValue);
        },
    },
    mounted() {
        let title_input = this.$refs.titleInput;
        title_input.style.fontSize = this.fontSize;
        title_input.style.fontWeight = this.fontWeight;
        title_input.value = this.initialValue;
    },
    updated() {
    }
});
</script>


<style lang="scss">
@import '../../assets/variables.scss';

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
