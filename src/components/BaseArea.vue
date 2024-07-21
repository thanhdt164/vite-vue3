<!-- TEMPLATE -->
<template>
  <div class="box-area w-full h-full">
    <div class="top-area">
      <v-row class="title">
        {{titleX}}
      </v-row>
      <v-row class="p-0">
        <ToolBar>
          <template v-slot:left-tool>
            <v-breadcrumbs :items="itemsBreadCrumbs">
              <template v-slot:title="{ item }">
                {{ item.title }}
              </template>
            </v-breadcrumbs>
          </template>
          <template v-slot:right-tool>
            <!-- <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn> -->
          </template>
        </ToolBar>
      </v-row>
    </div>
    <div class="center-area">
      <slot name="center-area"></slot>
    </div>
    <div class="bot-area">
      <slot name="bot-area"></slot>
    </div>
  </div>
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */
// import AppBar from '@/components/AppBar.vue'
// import SideBar from '@/components/SideBar.vue'
import ToolBar from '@/components/ToolBar.vue';

/* EXPORT */
export default{
  name: "BaseArea",
  components: {
    // AppBar, SideBar, 
    ToolBar
  },
  data: () => ({
    titleX: "",
    itemsBreadCrumbs: []
  }),
  props:{
    title:{
      type: String,
      default: "Nhập liệu phân tích"
    }
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
    this.titleX = this.title;
    // let pathItems = this.$route.fullPath.split('/');
    this.itemsBreadCrumbs.push({
      title: `Home`,
      disabled: true,
    })
    this.$route.matched.forEach((match, id) => {
      this.itemsBreadCrumbs.push({
        title: `${match.name}`,
        // disabled: id == pathItems.length,
        disabled: false,
        href: match.path
      })
    });
  },
  methods:{

  }
}
/* STYLE */
</script>
<style scoped lang="scss">
.box-area{
  display: flex;
  flex-direction: column;
  .top-area{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 28px;
    
    .title{
      height: 56px;
      align-items: center;
      padding: 0 16px !important;
    }
  }
  .center-area{
    font-size: 14px;
    height: calc(100% - 56px - 56px);
    overflow: scroll;
    padding: 0 0 0 24px !important;
    // padding: 0 !important;
  }
  .bot-area{
    // height: 56px;
  }
}
</style>
<style lang="scss">

</style>