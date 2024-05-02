<!-- TEMPLATE -->
<template>
    
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */


/* EXPORT */
export default{
  data: () => {

	},
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
	created: () => {

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