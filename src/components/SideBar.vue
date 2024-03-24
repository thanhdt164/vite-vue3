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
			<v-list-item @click="direct(1)" class="list-item" prepend-icon="mdi-puzzle" title="Danh mục" value="1"></v-list-item>
			<v-list-item @click="direct(2)" class="list-item" prepend-icon="mdi-bell-ring" title="Thông báo" value="2"></v-list-item>
			<v-list-item @click="direct(3)" class="list-item" prepend-icon="mdi-account" title="Hồ sơ học sinh" value="3"></v-list-item>
			<v-list-item @click="direct(4)" class="list-item" prepend-icon="mdi-clipboard-text" title="Bài kiểm tra" value="4"></v-list-item>
			<v-list-item @click="direct(5)" class="list-item" prepend-icon="mdi-text-box-check-outline" title="Kết quả học sinh" value="5"></v-list-item>
			<v-list-item @click="direct(6)" class="list-item" prepend-icon="mdi-poll" title="Nhập liệu phân tích" value="6"></v-list-item>
			<v-list-item @click="direct(7)" class="list-item" prepend-icon="mdi-star" title="Đánh giá" value="7"></v-list-item>
			<v-list-item @click="direct(8)" class="list-item" prepend-icon="mdi-star" title="Tạo đề kiểm tra" value="8"></v-list-item>
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
	methods:{
		direct(key){
			switch(key){
				case 1 :
					this.$router.push('/menu')
					break;
				case 2 :
					this.$router.push('/notification')
					break;
				case 3 :
					this.$router.push('/profiles')
					break;
				case 4 :
					this.$router.push('/exams')
					break;
				case 5 :
					this.$router.push('/students')
					break;
				case 6 :
					this.$router.push('/input-data-and-analysis')
					break;
				case 7 :
					this.$router.push('/evaluate')
					break;
				case 8 :
					this.$router.push('/quiz-maker')
					break;
			}
			
		}
	}
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

