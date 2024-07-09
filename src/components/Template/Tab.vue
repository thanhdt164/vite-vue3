<!-- TEMPLATE -->
<template>
  <BaseArea title="Template Tab">
    <template v-slot:center-area>
      <v-card class="tab-card">
        <!-- Title tab -->
        <v-tabs v-model="tab" align-tabs="end">
          <v-tab :value="1">Landscape</v-tab>
          <v-tab :value="2">City</v-tab>
          <v-tab :value="3">Abstract</v-tab>
        </v-tabs>
        <!-- Content tab -->
        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-if="tab==1">
            <v-container  fluid>
              <v-row> tab1 </v-row>
            </v-container>
          </v-tabs-window-item>
          <v-tabs-window-item v-if="tab==2">
            <v-container  fluid>
              <v-row> tab2 </v-row>
            </v-container>
          </v-tabs-window-item>
          <v-tabs-window-item v-if="tab==3">
            <v-container  fluid>
              <v-row> tab3 </v-row>
            </v-container>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </template>
  </BaseArea>
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */
import BaseArea from '@/components/BaseArea.vue'

/* EXPORT */
export default{
  name: "Tab",
  components:{
    BaseArea,
  },
  data: () => ({
    tab: 1,

  }),
  props:{
    tmp_Prop: {
      type: [Number, Array, Object, String],
      default: 100
    },
  },
  watch:{
    tmp_obj: {
      handler(newVal) {
        
      },
      deep: true, 
      immediate: true, 
      once: true, 
    }
  },
  computed: {

  },
  created(){
    
  },
  methods:{

  }
}
</script>
/* STYLE */

<style lang="scss">
.tab-card{
  box-shadow: none !important;
  .v-card--variant-elevated{
    // box-shadow: none;
  }
  .v-tabs--density-default{
    --v-tabs-height: 36px;
  }

  .v-btn__content{
    text-transform: none;
  }
}
</style>
<style scoped lang="scss">

</style>