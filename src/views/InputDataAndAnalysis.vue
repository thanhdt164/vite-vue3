<template>
  <BaseArea title="Nhập liệu phân tích">
    <template v-slot:center-area>
      <Tab
			:listTab="listTab"
			:tab="tab"
			@update="updateTab($event)"
			>
        <template v-slot:SourceTypeAnalysis>
          <div class="grid-source-type">
            <v-col cols="6" style="height: 300px;">
              <Grid 
                titleGrid="Mức độ nhận biết"
                :showSearch="false"
                :showPaging="false"
                :showSelect="false"
              ></Grid>
            </v-col>
            <v-col cols="6" style="height: 300px;">
              <Grid 
                titleGrid="Loại kiến thức"
                :showSearch="false"
                :showPaging="false"
                :showSelect="false"
              ></Grid>
            </v-col>
          </div>
        </template>
        <template v-slot:DetailAnalysis>
          <Grid 
            titleGrid="Nội dung phân tích"
            :showSearch="false"
            :showPaging="false"
            :gridHeighExpand="-36"
          ></Grid>
        </template>
      </Tab>
    </template>
  </BaseArea>
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */
import BaseArea from '@/components/BaseArea.vue'
import Expansion from '@/components/Expansion.vue'
import Grid from '@/components/Grid.vue'
import Tab from "@/components/Template/Tab.vue"

/* EXPORT */
export default{
  name: "",
  components:{
    BaseArea,
    Expansion,
    Grid,
    Tab
  },
  data: () => ({
    listTab: [
			{ Key: "SourceTypeAnalysis", Title: "Bảng quy ước" },
			{ Key: "DetailAnalysis", Title: "Nội dung phân tích" },
		],
		tab: "SourceTypeAnalysis"
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

  },
  methods:{
    updateTab(val){
      this.tab = val;
    }
  }
}
/* STYLE */
</script>
<style scoped lang="scss">
.grid-source-type{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
<style lang="scss">

</style>