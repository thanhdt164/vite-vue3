<template >
  <v-app class="v-app">
      <v-layout class="rounded rounded-md">
        <!-- APP BAR -->
        <v-app-bar v-if="!loginOrRegister"
          title="PHÂN TÍCH KẾT QUẢ CỦA HỌC SINH">
          <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </template>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>
        <!-- SIDE BAR -->
        <v-navigation-drawer
          v-if="!loginOrRegister"
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
          class="side-bar"
        >
          <v-list-item
            prepend-avatar="https://lh3.googleusercontent.com/ogw/ANLem4Yrdxons-XolsmqCDGFZp0_1DOd-bE4qYm0YhZC=s32-c-mo"
            title="Thành Trung"
            nav
          >
            <template v-slot:append>
              <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <!-- <v-list-item v-show="checkrole('Menu')" @click="direct(1)" class="list-item" prepend-icon="mdi-puzzle" title="Danh mục" value="1"></v-list-item> -->
            <!-- <v-list-item v-show="checkrole('Notification')" @click="direct(2)" class="list-item" prepend-icon="mdi-bell-ring" title="Thông báo" value="2"></v-list-item> -->
            <v-list-item v-show="roleName?.includes('Teacher')" @click="direct(3)" class="list-item" prepend-icon="mdi-account" 
              title="Hồ sơ học sinh" 
              value="3"
            ></v-list-item>
            <v-list-item v-show="roleName?.includes('Teacher')" @click="direct(4)" class="list-item" prepend-icon="mdi-clipboard-text" 
              :title="'Danh sách đề thi'" 
              value="4"
            ></v-list-item>
            <v-list-item v-show="roleName?.includes('Student')" @click="direct(14)" class="list-item" prepend-icon="mdi-clipboard-text" 
              :title="'Bài kiểm tra'" 
              value="14"
            ></v-list-item>
            <v-list-item v-show="true" @click="direct(5)" class="list-item" prepend-icon="mdi-text-box-check-outline" title="Kết quả học sinh" value="5"></v-list-item>

            <v-list-item v-show="roleName?.includes('Teacher')" @click="direct(6)" class="list-item" prepend-icon="mdi-poll" title="Nhập liệu phân tích" value="6"></v-list-item>
            <!-- <v-list-item v-show="checkrole('Evaluate')" @click="direct(7)" class="list-item" prepend-icon="mdi-star" title="Đánh giá" value="7"></v-list-item> -->
            <v-list-item v-show="roleName?.includes('Teacher')" @click="direct(8)" class="list-item" prepend-icon="mdi-file-document-plus" title="Tạo đề kiểm tra" value="8"></v-list-item>
            <v-list-item v-show="roleName?.includes('Teacher')" @click="direct(9)" class="list-item" prepend-icon="mdi mdi-format-list-group-plus" title="Tạo kỳ thi" value="9"></v-list-item>
            <v-list-item v-show="roleName?.includes('Teacher')" @click="direct(10)" class="list-item" prepend-icon="mdi mdi-badge-account" title="Phân khối" value="10"></v-list-item>
            <!-- <v-list-group value="Template">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" class="list-item" prepend-icon="mdi-star" title="Template" value="100"></v-list-item>
              </template>
              <v-list-item
                v-for="([title, icon, url], i) in cruds"
                class="list-item" 
                :key="i"
                :prepend-icon="icon"
                :title="title"
                :value="title"
                @click="direct(url)"
              ></v-list-item>
            </v-list-group> -->
          </v-list>
        </v-navigation-drawer>
        
        <!-- ROUTER VIEW -->
        <v-main class="" style="min-height: 300px;">
          <router-view/>
        </v-main>
      </v-layout>
  </v-app>
</template>

<script>
import $ from "jquery";

window.jQuery = window.$ = $;

import mittObj from './plugins/mitt.js'
export default{
  data: () => ({
    drawer: true,
    rail: false,
    cruds: [
      ['Grid', 'mdi-plus-outline', '/template/grid'],
      ['Tab', 'mdi-file-outline', '/template/tab'],
      ['TextFields', 'mdi-update', '/template/textfields'],
      ['Steper', 'mdi-delete', '/template/steper'],
    ],
    roleName: ""
  }),
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
    loginOrRegister(){
      return this.$route.path == '/login' || this.$route.path == '/register'
    },
  },
  created(){
    if(localStorage.getItem('roleName')){
      this.roleName = localStorage.getItem('roleName')
    }
    mittObj.$on('updateRoleName', () => {
			this.roleName = localStorage.getItem('roleName')
		})
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
        case 14 :
          this.$router.push('/exams-user')
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
        case 9 :
          this.$router.push('/create-exam')
          break;
        case 10 :
          this.$router.push('/user-block')
          break;
        case 100 :
          this.$router.push('/template')
          break;
        default:
          let url = key;
          this.$router.push({ path: `${url}`, replace: true });
          break
      }
    },
    checkrole(permissionCode){
      let arrPermission = localStorage.getItem('permissions');
      return true;
    }
  }
}
</script>
<style lang="scss">
body,html {
  margin: 0 !important;
  padding: 0 !important;
}
* {
  box-sizing: border-box;
}
.side-bar{
  .v-avatar{
    --v-avatar-height: 40px;
  }
}
.v-btn--icon .v-btn--size-default {
  --v-btn-size: 1rem;
}
.v-btn--icon .v-btn--density-default {
  width: calc(var(--v-btn-height) + 9px);
  height: calc(var(--v-btn-height) + 9px);
}
// .v-list-group__items .v-list-item{
//   padding-inline-start: 36px;
// }
</style>
<style scoped lang="scss">
.v-app{
  max-height: 100vh;
  
  .v-container{
    padding: 0px;
  }
  .v-sheet{
    max-height: 100%;
    height: 100%;
  }
}
</style>
