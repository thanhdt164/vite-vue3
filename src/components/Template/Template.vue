<!-- TEMPLATE -->
<template>
    <BaseArea>
			
		</BaseArea>
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */
import BaseArea from '@/components/BaseArea.vue'
import Expansion from '@/components/Expansion.vue'

/* EXPORT */
export default{
	name: "",
	components:{
		BaseArea,
		Expansion
	},
  data: () => ({

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

	}
}
/* STYLE */
</script>
<style scoped lang="scss">

</style>
<style lang="scss">

</style>