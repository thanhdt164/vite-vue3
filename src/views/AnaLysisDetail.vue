<template>
    <BaseArea title="Chi tiết đánh giá bài kiểm tra">
        <template v-slot:center-area>
            <div class="title mb-2 mt-4">
                Thông tin học sinh
            </div>
            <div class="card mb-6">
                <div>
                    Họ và tên: <span>{{ fullName }}</span>
                </div>
                <div>
                    Điểm: <span>{{ poin }}</span>
                </div>
            </div>
            <div class="title mb-2">
                    Kết quả phân tích bài kiểm tra
            </div>
            <div class="card">
                <div v-html="comment"></div>
            </div>
    </template>
    </BaseArea>
    </template>
<script setup>
import BaseArea from '@/components/BaseArea.vue'
import ExamsAPI from '../axios/ExamsAPI.js'
import  {ref} from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();

const fullName = ref("")
const comment = ref("")
const point = ref("")
let examCode = ref("")
const poin = ref(0)

const getAnalysDetail = async (examCode) =>{
    var res = await ExamsAPI.getResultAnalys(examCode);
    if (res.data.success){
        fullName.value = res.data.data.fullName
        comment.value = res.data.data.resultJson
        poin.value = res.data.data.poin || 0
    }
}
examCode = route.query.examCode
getAnalysDetail(examCode);
</script>
<style scoped>
.card {
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.container {
    padding: 0 16px;
}
.title{
    font-size:24px
}
</style>