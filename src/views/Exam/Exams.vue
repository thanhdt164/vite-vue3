<script setup>
import ToolBar from '../../components/ToolBar.vue'
import Grid from '../../components/Grid.vue'
</script>

<template>
    <!-- SHEETS -->
    <v-container class="container">
        <!-- Temp -->
        <v-sheet class="sheet light">
        <!-- TITLE -->
        <v-row class="text-h3">
            Nhập liệu phân tích
        </v-row>
        <!-- TOOL BAR -->
        <tool-bar-grid></tool-bar-grid>
        <!-- GRID -->
        <grid></grid>
        </v-sheet>
    </v-container>  
</template>

<style scoped="scss">
.container{
  position: absolute;
  /* background: gray; */
  left: 300px;
  height: 100%;
  width: calc(100% - 300px);
  padding: 0 24px;
 
}
.sheet{
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
}
.gray{
  background: gray;
}
.v-main{
  position: absolute;
  top: 64px;
  min-width: 100vw;
  height: calc(100vh - 64px);
  margin: 0 !important;
  padding: 0 !important;
}
</style>