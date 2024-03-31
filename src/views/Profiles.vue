<script setup>
import ToolBarGrid from '../components/ToolBarGrid.vue'
import Grid from '../components/Grid.vue'
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
</style>