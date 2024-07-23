<template>
  <BaseArea title="Bài kiểm tra">
    <template v-slot:center-area>
      <Grid></Grid>
      <!-- Exam Area -->
      <div class="exam-box">
        <!-- HEADER -->
        <v-row class="exam-header">
          <v-col :cols="4" class="left-header">
            <div>Phòng GDĐT Sơn Dương</div>
            <div>Trường THCS Văn Phú</div>
          </v-col>
          <v-col :cols="8" class="right-header">
            <div class="exam-title">Đề kiểm tra đề xuất bồi dưỡng thường xuyên</div>
            <div class="subject">Môn: Vật lý</div>
            <div class="time">Thời gian: 50 phút (Không kể thời gian giao đề)</div>
          </v-col>
        </v-row>
        <!-- BODY -->
        <v-row class="exam-body">
          <v-col :cols="12" class="item-quiz" v-for="(quiz, index) in quizs" :key="index">
            <div class="question">
              <div class="quiz-number">Câu {{index+1}}: </div>
              <p class="quiz-content" v-html="quiz.questionContent"></p>
            </div>
            <div class="answer">
              <div v-for="(item, id) in [1,2,3,4]" :key="id" class="answer-item">
                <div 
                  :class="{'red': quiz.answers[id].isTrue}"
                  class="answer-mark"
                >{{ ["A", "B", "C", "D"][id] }}.</div>
                <p class="answer-detail" v-html="quiz.answers[id].answerContent"></p>
              </div>
            </div>
          </v-col>
        </v-row>
        <!-- FOOTER -->
        <v-row class="exam-footer">
        
        </v-row>
      </div>
    </template>
  </BaseArea>
</template>

<script>
import BaseArea from '@/components/BaseArea.vue'
import ApiService from '../../axios/axios.js';
import ToolBar from '../../components/ToolBar.vue';
import Grid from '../../components/Grid.vue'
import {useToast} from 'vue-toast-notification';

export default{
  data: () => ({
    quizs: [
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
    ],
    headerMerge: [
      {
        title: 'ID đề thi', key: 'examTestID', align: 'left'
      },
      {
        title: 'Mã đề thi', key: 'examTestCode', align: 'left'
      },
      {
        title: 'Đề gốc', key: 'isOrgin', align: 'left'
      },
    ],
    toast: useToast(),
    datasMerge: [],
    arrQuestionAnswers: []
  }),
  components:{
    BaseArea,
    ToolBar,
    Grid
  },
  async created(){
    //this.ExamsByID();
    //preview
    var id = this.$route.query.id.split("/")[0];
    var res = await ApiService.getExamByCode(id);
    if (res){
      this.quizs = res.data.data.questionAnswers
    }

    // lấy all đề merge
    this.getAllMerge()
  },
  methods:{
    ExamsByID(){
      ApiService.ExamsByID().then(res => {
        this.quizs = res;
      }).catch(err => {
        
      }).finally(() => {

      }) 
    },
    mergeQuiz(){
      // call api merge
      var code = this.$route.query.id.split("/")[0];
      ApiService.shuffExams(code).then(res => {
        if(res.data.data){
          this.toast.success('Trộn đề thi thành công!')
          this.getAllMerge()
        }else{
          this.toast.success('Trộn đề thi thất bại!')
        }
      }).catch(err => {
        
      }).finally(() => {

      }) 
    },
    getAllMerge(){
      let id = this.$route.params.id;
      ApiService.getallShuffExams(id).then(res => {
        this.datasMerge = res.data.data.map(x => x.exam);
        this.arrQuestionAnswers = res.data.data.map(x =>x.questionAnswers);
      }).catch(err => {
        
      }).finally(() => {

      }) 
    },
  },
}
  
</script>
<style lang="scss" scoped>
.exam-header{
  text-transform: uppercase;
  margin-bottom: 32px !important;
  .left-header{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .right-header{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .time{
    text-transform: none;
  }
}
.exam-box{
  padding-top: 32px;
}
.exam-body{
  .item-quiz{
    margin-bottom: 12px !important;
    .question{
      position: relative;
      display: flex;
      .quiz-number{
        position: absolute;
        width: 50px;
      }
      .quiz-content{
        width: 100%;
        text-indent: 50px;
      }
    }
    .answer{
      padding: 0 8px 0 32px;
      .answer-item{
        // position: relative;
        display: flex;
        .red{
          color: red;  
        }
        .answer-mark{
          width: 16px;
          // position: absolute;
        }
        .answer-detail{
          width: calc(100% - 16px);
          // text-indent: 16px;
        }
      }
    }
  }
}
</style>