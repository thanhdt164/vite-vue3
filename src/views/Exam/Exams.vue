<template>
  <BaseArea title="Danh sách đề thi">
    <template v-slot:center-area>
      <Grid
        :api="api"
        :headers="headers"
        @clickRow="clickRow"
      ></Grid>
    </template>
  </BaseArea>
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */
import BaseArea from '@/components/BaseArea.vue'
import Grid from '@/components/Grid.vue'
import ExamsAPI from "@/axios/ExamsAPI.js"

/* EXPORT */
export default{
  name: "",
  components:{
    BaseArea,
    Grid
  },
  data: () => ({
    headers: [],
    api: ExamsAPI,
  }),
  props:{
    tmp_Prop: {
      type: [Number, Array, Object, String],
      default: 100
    },
  },
  watch:{
    tmp_obj: {
      handler(newVal, oldVal) {
        
      },
      //callback to fire on all nested mutations
      deep: true, 
      // executed immediately by declaring
      immediate: true, 
      //callback to trigger only once when the source changes
      once: true, 
    }
  },
  computed: {

  },
  created(){
    let primaryHeader = [
      {key: "examTestCode", title: "Mã đề kiểm tra"},
      {key: "isOrigin", title: "Loại đề (gốc/trộn)", type: 'bool'},
      {key: "subjectName", title: "Môn học"},
      {key: "time", title: "Thời gian", suffix: "Phút"},
    ]
    this.headers = [{
      key: "STT",
      title: "STT",
      align: 'start',
      sortable: false,
      width: "30"
    }]
    primaryHeader.forEach(el => {
      this.headers.push({
        key: el.key,
        title: el.title,
        type: el.type,
        align: 'center',
        sortable: true,
        prefix: el.prefix,
        suffix: el.suffix
      });
    })

  },
  methods:{
    clickRow(data){
      this.$router.push({path:"/exam-detail",query:{id:data.examTestID, code: data.examTestCode}});
    }
  }
}
/* STYLE */
</script>
<style scoped lang="scss">

</style>
<style lang="scss">

</style>