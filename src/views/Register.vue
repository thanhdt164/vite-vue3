<template>
    <div class="register-field d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form fast-fail @submit.prevent="signup">
                <v-text-field v-model="name" label="Tên người dùng"></v-text-field>
                <v-text-field v-model="fullName" label="Tên đăng nhập"></v-text-field>
                <v-text-field v-model="email" label="Email"></v-text-field>
                <v-text-field 
                    v-model="password" 
                    :type="show ? 'text' : 'password'" 
                    label="Mật khẩu"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                ></v-text-field>
                <v-text-field 
                    v-model="rePassword" 
                    :type="show1 ? 'text' : 'password'" 
                    :rules="[requireRePassword]"
                    label="Nhập lại mật khẩu"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                ></v-text-field>

                <v-btn type="submit" color="primary" block class="mt-2">Đăng ký ngay</v-btn>
            </v-form>
            <div class="mt-2">
                <p class="text-body-2">
                   Bạn đã có tài khoản? <span  @click="goLogin">Đăng nhập ngay</span>
                </p>
            </div>
        </v-sheet>
    </div>
</template>
<script>
import ApiService from '../axios/axios.js';

export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            fullName:"",
            show:false,
            show1:false
        };
    },
    methods: {
        async signup() {
            var param = {
                UserName:this.name,
                FullName:this.fullName,
                Password:this.password
            }
            var res = await ApiService.InsertUser(param)
            if(res && res.data.success){
                this.$toast.success("Đăng ký thành công")
                this.$router.push("/login");
            }
        },
        goLogin(){
            this.$router.push("/login");
        },
        requireRePassword(val){
            if (this.password != val){
                return "Cần nhập giống mật khẩu";
            }
        }
    },
};
</script>

<style lang="scss">
.register-field{
	.v-input__control{
		/* width: fit-content; */
		height: 56px;
	}
	.v-field__field{
		height: 56px;
		.v-field__input{
			height: 56px;
			min-height: auto;
		}
		
	}
	// .v-input--density-default{
	// 	--v-input-control-height: 40px;
	// 	--v-input-padding-top: 0px;
	// 	--v-input-padding-bottom: 0px;
	// 	--v-field-padding-bottom: 0px;
	// }
}
</style>