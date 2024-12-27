<template>
  <div>
    <quill-editor
      v-model="content"
      :options="editorOptions"
    ></quill-editor>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      editorOptions: {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['mathquill']
          ],
          mathquill: {
            // MathQuill configuration options
          }
        }
      }
    };
  }
};
</script>

<style>
@import 'quill/dist/quill.snow.css';
@import 'mathquill/build/mathquill.css';
</style>