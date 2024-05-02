<!-- TEMPLATE -->
<template>
  <div class="box-area w-full">
    <div class="top-area">
      <!-- <v-row class="w-full">
        {{title}}
      </v-row> -->
      <ToolBar :title="titleX">
      </ToolBar>
    </div>
    <div class="center-area">
      <slot></slot>
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
    titleX: ""
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
    align-items: center;
    font-size: 28px;
    height: 56px;
  }
  .center-area{
    font-size: 14px;
    height: 100%;
    overflow: scroll;
  }
  .bot-area{

  }
}
</style>
<style lang="scss">

</style>