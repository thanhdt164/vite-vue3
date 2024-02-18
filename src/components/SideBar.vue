<template>
	<v-navigation-drawer
		class="nav"
		v-model="drawer"
		permanent
	>
		<v-list-item
			class="list-item"
			prepend-avatar="https://lh3.googleusercontent.com/ogw/ANLem4Yrdxons-XolsmqCDGFZp0_1DOd-bE4qYm0YhZC=s32-c-mo"
			title="Thanh Trung"
			nav
		>
			<!-- <template v-slot:append>
				<v-btn
					variant="text"
					icon="mdi-chevron-left"
					@click.stop="rail = !rail"
				></v-btn>
			</template> -->
		</v-list-item>

		<v-divider></v-divider>

		<v-list density="compact" nav>
			<v-list-item class="list-item" prepend-icon="mdi-home-city" title="Menu" value="1"></v-list-item>
			<v-list-item class="list-item" prepend-icon="mdi-account" title="Hồ sơ học sinh" value="2"></v-list-item>
			<v-list-item class="list-item" prepend-icon="mdi-account-group-outline" title="Bài kiểm tra" value="3"></v-list-item>
			<v-list-item class="list-item" prepend-icon="mdi-account-group-outline" title="Kết quả học sinh" value="4"></v-list-item>
			<v-list-item class="list-item" prepend-icon="mdi-account-group-outline" title="Nhập liệu phân tích" value="5"></v-list-item>
			<v-list-item class="list-item" prepend-icon="mdi-account-group-outline" title="Đánh giá" value="6"></v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>
<script>
  export default {
    data () {
      return {
        drawer: true,
        rail: true,
      }
    },
  }
</script>

<style scoped>
.nav{
	width: 300px !important;
}
.list-item{
	text-align: left;
}
</style>

