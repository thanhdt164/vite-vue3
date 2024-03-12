<template>
    <v-sheet class="pa-12" rounded>
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
            class="mb-2"
            clearable
            label="Tài khoản"
          ></v-text-field>
  
          <v-text-field
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
import ApiService from '/Education/vite-vue3/src/axios/axios.js';
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
        localStorage.setItem('token',res.data.data.access_token)
        this.$router.push("/notification");
      }
      if (!this.form) return
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
    required (v) {
      return !!v || 'Không được để trống'
    },
  },
}
</script>
<style  scoped>
.title-main{
  font-size: 24px;
  font-weight: bold;
}
</style>