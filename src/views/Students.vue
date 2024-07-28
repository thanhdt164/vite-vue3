<template>
  <BaseArea title="Kết quả học sinh">
    <template v-slot:center-area>
      <Grid
        :api="api"
        :headers="headers"
      >
      </Grid>
    </template>
  </BaseArea>
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */
import BaseArea from '@/components/BaseArea.vue'
import Expansion from '@/components/Expansion.vue'
import Grid from '@/components/Grid.vue'
import UserAPI from "@/axios/UserAPI.js"

/* EXPORT */
export default{
  name: "",
  components:{
    BaseArea,
    Expansion,
    Grid
  },
  data: () => ({
    headers: [],
    api: UserAPI
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
    roleName(){
      let roleName = localStorage.getItem('roleName');
      return roleName;
    }
  },
  created(){
    let primaryHeader = [
      {key: "fullName", title: "Tên học sinh"},
      {key: "point", title: "Điểm"},
      {key: "examCode", title: "Mã đề"},
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

    if(!this.roleName.includes("Teacher")){
      this.pagingGrid = ({
        PageIndex,
        PageSize,
        ValueWhere
      }) => {
        return UserAPI.ResultByUser();
      }
    }
  },
  methods:{
    
  }
}
/* STYLE */
</script>
<style scoped lang="scss">

</style>
<style lang="scss">

</style>