<template>
    <v-container class="container">
        <v-sheet class="sheet light">
            <v-row class="text-h3">
                Tạo đề kiểm tra
            </v-row>
            <div class="editor-form" >
                <QuillEditor  theme="snow"  :toolbar="toolbarOptions" />
            </div>
        </v-sheet>
    </v-container>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { QuillEditor } from '@vueup/vue-quill'
    import ApiService from '../../axios/axios.js';
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    const toolbarOptions = 
    ref([
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        ['link', 'image', 'video', 'formula'],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']                                         // remove formatting button
    ]);
    const lstAnalysis = ref([])
    const getlstAnalysis = async ()=>{
        var res = await ApiService.getAllAnalysisContent();
        console.log(res);
    }
    getlstAnalysis();
</script>
<style>
.container{
  position: absolute;
  left: 300px;
  height: 100%;
  width: calc(100% - 300px);
  padding: 0 24px;
}
.editor-form{
    height: 300px;
}
</style>