<template>
    <div class="title-editor" id="titleEditor">
        <input ref="titleInput" class="header-input" @blur="acceptEdit" type="text">
    </div>
</template>



<script>

export default {
    name : 'InputField',
    props: ["startEdit" , 'fontSize', 'fontWeight'],
    emits: ['result'],
    methods: {
        acceptEdit(){
            const editValue = this.$refs.titleInput.value
            this.$emit('result', editValue)
            let title_editor = this.$el
            title_editor.style.display = "none"
            this.editingTitle = false
            console.log("accepted edit " + editValue)
        },
        startEditing(){
            let title_editor = this.$el
            console.log(title_editor)
            title_editor.style.display = "flex"
            this.$refs.titleInput.focus()
        }
    },
    mounted() {
        if (this.startEdit){
            this.startEditing()
        }
        let title_input = this.$refs.titleInput
        title_input.style.fontSize = this.fontSize
        title_input.style.fontWeight = this.fontWeight
    },
    updated() {
        console.log("state of start edit " + this.startEdit)
        if (this.startEdit){
            this.startEditing()
        }
    }
}
</script>


<style lang="scss">
@import '../../assets/variables.scss';

.title-editor {
    display: none;
    align-items: center;

    .title-input {
        border: none;
        width: 80%;
    }
    
    .header-input {
      font-weight: 700; 
      text-align: left;
      font-size: 1.3rem;
      padding: 0.0rem 0.25rem;
      background-color: #fff;
      @include input-field;
    }

    .cross {
        transform: rotate(45deg);
    }
}

.icon {
    display: inline-block;
    width: 2.5rem;
    transform: scale(1.2);
}

</style>
