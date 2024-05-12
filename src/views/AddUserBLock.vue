<template>
     <v-container class="container-user-block">
        <v-sheet class="sheet light">
            <v-row class="text-h3 mb-8">
                Phân khối cho học sinh
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
                    <v-label>Chọn học sinh:</v-label>
                </v-col>
                <v-col>
                    <Combobox
                        label="Chọn học sinh"
                        :item_source="lstStudent"
                        item_key="userID"
                        item_value="userName"
                        :is_multiple="true"
                        @update:select="selectStudent"
                    >
                    </Combobox>
                </v-col>
            </v-row>
            <v-row style="width: 50%;">
                <v-col cols="3" ></v-col>
                <v-col cols="3" >
                    <v-btn  variant="tonal" @click="addUserBlock">
                        Thêm mới
                        <v-icon end icon="mdi-plus-box" ></v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-sheet>
     </v-container>
</template>
<script setup>
import Combobox from '@/components/Combobox.vue'
import { useToast } from 'vue-toast-notification';
import UserAPI from '../axios/UserAPI.js';
import BlockAPI from '../axios/BlockAPI.js';

import  {ref} from 'vue'
const lstStudent = ref([])
const blockAPI = new BlockAPI();
const lstBlock = ref([])
const userAPI = new UserAPI();
const getAllUser = async ()=>{
    var res = await userAPI.getAll();
    if (res && res.data.success){
        lstStudent.value = res.data.data
    }
}
const getAllBlock = async ()=>{
    var res = await blockAPI.getAll();
    if (res && res.data.success){
        lstBlock.value = res.data.data
    }
}
getAllBlock()
const lstUserID = ref([])
function selectStudent(val){
    lstUserID.value = val.map(x=>x.userID);
}
getAllUser()
const blockID = ref(0);
function selectBlock(val){
    blockID.value = val.blockID;
}
async function  addUserBlock(){
    var request = {
        LstUser : lstUserID.value,
        BlockID :blockID.value     
    }
    var res = await userAPI.createUserBlock(request);
    if (res && res.data.success){
        $toast.success("Thêm thành công ")
        blockID.value = 0
        lstUserID.value = []
    }
}
</script>
<style scoped>
.container-user-block{
    padding-left: 16px !important;
}
</style>