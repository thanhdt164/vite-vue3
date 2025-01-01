<template>
<BaseArea title="Làm bài kiểm tra">
	<template v-slot:right-tool>
		<vue-countdown :time="timeCount" v-slot="{minutes, seconds }" @end="endCountDown">
			Thời gian làm bài còn: {{ minutes }} phút, {{ seconds }} giây.
		</vue-countdown>
	</template>
	<template v-slot:center-area>
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
				<div class="item-quiz" v-for="(quiz, index) in quizs" :key="index">
					<div class="question">
						<div class="quiz-number">Câu {{index+1}}: </div>
						<p class="quiz-content" v-html="quiz.questionContent"></p>
					</div>
					<div class="answer">
						<!-- Checkbox -->
						<div v-show="quiz.isMultiAnswer" class="answer-item" v-for="(indexAnswer, id) in [1,2,3,4]" :key="id" >
							<v-checkbox 
								:hide-details="true"
								@change="chooseResultMulti(indexAnswer,quiz)"
							></v-checkbox>
							<div class="answer-mark">{{ ["A", "B", "C", "D"][id] }}.</div>
							<p class="answer-detail" v-html="quiz.answers[id].answerContent"></p>
						</div>
						<!-- Radio -->
						<div v-show="!quiz.isMultiAnswer" class="answer-item">
							<v-radio-group v-model="quiz.results[0]" @change="chooseResultRadio(quiz)" :hide-details="true">
								<v-radio
								 	v-for="(indexAnswer, id) in [1,2,3,4]" :key="id"
									:value="indexAnswer">
									<template v-slot:label>
										<div class="answer-mark">{{ ["A", "B", "C", "D"][id] }}.</div>
										<p class="answer-detail" v-html="quiz.answers[id].answerContent"></p>
									</template>
								</v-radio>
							</v-radio-group>
						</div>
					</div>
				</div>
			</v-row>
			<!-- FOOTER -->
			<div class="exam-footer">
				<v-btn class="btn-add-quiz" variant="tonal" @click="endCountDown">
					Nộp bài
					<v-icon end icon="mdi mdi-coffee-maker-check" ></v-icon>
				</v-btn>
			</div>
		</div>
	</template>
</BaseArea>
<ConfirmationDialog 
	:message="dialogMessage" 
	:isVisible="isDialogVisible" 
	@update:isVisible="isDialogVisible = $event"
	@confirmed="handleConfirm"
	@canceled="handleCancel"
/>
</template>
<script>
import ExamsAPI from '@/axios/ExamsAPI.js';
import VueCountdown from '@chenfengyuan/vue-countdown';
import BaseArea from '@/components/BaseArea.vue'
import ConfirmationDialog from '../views/ConfirmDialog.vue';

export default{
  name: "",
  components:{
    BaseArea,
	VueCountdown,
	ConfirmationDialog
  },
  data: () => ({
		quizs: [],
		isNotCheck: true,
		timeCount:10000000,
		isDialogVisible: false,
      	dialogMessage: 'Nếu bạn thoát khỏi màn hình này, bài thi sẽ được chấm điểm với kết quả hiện tại. Bạn có muốn tiếp tục?',
		routerNextTo:"",
		isStop:false
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
		this.getDataExam();
  },
  methods:{
		getDataExam(){
			let code = this.$route.query.code; // Access route parameters
			ExamsAPI.getExamDoing(code).then(res => {
				if (res.data.data.length == 0){
					this.$toast.warning("Bài kiểm tra đã làm hoặc có lỗi xảy ra")
					return;
				}
				this.quizs = res.data.data;
				this.quizs.forEach(el => {
					el.results = []
				})
				this.timeCount = 20000;
			});
		},
		async endCountDown(){
			let examCode = this.$route.query.code; // Access route parameters
			if (!this.isNotCheck) return;
			this.isNotCheck = false;
			var params = {
				examCode: examCode,
				questionDetails: this.quizs
			}
			var res = await ExamsAPI.getMarkTest(params);
			this.$toast.success("Nộp bài thành công")
			// Chuyển hướng sang phân hệ kết quả học sinh
			this.$router.push({path:"/students"});
		},
		chooseResultMulti(index, quiz){
			var lstResults = [];
			if (quiz.isMultiAnswer){
				if(!lstResults.find(index)){
					lstResults.push(index)
				}
			}
			else{
				lstResults =[index]; 
			}
			quiz.results = lstResults;
		},
		chooseResultRadio(quiz){
			quiz.results = [quiz.results[0]]
		},
		showDialog() {
      		this.isDialogVisible = true;
		},
		handleConfirm() {
			this.isStop = true
			this.$router.push({path:this.routerNextTo});
		},
		handleCancel() {
			//this.isStopExam = true
		},
  },
  beforeRouteLeave(to, from, next) {
  	this.showDialog()
	this.routerNextTo = to.path
	if (this.isStop){
		this.endCountDown()
		next(true)
	}
	next(false)
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
		width: 100%;
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
				align-items: center;
        display: flex;
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
<style lang="scss">
.answer-item{
	.v-label{
		width: 100%;
	}
	.v-input__control{
		height: fit-content;
	}
}
</style>