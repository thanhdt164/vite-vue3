<!-- TEMPLATE -->
<template>
  <v-expansion-panels
  v-model="panel"
  multiple
  variant="accordion"
  >
    <v-expansion-panel 
    :disabled="disabled"
    :value="1"
    class="item-quiz"
    >
      <v-expansion-panel-title>
        {{ title }}
      </v-expansion-panel-title>
      <v-expansion-panel-text class="">
        <slot></slot>
        <v-row>
          <div class="question">
            <QuillEditor 
              theme="snow" :toolbar="toolbarOptions" 
              v-model:content="quiz.question"
              contentType="html"
            />
          </div>
        </v-row>

        <v-row>
          <v-col style="margin-right: 16px;">
            <Combobox 
              :select="quiz.knowledgeLevel"
              :label="comboboxTypeM.label"
              :item_source="comboboxTypeM.source"
            ></Combobox>
          </v-col>
          <v-col>
            <Combobox
              :select="quiz.knowledgeType"
              :label="comboboxTypeN.label"
              :item_source="comboboxTypeN.source"
            ></Combobox>
          </v-col>
        </v-row>

        <v-row v-for="(item, id) in [1,2,3,4]" :key="id" class="answer-box">
          <v-checkbox 
            class="answer-checkbox" 
            v-model="quiz.answers[id].isTrue" 
            :label='["A.", "B.", "C.", "D."][id]'
            hide-details
          ></v-checkbox>
          <div class="answer">
            <QuillEditor	
              theme="snow" 
              :toolbar="toolbarOptionsQuiz" 
              v-model:content="quiz.answers[id].text"
              contentType="html"
            />
          </div>
      </v-row>
        
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */
import Combobox from '@/components/Combobox.vue'

/* EXPORT */
export default{
name: "Expansion",
components:{
  Combobox
},
data: () => ({
  panel: [1, 2, 3],
  toolbarOptions : [
    //['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    //[{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    //[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ],
  toolbarOptionsQuiz : [
    ['blockquote', 'code-block'],
    ['image','formula'],
    [{ 'script': 'sub'}, { 'script': 'super' }],      
    ['clean']                                         
  ],

  // Mức độ nhận biết
  comboboxTypeM: {},
  // Loại kiến thức
  comboboxTypeN: {}

}),
props:{
  title: {
    type: String,
    default: "Câu hỏi: "
  },
  disabled: {
    type: Boolean,
    default: false
  },
  quiz:{
    type: Object,
    default: {
        knowledgeLevel: [{Key: "M1", Value: "Nhận biết"}],
        knowledgeType: [{Key: "N1", Value: "Số nguyên tố"}],
        question: "<p>Lực nào dưới đây là lực đàn hồi?</p>",
        answers: [
            {
                text: "<p>Lực đẩy của lò xo dưới yên xe đạp<p/>",
								isTrue: true
            },
            {
								text: "<p>Trọng lực của một quả nặng<p/>",
								isTrue: false
            },
            {
								text: "<p>Lực hút của nam châm tác dụng lên miếng sắt<p/>",
								isTrue: false
            },
            {
								text: "<p>Lực kéo của hai đôi kéo co<p/>",
								isTrue: false
            }
				]
    }
  },

},
watch:{
  tmp_obj: {
    handler(newVal, oldVal) {
      
    },
    //callback to fire on all nested mutations
    deep: true, 
    // executed immediately by declaring
    immediate: true, 
    //callback to trigger only once when the source changes
    once: true, 
  }
},
computed: {

},
created(){
  this.comboboxTypeM = {
    label: "Mức độ nhận biết",
    source: Object.keys(this.$enum.KnowledgeLevelEnum).map(x => {return {Key: x, Value: this.$enum.KnowledgeLevelEnum[x]}})
  }

  this.comboboxTypeN = {
    label: "Loại kiến thức",
    source: Object.keys(this.$enum.KnowledgeTypeEnum).map(x => {return {Key: x, Value: this.$enum.KnowledgeTypeEnum[x]}})
  }

},
methods:{

}
}
/* STYLE */
</script>
<style scoped lang="scss">

</style>
<style lang="scss">
.item-quiz{
  .v-expansion-panel-text{
    .v-expansion-panel-text__wrapper{
      height: fit-content;
      
    }
  }
}
.question{
  width: 100%;
    .ql-container{
      height: fit-content;
    }
}
.answer-box{
  .answer-checkbox{

  }
  .answer{
    width: calc(100% - 74px);
    .ql-container{
      height: fit-content;
    }
  }
}
</style>