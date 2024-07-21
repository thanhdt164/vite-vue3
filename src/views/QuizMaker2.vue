<!-- TEMPLATE -->
<template>
  <BaseArea title="Tạo đề kiểm tra">
    <template v-slot:center-area>
      <v-sheet class="quiz-info">
        <!-- THÔNG TIN CHUNG -->
        <v-label>Thông tin chung:</v-label>
        <v-row style="width: 70%;">
          <v-col style="margin-right: 16px;">
            <CardField
              title="Phòng GDĐT"
            ></CardField>
          </v-col>
          <v-col style="margin-right: 16px;">
            <CardField
              title="Trường"
              :text.sync="school"
            ></CardField>
          </v-col>
          <v-col>
            <CardField
              title="Tên đề kiếm tra"
            ></CardField>
          </v-col>  
        </v-row>
        <!-- Thông tin khác -->
        <v-label>Thông tin khác:</v-label>
        <!-- Môn học -->
        <v-row style="width: 50%;">
          <v-col cols="3">
            <v-label>Mã đề: </v-label>
          </v-col>
          <v-col>
            <TextField v-model="examTestCode"></TextField>
          </v-col>
        </v-row>
        <!-- Môn học -->
        <v-row style="width: 50%;">
          <v-col cols="3">
            <v-label>Môn học: </v-label>
          </v-col>
          <v-col>
            <Combobox 
              v-model="subject"
              :label="comboboxSubjects.label"
              :item_source="comboboxSubjects.source"
            ></Combobox>
          </v-col>
        </v-row>
        <!-- Thời gian -->
        <v-row style="width: 50%;">
          <v-col cols="3">
            <v-label>Thời gian:</v-label>
          </v-col>
          <v-col>
            <Combobox 
              v-model="time"
              :label="comboboxTimes.label"
              :item_source="comboboxTimes.source"
            ></Combobox>
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet class="quiz-box">
        <!-- CÂU HỎI -->
        <v-sheet class="quiz-list">
          <v-row>
            <Expansion v-for="(quiz, index) in quizs" :key="index"
              :title="`Câu hỏi ${index+1}:`"
              :quiz="quiz"
            ></Expansion>
          </v-row>
          <v-row class="foot-quiz-box">
            <v-btn class="btn-save-quiz" variant="tonal" @click="saveQuiz">
                Lưu đề thi
                <v-icon end icon="mdi-content-save-plus" ></v-icon>
            </v-btn>
            <v-btn class="btn-add-quiz" variant="tonal" @click="addQuiz">
                Thêm câu hỏi
                <v-icon end icon="mdi-plus-box" ></v-icon>
            </v-btn>
          </v-row>
        </v-sheet>
      </v-sheet>
    </template>
  </BaseArea>
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */
import Combobox from '@/components/Combobox.vue'
import BaseArea from '@/components/BaseArea.vue'
import CardField from '@/components/CardField.vue'
import Expansion from '@/components/Expansion.vue'
import TextField from '@/components/TextField.vue'
import ApiService from '../axios/axios';

/* EXPORT */
export default{
  name: "",
  components:{
    BaseArea,
    CardField,
    Expansion,
    Combobox,
    TextField
  },
  data: () => ({
    examTestCode: "MD002",
    subject: [],
    time: [],
    school: "Trường THCS..",
    quizs: [
        {
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
    ],
    // Môn học
    comboboxSubjects: {},
    comboboxTimes: {},
    examModel: {
      "exam": {
        //"examTestID": 0,
        "examTestCode": "",
        "isOrigin": true,
        "subject": [],
        "time": []
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
          "knowledgeLevel": [],
          "knowledgeType": [],
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


  }),
  props:{
    tmp_Prop: {
      type: [Number, Array, Object, String],
      default: 100
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
    let subSource = this.$enum.SubjectEnum
    this.comboboxSubjects = {
      label: "Môn học",
      source: Object.keys(subSource).map(x => {return {Key: x, Value: subSource[x]}})
    }
    
    let timeSource = this.$enum.TimeEnum
    this.comboboxTimes = {
      label: "Thời gian",
      source: Object.keys(timeSource).map(x => {return {Key: x, Value: timeSource[x]}})
    }
  },
  methods:{
    /**
     * Thêm câu hỏi
     */
    addQuiz(){
      this.quizs.push({
        question: null,
        answers: [
          { text: "", isTrue: false },
          { text: "", isTrue: false },
          { text: "", isTrue: false },
          { text: "", isTrue: false }
        ]
      })
    },
    /**
     * Lưu đề thi
     */
    saveQuiz(){
      let exam = {
        "examTestCode": this.examTestCode,
        "isOrigin": true,
        "subject": this.subject.Value,
        "time": this.time.Value
      }
      let param = {
        exam: exam,
        questionAnswers: []
      }
      // Thông tin chung
      param.exam.examTestCode = this.examTestCode,

      // Các câu hỏi
      this.quizs.forEach((quiz, id) => {
        let question = {}
        question.questionSortOrder = id + 1
        question.image = "image" // tạm
        question.questionContent = this.removeEmptyTags(quiz.question)

        let answers = []
        quiz.answers.forEach((answer, idd) => {
          answers.push({
            answerSortOrder: idd + 1,
            answerContent: this.removeEmptyTags(answer.text),
            isTrue: answer.isTrue,
          })
        })
        question.answers = answers;
        param.questionAnswers.push(question)
      });

      ApiService.InsertExam(param).then(res => {
        if(res.data.success){
          this.$toast.success('Lưu đề thi thành công!')
        }else{
          this.$toast.error('Lưu đề thi thất bại!')
        }
      });
      
    },
    /**
     * Loại bỏ các thẻ trống
     * @param {*} htmlString 
     */
    removeEmptyTags(htmlString) {
      if(htmlString){
        return htmlString.replace('<br>', '').replace(/<(\w+)(\s*?)><\/\1>/g, '');
      }
    }
  }
}
/* STYLE */
</script>
<style scoped lang="scss">
.quiz-info{
  padding: 16px;
}
.quiz-box{
  padding: 0 15%;
  
  .quiz-list{
    padding: 16px;
  }
  .foot-quiz-box{
    display: flex;
    flex-direction: row-reverse;
    .btn-add-quiz{
      margin-right: 8px;
    }
    .btn-save-quiz{
      // margin-right: 8px;
    }
    
  }
}
</style>
<style lang="scss">

</style>