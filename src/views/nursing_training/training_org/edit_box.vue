<template>
  <div>
    <quill-editor
      id="myQuillEditor"
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
      @click="handleFullScreen"
    />
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'EditBox',
  data() {
    return {
      content: '<h2>I am Example</h2>',
      editorOption: {
        // some quill options
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    // console.log('this is current quill instance object', this.editor)
  },
  methods: {
    // 富文本
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
      console.log('111')
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    },
    handleFullScreen() {
      // console.log('111')
    }

  }
}
</script>

<style scoped>
  .quill-editor{
      width: 792px;
      height: 370px;
      margin-top: 15px;
  }
  .ql-container{
    height: 70%;
  }
</style>
