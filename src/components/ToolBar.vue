<template>
    <div>
        <v-toolbar prominent>
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

            <v-toolbar-title class="toolbar-title">Đề kiểm tra học kì 1 2023-2024</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- <v-btn @click="addclick">
                Thêm mới
                <v-icon end icon="mdi-add" ></v-icon>
            </v-btn> -->
        </v-toolbar>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// function addclick() {
//     this.$emit("addclick");
// }
</script>
<style scoped>
.toolbar-title{
    text-align: left;
    font-size: 16px;
}
</style>