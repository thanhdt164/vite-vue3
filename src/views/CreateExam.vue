<template>
	<BaseArea title="Kỳ thi">
		<template v-slot:center-area>
			<Tab
			:listTab="listTab"
			:tab="tab"
			@update="updateTab($event)"
			>
				<template v-slot:CreateExam>
					<v-container class="container-exam-general">
						<v-sheet class="sheet light">
							<v-row style="width: 50%;">
								<v-col cols="3">
									<v-label>Tên kỳ thi:</v-label>
								</v-col>
								<v-col>
									<v-text-field v-model="nameExam" placeholder="Tên kỳ thi"></v-text-field>
								</v-col>
							</v-row>
							<v-row style="width: 50%;">
								<v-col cols="3">
									<v-label>Khối:</v-label>
								</v-col>
								<v-col>
									<Combobox
										label="Khối"
										:item_source="lstBlock"
										item_key="blockID"
										@update:select="selectBlock"
										item_value="blockName"
									>
									</Combobox>
								</v-col>
							</v-row>
							<v-row style="width: 50%;">
								<v-col cols="3">
									<v-label>Chọn đề thi:</v-label>
								</v-col>
								<v-col>
									<Combobox
										label="Chọn đề thi"
										:item_source="lstTests"
										item_key="examTestID"
										item_value="examTestName"
										:is_multiple="true"
										@update:select="selectTests"
									>
									</Combobox>
								</v-col>
							</v-row>
							<v-row style="width: 50%;">
								<v-col cols="3" ></v-col>
								<v-col cols="3" >
									<v-btn  variant="tonal" @click="addExamGeneral">
										Thêm kỳ thi
										<v-icon end icon="mdi-plus-box" ></v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</v-sheet>
					</v-container>
				</template>
				<template v-slot:ExamGeneralPaging>
					<Grid
						v-if="tab=='ExamGeneralPaging'"
						:api="examGeneralAPI"
						:headers="headersPaging"
						:gridHeighExpand="-36"
					></Grid>
				</template>
				<template v-slot:ExamGeneralByUser>
					<Grid
						v-if="tab=='ExamGeneralByUser'"
						:api="examGeneralAPI"
						:headers="headersPaging"
						:replacePagingGrid="examGeneralByUser"
						:gridHeighExpand="-36"
					></Grid>
				</template>
			</Tab>
		</template>
	</BaseArea>
	</template>
	
	<script setup>
	import BaseArea from '@/components/BaseArea.vue'
	import Combobox from '@/components/Combobox.vue'
	import ExamsAPI from '../axios/ExamsAPI.js';
	import BlockAPI from '../axios/BlockAPI.js';
	import ExamGeneralAPI from '../axios/ExamGeneralAPI.js';
	import { useToast } from 'vue-toast-notification';
	import Tab from "@/components/Template/Tab.vue";
	import Grid from '@/components/Grid.vue';
	import  {ref} from 'vue'
	const blockAPI = new BlockAPI();
	const examGeneralAPI = new ExamGeneralAPI();
	const nameExam = ref("")
	const lstTests = ref([])
	const lstTestID = ref([])
	let listTab = ref([])
	let tab = ref([])
	let headersPaging = ref([])
	let sourceHeaderPaging = ref([])
	const lstBlock = ref([])
	
	const $toast = useToast();
	const initTab = () => {
		listTab = [
			{ Key: "CreateExam", Title: "Tạo kì thi" },
			{ Key: "ExamGeneralPaging", Title: "Danh sách sách kì thi" },
			{ Key: "ExamGeneralByUser", Title: "Kì thi đã đăng kí" },
		]
		tab = "CreateExam"
	}
	initTab()
	const initHeaderPaging = () => {
		sourceHeaderPaging = [
			{
				title: 'Kì thi', key: 'ExamGeneralName', align: 'left'
			},
			{
				title: 'Khối', key: 'BlockName', align: 'left'
			},
			{
				title: 'Mã đề thi gốc', key: 'ExamTestCode', align: 'left'
			},
			{
				title: 'Môn học', key: 'Subject', align: 'left'
			},
			{
				title: 'Thời gian', key: 'Time', align: 'left', suffix: 'Phút'
			},
		]
		headersPaging = [{
			key: "STT",
			title: "STT",
			align: 'start',
			sortable: false,
			width: "30"
		}]
	
		sourceHeaderPaging.forEach(el => {
			headersPaging.push({
				key: el.key,
				title: el.title,
				align: 'end',
				sortable: true,
				type: el.type,
				prefix: el.prefix,
				suffix: el.suffix
			});
		})
	}
	initHeaderPaging()
	
	const examGeneralByUser = ({
		PageIndex,
		PageSize,
		ValueWhere
	}) => {
		return examGeneralAPI.PagingByUser({
			PageIndex,
			PageSize,
			ValueWhere
		});
	}
	
	const updateTab = (val) => {
		tab = val;
	}
	
	const getAllTest = async ()=>{
			var res = await ExamsAPI.getAll();
			if (res && res.data.success){
					lstTests.value = res.data.data
			}
	}
	const getAllBlock = async ()=>{
			var res = await blockAPI.getAll();
			if (res && res.data.success){
					lstBlock.value = res.data.data
			}
	}
	getAllTest()
	getAllBlock()
	function selectTests(val){
		lstTestID.value = val.map(x=>x.examTestID);
		console.log(val);
			lstTestID.value = val.map(x=>({
			ID : x.examTestID,
			Code : x.examTestCode
		}));
	}
	const blockID = ref(0);
	function selectBlock(val){
			blockID.value = val.blockID;
	}
	async function addExamGeneral(){
			var data = {
					Name : nameExam.value,
					BlockID : blockID.value,
					LstTestID : lstTestID.value
			}
			var res = await examGeneralAPI.InsertExamGeneral(data)
			if (res && res.data.success){
					$toast.success("Thêm thành công kỳ thi")
					nameExam.value = ""
					blockID.value = 0
					lstTestID.value = []
			}
	}
	</script>
	<style lang="scss" scoped>
	.container-exam-general{
			padding-left: 16px !important;
	}
	</style>