<template>
    <v-container class="container">
        <v-sheet class="sheet light">
            <v-row class="text-h3">
               Đề kiểm tra
            </v-row>
            <!-- TOOL BAR -->
            <tool-bar
							@mergeQuiz="mergeQuiz"
						></tool-bar>
						<!-- Danh sách đề trộn -->
						<grid
						:headers="headerMerge"
						:serverItems="datasMerge"
						></grid>

						<hr style="margin-bottom: 32px;">
            <!-- Exam Area -->
            <div class="exam-box">
								<!-- HEADER -->
                <v-row class="exam-header">
					<v-col :cols="4" class="left-header">
						<v-label>Phòng GDĐT Sơn Dương</v-label>
						<v-label>Trường THCS Văn Phú</v-label>
					</v-col>
					<v-col :cols="8" class="right-header">
						<v-label class="exam-title">Đề kiểm tra đề xuất bồi dưỡng thường xuyên</v-label>
						<v-label class="subject">Môn: Vật lý</v-label>
						<v-label class="time">Thời gian: 50 phút (Không kể thời gian giao đề)</v-label>
					</v-col>
                </v-row>
								<!-- BODY -->
                <v-row class="exam-body">
									<v-col :cols="12" class="item-quiz" v-for="(quiz, index) in quizs" :key="index">
										<div class="question">
											<span>Câu {{index+1}}: </span>
											<v-label v-html="quiz.questionContent"></v-label>
										</div>
										<div class="answer">
											<div v-for="(item, id) in [1,2,3,4]" :key="id" class="quiz-item">
												<span :class="{'red': quiz.answers[id].isTrue}">{{ ["A", "B", "C", "D"][id] }}. </span>
												<v-label v-html="quiz.answers[id].answerContent"></v-label>
											</div>
										</div>
									</v-col>
                </v-row>
								<!-- FOOTER -->
                <v-row class="exam-footer">
                    <!-- footer -->
                </v-row>
            </div>
        </v-sheet>
    </v-container>
</template>

<script>
// import { ref, onMounted } from 'vue';
import ApiService from '../../axios/axios.js';
import ToolBar from '../../components/ToolBar.vue';
import Grid from '../../components/Grid.vue'

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
				title: 'Mã đề', key: 'examTestCode', align: 'left'
			}
		]
	}),
	components:{
		ToolBar,
		Grid
	},
	async created(){
		//this.ExamsByID();
		//preview
		var id = this.$route.query.id;
		var res = await ApiService.getExamByCode(id);
		if (res){
			this.quizs = res.data.data.questionAnswers
		}
		console.log(this.quizs);

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
		},
		getAllMerge(){
			// debugger
			let id = this.$route.params.id;
			ApiService.getallShuffExams(id).then(res => {
				this.datasMerge = res.data.Data;
			}).catch(err => {
				
			}).finally(() => {

			}) 
		}
	},
}
	
</script>
<style lang="scss" scoped>
.exam-header{
	text-transform: uppercase;
	margin-bottom: 32px;
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
.exam-body{
	.answer{
		.red{
			color: red;	
		}
	}
}
</style>