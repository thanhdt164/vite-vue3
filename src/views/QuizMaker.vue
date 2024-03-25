<template>
    <!-- SHEETS -->
    <v-container class="container">
        <!-- Temp -->
        <v-sheet class="sheet light">
        <!-- TITLE -->
        <v-row class="title">
            Tạo đề thi
        </v-row>
        <!-- TOOL BAR -->
        <tool-bar></tool-bar>
        <!-- QUIZ AREA -->
        <div class="quiz-box">
            <div class="quiz">
                <div class="top-quiz">
                    <v-btn @click="saveQuiz">
                        Thêm mới
                        <v-icon end icon="mdi-add" ></v-icon>
                    </v-btn>
                </div>
                <div class="quiz-content">
                    <div class="item-quiz" v-for="(quiz, index) in quizs" :key="index" >
                        <div class="question">
                            <div>CÂU HỎI: {{index+1}}</div>
                            <div class="quill-custom">
                                <QuillEditor 
                                    theme="snow" :toolbar="toolbarOptions" 
                                    v-model:content="quiz.question"
                                    contentType="html"
                                />
                            </div>
                        </div>
                        <div>
                            <div>ĐÁP ÁN:</div>
                            <div class="quill-custom">
                                <div v-for="(item, id) in [1,2,3,4]" :key="id" class="quiz-item">
                                    <div>{{ ["A.", "B.", "C.", "D."][id] }}</div>
                                    <QuillEditor
                                        theme="snow" :toolbar="toolbarOptions" 
                                        v-model:content="quiz.answers[id].text"
                                        contentType="html"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </v-sheet>
    </v-container>  
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import ToolBar from '../components/ToolBar.vue'

import { ref } from 'vue'



const quizs = ref([
    {
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
    },
    {
        question: "<p>Khi có một lực tác động lên vật thì vận tốc của vật sẽ như thế nào?</p>",
        answers: [
            {
								text: "<p>Vận tốc không thay đổi<p/>",
								isTrue: false
            },
            {
								text: "<p>Vận tốc giảm dần<p/>",
								isTrue: false
            },
            {
								text: "<p>Vận tốc có thể tăng có thể giảm<p/>",
								isTrue: true
            },
            {
								text: "<p>Vận tốc tăng dần<p/>",
								isTrue: false
            }
				]
    }
])

const toolbarOptions = [
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
];


let examModel = {
  "exam": {
    //"examTestID": 0,
    "examTestCode": "MD001",
    "isOrigin": true
  },
  "questionAnswers": [
    {
      //"questionID": "",
      //"examTestID": 0,
      "questionSortOrder": 0,
      //"subAnalysysID": 0,
      //"mainAnalysysID": 0,
      "image": "string",
      "questionContent": "string",
      "answers": [
        {
          //"answerID": 0,
          //"questionID": "",
          "answerContent": "string",
          "isTrue": true,
          "answerSortOrder": 0
        }
      ]
    }
  ]
}
function saveQuiz() {
	let param = {
		exam: examModel.exam,
		questionAnswers: []
	}
	quizs.value.forEach((quiz, id) => {
		let question = {}
		question.questionSortOrder = id + 1
		question.image = "image" // tạm
		question.questionContent = quiz.question

		let	answers = []
		quiz.answers.forEach((answer, idd) => {
			answers.push({
				answerSortOrder: idd + 1,
				answerContent: answer.text,
				isTrue: answer.isTrue,
			})
		})
		question.answers = answers;
		param.questionAnswers.push(question)
	});
}
</script>

<style scoped="scss">
.container{
  position: absolute;
  /* background: gray; */
  left: 300px;
  height: 100%;
  width: calc(100% - 300px);
  padding: 0 24px;
 
}
.sheet{
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
}
.gray{
  background: gray;
}
.v-main{
  position: absolute;
  top: 64px;
  min-width: 100vw;
  height: calc(100vh - 64px);
  margin: 0 !important;
  padding: 0 !important;
}
.title{
    font-size: 40px;
    line-height: 48px;
}


.quiz-box{
    /* border: 1px solid black; */
    padding: 16px;
    height: calc(100vh - 132px);
    overflow: scroll;
}
.top-quiz{
    display: flex;
    flex-direction: row-reverse;
}
.item-quiz{
    margin-bottom: 48px;
}
.quill-custom{
    padding-left: 32px;
}
</style>