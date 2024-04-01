<template>
    <!-- SHEETS -->
    <v-container class="container">
        <!-- Temp -->
        <v-sheet class="sheet light">
        <!-- TITLE -->
        <v-row class="text-h3">
            Danh sách đề thi
        </v-row>
        <!-- TOOL BAR -->
        <tool-bar-grid
            @quizMaker="quizMaker"
        ></tool-bar-grid>
        <!-- GRID -->
        <grid></grid>
        </v-sheet>
    </v-container>  
</template>

<script>
import ToolBarGrid from '../../components/ToolBarGrid.vue'
import Grid from '../../components/Grid.vue'

export default{
    data: () => ({

    }),
    components: {
        ToolBarGrid,
        Grid
    },
    methods:{
        quizMaker(){
            this.$router.push('quiz-maker')
        }
    }
}
</script>

<style scoped="scss">
</style>