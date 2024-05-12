<template>
    <v-container class="container-exam-general">
        <v-sheet class="sheet light">
            <!-- TITLE -->
            <v-row class="text-h3 mb-8">
                Tạo kỳ thi
            </v-row>
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
                        item_value="subject"
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

<script setup>
import Combobox from '@/components/Combobox.vue'
import ExamsAPI from '../axios/ExamsAPI.js';
import BlockAPI from '../axios/BlockAPI.js';
import ExamGeneralAPI from '../axios/ExamGeneralAPI.js';
import { useToast } from 'vue-toast-notification';
import  {ref} from 'vue'
const examAPI = new ExamsAPI();
const blockAPI = new BlockAPI();
const examGeneralAPI = new ExamGeneralAPI();
const nameExam = ref("")
const lstTests = ref([])
const lstTestID = ref([])
const lstBlock = ref([])
const $toast = useToast();

const getAllTest = async ()=>{
    var res = await examAPI.getAll();
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