<template>
    <div class="title-editor" id="titleEditor">
        <input ref="titleInput" class="title-input" type="text">
        <span class="icon" @click.stop="acceptEdit"><fa class="" icon="check" ></fa></span>
        <span class="icon" @click.stop ="stopEditing"><fa class="cross" icon="plus" ></fa></span>
    </div>
</template>



<script>

export default {
    name : 'InputField',
    props: ["startEdit"],
    emits: ['result', 'stop-edit'],
    methods: {
        stopEditing() {
            let title_editor = this.$el
            title_editor.style.display = "none"
            this.editingTitle = false
            this.$emit('stop-edit')
        },
        acceptEdit(){
            const editValue = this.$refs.titleInput.value
            this.$emit('result', editValue)
            this.stopEditing();
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
.title-editor {
    display: none;
    align-items: center;
    width: 80%;

    .title-input {
        font-weight: 700;
        font-size: 1.3rem;
        border: none;
        width: 80%;
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
