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
        <grid
         :headers="headers"
         :serverItems="datas"
         @clickRow="detailExam"
        ></grid>
        </v-sheet>
    </v-container>  
</template>

<script>
import ToolBarGrid from '../../components/ToolBarGrid.vue'
import Grid from '../../components/Grid.vue'
import ApiService from '../../axios/axios';

export default{
    data: () => ({
        datas:[],
        headers:[
            {
                title: 'Mã đề', key: 'examTestCode', align: 'left'
            }
        ]
    }),
    components: {
        ToolBarGrid,
        Grid
    },
    methods:{
        quizMaker(){
            this.$router.push('quiz-maker')
        },
        // async detailExam(val){
        //     var res = await ApiService.getExamByCode(val.examTestCode);
        //     console.log(res);
        // }
        detailExam(val){
            this.$router.push({path:"/exam-detail",query:{id:val.examTestCode}});
        }
    },
    async created(){
        var res = await ApiService.getAllExams();
        if (res && res.data.success){
            this.datas = res.data.data;
        }else{
            this.$toast.info(res.data.message)
        }
    }
}

</script>

<style scoped="scss">
</style>