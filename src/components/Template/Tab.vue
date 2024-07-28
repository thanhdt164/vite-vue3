<!-- TEMPLATE -->
<template>
	<v-card class="tab-card">
		<!-- Title tab -->
		<v-tabs v-model="tabX" align-tabs="center">
			<v-tab v-for="(item, id) in listTabX" :key="id" :value="item.Key">{{item.Title}}</v-tab>
		</v-tabs>
		<!-- Content tab -->
		<v-tabs-window v-model="tabX">
			<v-tabs-window-item>
				<v-container fluid>
					<v-row> 
						<slot :name="currentTab.Key">{{ currentTab.Title }}</slot>
					</v-row>
				</v-container>
			</v-tabs-window-item>
		</v-tabs-window>
	</v-card>
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
		tabX: 1,
		listTabX: []
	}),
	props:{
		listTab: {
			type: Array,
			default: [
				{ Key: 1, Title: "Landscape"}, 
				{ Key: 2, Title: "City"}, 
				{ Key: 3, Title: "Abstract"}, 
			]
		},
		tab:{
			type: [Number, String],
			default: 1
		}
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
		currentTab(){
			var currentTab = this.listTabX.find(x => x.Key == this.tabX)
			return currentTab;
		}
	},
	created(){
		this.tabX = this.tab ?? this.tabX;
		this.listTabX = this.listTab ?? this.listTabX;
		this.$mitt.$on('changeTab', (tabKey) => {
			this.tabX = tabKey
		})
	},
	destroyed(){		
		this.$mitt.$off('changeTab')
	},
	methods:{

	}
}
</script>
<!-- /* STYLE */ -->
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