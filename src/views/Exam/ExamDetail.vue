<template>
  <BaseArea title="Bài kiểm tra">
    <template v-slot:left-tool>
      <v-icon @click="$router.push('/exams')">mdi-arrow-left</v-icon>
    </template>
    <template v-slot:right-tool>
      <v-btn class="btn-save-quiz" variant="tonal" @click="mergeQuiz">
        Trộn đề
        <v-icon end icon="mdi-content-save-plus" ></v-icon>
      </v-btn>
      <v-btn class="" variant="tonal" @click="viewOriginExam">
        Xem đề gốc
        <v-icon end icon="mdi-rotate-left" ></v-icon>
      </v-btn>
    </template>
    <template v-slot:center-area>
      <Tab
        :listTab="listTab"
        tab="DetailExam"
      >
        <template v-slot:GridMergeExam>
          <Grid
            :api="api"
            :headers="headersMerge"
            :replacePagingGrid="pagingGridMerge"
            :customConvertPageData="customConvertPageData"
            @clickRow="clickRow"
            :triggerPaging="triggerPaging"
            :gridHeighExpand="-36"
          ></Grid>
        </template>
        <template v-slot:DetailExam>
          <div class="exam-box">
            <!-- HEADER -->
            <v-row class="exam-header">
              <v-col :cols="4" class="left-header">
                <!-- Phòng GD -->
                <div>{{ examData.educationTrainName }}</div>
                <!-- Trường -->
                <div>{{ examData.schoolName }}</div>
              </v-col>
              <v-col :cols="8" class="right-header">
                <div class="exam-title">{{ examData.examTestName }}</div>
                <div class="subject">Môn: {{ examData.subjectName }}</div>
                <div class="time">Thời gian: {{ examData.time }} phút (Không kể thời gian giao đề)</div>
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
      </Tab>
      <!-- <Grid
        :api="api"
        :headers="headersMerge"
        :replacePagingGrid="pagingGridMerge"
        :customConvertPageData="customConvertPageData"
        @clickRow="clickRow"
      ></Grid> -->
      <!-- Exam Area -->
      <!-- <div class="exam-box">
        HEADER
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
        BODY
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
        FOOTER
        <v-row class="exam-footer">
        
        </v-row>
      </div> -->
    </template>
  </BaseArea>
</template>

<script>
import BaseArea from '@/components/BaseArea.vue'
import ApiService from '../../axios/axios.js';
import ToolBar from '../../components/ToolBar.vue';
import Grid from '../../components/Grid.vue'
import {useToast} from 'vue-toast-notification';
import Tab from "@/components/Template/Tab.vue";

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

    headersMerge: [],
    pagingGridMerge: null,
    customConvertPageData: null,
    sourceHeadersMerge: [
      // {
      //   title: 'ID đề thi', key: 'examTestID', align: 'left'
      // },
      {
        title: 'Bài kiểm tra', key: 'examTestName', align: 'left'
      },
      {
        title: 'Môn học', key: 'subjectName', align: 'left',
      },
      {
        title: 'Thời gian', key: 'time', align: 'left', suffix: 'Phút'
      },
      {
        title: 'Phòng GDĐT', key: 'educationTrainName', align: 'left',
      },
      {
        title: 'Trường', key: 'schoolName', align: 'left',
      },
    ],
    toast: useToast(),
    datasMerge: [],
    arrQuestionAnswers: [],
    api: ApiService,
    originQuizs: [],
    triggerPaging: false,
    examData: {},
  }),
  components:{
    BaseArea,
    ToolBar,
    Grid,
    Tab
  },
  async created(){
    this.initTab()
    this.initMergeExam()
    var code = this.$route.query.code;
    var res = await ApiService.getExamByCode(code);
    if (res){
      this.examData = res.data.data.exam;
      this.quizs = res.data.data.questionAnswers
      this.originQuizs = res.data.data.questionAnswers;
    }
  },
  methods:{
    initTab(){
      this.listTab = [
        { Key: "DetailExam", Title: "Chi tiết đề thi" },
        { Key: "GridMergeExam", Title: "Đề trộn" },
      ]
    },
    initMergeExam(){
      this.headersMerge = [{
        key: "STT",
        title: "STT",
        align: 'start',
        sortable: false,
        width: "30"
      }]
      this.sourceHeadersMerge.forEach(el => {
        this.headersMerge.push({
          key: el.key,
          title: el.title,
          align: 'end',
          sortable: true,
          type: el.type,
          prefix: el.prefix,
          suffix: el.suffix
        });
      })
      this.pagingGridMerge = ({
        PageIndex,
        PageSize,
        ValueWhere
      }) => {
        let id = this.$route.query.id;
        return ApiService.getallShuffExams(id);
      }
      this.customConvertPageData = (pageData) => {
        pageData.forEach(el => {
          el.examTestID = el.exam.examTestID
          el.examTestCode = el.exam.examTestCode
          el.isOrigin = el.exam.isOrigin
          el.time = el.exam.time
        }) 
      }
    },
    mergeQuiz(){
      // call api merge
      var code = this.$route.query.code;
      ApiService.shuffExams(code).then(async (res) => {
        if(res.data.data){
          this.toast.success('Trộn đề thi thành công!')
          this.triggerPaging = false
          setTimeout(() => {
            this.triggerPaging = true;
          }, 0);
        }else{
          this.toast.success('Trộn đề thi thất bại!')
        }
      }).catch(err => {
        
      }).finally(() => {

      }) 
    },
    clickRow(data){
      this.quizs = data.questionAnswers
      this.$mitt.$emit('changeTab', 'DetailExam')
    },
    viewOriginExam(){
      this.quizs = this.originQuizs
      this.$mitt.$emit('changeTab', 'DetailExam')
    }
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
  width: 100%;
  padding-top: 16px;
  max-height: 100%;
  height: 100%;
  overflow: scroll;
}
.exam-body{
  // height: 100%;
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
.btn-save-quiz{
  margin-right: 8px;
}
</style>