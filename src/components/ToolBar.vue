<template>
    <v-toolbar density="compact" class="c-toolbar">
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        
        <v-toolbar-title v-if="title">{{title}}</v-toolbar-title>
        
        <slot name="left-tool"></slot>
        <v-spacer></v-spacer>
        <slot name="right-tool"></slot>
        <!--  <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn> -->
    </v-toolbar>
</template>

<script>
export default{
    name: "ToolBar",
	components:{
		
	},
    data: () => ({
        titles: ['9A1', 'Vật lý', 'Kiểm tra cuối kì']

	}),
	props:{
		tmp_Prop: {
            type: [Number, Array, Object, String],
            default: 100
        },
        title:{
            type: String,
            default: ""
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
	created: () => {

	},
    methods:{
        // mergeQuiz() {
        //     $emit("mergeQuiz");
        // }
    }
}
 
</script>
<style scoped lang="scss">
.toolbar-title{
    text-align: left;
    font-size: 16px;
}

</style>
<style lang="scss">
.c-toolbar{
    font-size: 16px;;
    .v-toolbar__content{
        height: 56px !important;
    }
}
</style>