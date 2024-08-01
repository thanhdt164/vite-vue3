<template>
		<v-sheet class="pa-12" rounded>
			<div class="logo">
				<img src="@/assets/thcs_nguyen_trai.jpg" alt="logo">
			</div>
			<v-card class="mx-auto px-6 py-8" max-width="344">
				<div class="d-flex align-center justify-center mb-8 title-main ">PHÂN TÍCH GIÁO DỤC</div>
				<v-form
					v-model="form"
					@submit.prevent="onSubmit"
				>
					<v-text-field
						v-model="email"
						:readonly="loading"
						:rules="[required]"
						class="login-field mb-2"
						clearable
						label="Tài khoản"
					></v-text-field>
				
					<v-text-field
						class="login-field"
						v-model="password"
						:readonly="loading"
						:rules="[required]"
						:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
						:type="show1 ? 'text' : 'password'"
						clearable
						label="Mật khẩu"
						placeholder="Nhập mật khẩu"
						@click:append="show1 = !show1"
					></v-text-field>
					<br>
					<v-btn
						:disabled="!form"
						:loading="loading"
						block
						color="success"
						size="large"
						type="submit"
						variant="elevated"
					>
						Đăng nhập
					</v-btn>
				</v-form>
			</v-card>
		</v-sheet>
	</template>
<script>
import ApiService from '../axios/axios.js';
import UserAPI from '@/axios/UserAPI.js';
export default {
	data: () => ({
		form: false,
		email: null,
		password: null,
		loading: false,
		show1:false
	}),
	created(){
		localStorage.clear('token')
	},
	methods: {
		async onSubmit () {
			var param = {
				Username :this.email,
				Password:this.password
			}
			var res = await ApiService.login(param);
			if(res && res.status == 200){
				this.$toast.success("Đăng nhập thành công");
				await this.initLogin(res.data);
				setTimeout(() => {
					this.$router.push("/exams");
				}, 1000);
			}
			if (!this.form) return
			this.loading = true

			setTimeout(() => (this.loading = false), 2000)
		},
		required (v) {
			return !!v || 'Không được để trống'
		},
		async initLogin (res) {
			this.processToken(res.data.access_token)
			// Call lấy dữ liệu userInfor, userOption
			var res = await UserAPI.InitLogin()
			localStorage.setItem('ListRole', res.data.data)
		},
		processToken(token){
			localStorage.setItem('token', token)
			var tokenParse = this.parseJwt(token);
			// this.$emitter.$emit('updaterole', token.RoleName)
    	localStorage.setItem('roleName', tokenParse.RoleName)
			debugger
		},
		parseJwt (token) {
			if(!token) return "";
			var base64Url = token?.split('.')[1];
			var base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
			var jsonPayload = decodeURIComponent(window.atob(base64)?.split('').map(function(c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join(''));

			return JSON.parse(jsonPayload);
		}
	},
}
</script>
<style lang="scss">
.login-field{
	.v-input__control{
		/* width: fit-content; */
		height: 40px;
	}
	.v-field__field{
		height: 40px;
		.v-field__input{
			height: 40px;
			min-height: auto;
		}
		
	}
}
</style>
<style lang="scss" scoped>
.title-main{
	font-size: 24px;
	font-weight: bold;
}
.logo{
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 300px;
	img{
		height: 200px;
		object-fit: contain;
	}
}
</style>