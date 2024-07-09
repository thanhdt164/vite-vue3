<template>
  <BaseArea title="Bài kiểm tra">
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
    api: ExamsAPI
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
      {key: "isOrgin", title: "Loại đề (gốc/trộn)"},
      {key: "subject", title: "Môn học"},
      {key: "time", title: "Thời gian"},
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
        align: 'end',
        sortable: true
      });
    })
  },
  methods:{
    clickRow(){
      //this.$route.path
    }
  }
}
/* STYLE */
</script>
<style scoped lang="scss">

</style>
<style lang="scss">

</style>