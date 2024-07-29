<template>
    <div class="container">
        <div class="title mb-2">
                Thông tin học sinh
        </div>
        <div class="card mb-6">
            <div>
               Họ và tên: <span>Bùi Tuấn Anh</span>
            </div>
        </div>
        <div class="title mb-2">
                Kết quả phân tích bài kiểm tra
        </div>
        <div class="card">
            <div> comment</div>
        </div>
    </div>
</template>
<scrip setup>
import ExamsAPI from '../axios/ExamsAPI.js';
import  {ref} from 'vue'
</scrip>
<style scoped>
 .card {
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