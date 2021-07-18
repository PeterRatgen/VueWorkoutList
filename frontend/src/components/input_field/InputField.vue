<template>
    <div class="title-editor" id="titleEditor">
        <input ref="titleInput" class="header-input" @blur="acceptEdit" type="text">
    </div>
</template>



<script>

export default {
    name : 'InputField',
    props: ["startEdit" , 'fontSize', 'fontWeight', 'initialValue', 'visibility'],
    emits: ['result'],
    methods: {
        acceptEdit(){
            const editValue = this.$refs.titleInput.value
            this.$emit('result', editValue)
        },
        startEditing(){
            this.display()
            this.$refs.titleInput.focus()
        },
        hide(){
            let title_editor = this.$el
            title_editor.style.display = "none"
        },
        display() {
            let title_editor = this.$el
            title_editor.style.display = "flex"
        }
    },
    mounted() {
        if (this.startEdit){
            this.startEditing()
        }
        let title_input = this.$refs.titleInput
        console.log("Setting fontsize " + this.fontSize)
        title_input.style.fontSize = this.fontSize;
        title_input.style.fontWeight = this.fontWeight
        title_input.value = this.initialValue
    },
    updated() {
        if (this.startEdit){
            this.startEditing()
        }
        if (!this.visibility) {
            this.hide()
        } else {
            this.display()
        }
    }
}
</script>


<style lang="scss">
@import '../../assets/variables.scss';

.title-editor {
    display: none;

    .header-input {
        font-weight: 700; 
        text-align: left;
        font-size: 1.3rem;
        background-color: #fff;
        color: $text-color; 
        border: none;
        outline: none;
        @include input-field;
    }
}

</style>
