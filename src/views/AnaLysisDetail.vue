<template>
    <BaseArea title="Chi tiết đánh giá bài kiểm tra">
        <template v-slot:center-area>
            <div class="title mb-2 mt-4">
                Thông tin học sinh
            </div>
<<<<<<< HEAD
        </div>
        <div class="title mb-2">
                Kết quả phân tích bài kiểm tra
        </div>
        <div class="card">
            <div> comment</div>
        </div>
    </div>
</template>
<script setup>
import  {ref} from 'vue';
import ExamsAPI from '@/axios/ExamsAPI.js';
</script>
<style scoped>
 .card {
        border-radius: 5px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
=======
            <div class="card mb-6">
                <div>
                    Họ và tên: <span>{{ fullName }}</span>
                </div>
                <div>
                    Điểm: <span>10</span>
                </div>
            </div>
            <div class="title mb-2">
                    Kết quả phân tích bài kiểm tra
            </div>
            <div class="card">
                <div> {{ comment }}</div>
            </div>
    </template>
    </BaseArea>
    </template>
<script setup>
import BaseArea from '@/components/BaseArea.vue'
import ExamsAPI from '../axios/ExamsAPI.js'
import  {ref} from 'vue'
const fullName = ref("")
const comment = ref("")
const getAnalysDetail = async (examCode) =>{
    var res = await ExamsAPI.getResultAnalys(examCode);
    if (res.data.success){
        fullName.value = res.data.data.fullName
        comment.value = res.data.data.resultJson
>>>>>>> 93632076c8811eb7955c6a988da182b8bfb14378
    }
}
getAnalysDetail("U2M280");
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