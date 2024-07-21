<template>
    <v-container class="container">
        <v-sheet class="sheet light">
            <v-row class="text-h3">
               Làm bài kiểm tra
            </v-row>
            <!-- Exam Area -->
            <div class="exam-box">
				<!-- HEADER -->
                <v-row class="exam-header">
					<v-col :cols="4" class="left-header text-center">
						<v-label>Phòng GDĐT Sơn Dương</v-label>
						<v-label>Trường THCS Văn Phú</v-label>
					</v-col>
					<v-col :cols="8" class="right-header text-center">
						<v-label class="exam-title">Đề kiểm tra đề xuất bồi dưỡng thường xuyên</v-label>
						<v-label class="subject">Môn: Vật lý</v-label>
						<v-label class="time">Thời gian: 50 phút (Không kể thời gian giao đề)</v-label>
					</v-col>
                </v-row>
				<!-- BODY -->
				<v-row>
					<vue-countdown :time="9000" v-slot="{minutes, seconds }" @end="endCountDown">
						Thời gian làm bài còn：{{ minutes }} phút, {{ seconds }} giây.
					</vue-countdown>
				</v-row>
                <div class="exam-body">
					<div  class="item-quiz" v-for="(quiz, index) in quizs" :key="index">
						<v-row>
							<div class="question">
								<span>Câu {{index+1}}: </span>
								<v-label v-html="quiz.questionContent"></v-label>
							</div>
						</v-row>
						<v-row>
							<v-col cols="12">
								<div class="answer">
									<v-row v-for="(item, id) in [1,2,3,4]" :key="id" class="quiz-item">
										<div>
											<v-checkbox 
												class="answer-checkbox  mr-0 mt-0" 
												:hide-details="true"
												@change="chooseResult(item,quiz)"
											></v-checkbox>
										</div>
										<div class="d-flex align-center">
											<span :class="{'red': quiz.answers[id].isTrue}">{{ ["A", "B", "C", "D"][id] }}. </span>
											<v-label v-html="quiz.answers[id].answerContent"></v-label>
										</div>
									</v-row>
								</div>
							</v-col>
						</v-row>
					</div>
					<div >
						<v-btn class="btn-add-quiz" variant="tonal" @click="endCountDown">
								Nộp bài
								<v-icon end icon="mdi mdi-coffee-maker-check" ></v-icon>
						</v-btn>
					</div>
                </div>
				
				<!-- FOOTER -->
                <v-row class="exam-footer">
                    <!-- footer -->
                </v-row>
            </div>
        </v-sheet>
    </v-container>
</template>
<script setup>
import { ref } from 'vue';
import ExamsAPI from '@/axios/ExamsAPI.js';
import VueCountdown from '@chenfengyuan/vue-countdown';

const quizs = ref([])
const getDataExam = async (code) =>{
	var res = await ExamsAPI.getExamDoing(code);
	quizs.value = res.data.data;
	console.log(quizs.value);
}
function chooseResult(index,item){
	var lstResults = [];
	if (item.isMultiAnswer){
		if(!lstResults.find(index)){
			lstResults.push(index)
		}
	}
	else{
		lstResults =[index]; 
	}
	item.results = lstResults;
}
getDataExam("U2M280");
async function endCountDown(){
	var params = {
		examCode:"U2M280",
		questionDetails:quizs.value
	}
	var res = await ExamsAPI.getMarkTest(params);
}
</script>
<style lang="scss" scoped>
.exam-body{
	max-height: calc(100vh - 250px);
	overflow: auto;
}
</style>