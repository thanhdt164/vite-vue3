<script setup>
import AppBar from './components/AppBar.vue'
import SideBar from './components/SideBar.vue'
import { useRoute } from 'vue-router'
const route = useRoute();
</script>

<template >
    <v-app class="v-app">
      <!-- APP BAR -->
      <app-bar v-if="route.path !== '/login' && route.path !== '/register'"></app-bar>
      <v-main class="v-main">
        <!-- SIDE BAR -->
        <side-bar v-if="route.path !== '/login' && route.path !== '/register'"></side-bar>
        <!-- MAIN CONTENTS-->
        <router-view/>
      </v-main>
    </v-app>
</template>

<style>
body,html {
  margin: 0 !important;
  padding: 0 !important;
}
* {
  box-sizing: border-box;
}
</style>
<style scoped>
.v-app{
  margin: 0 !important;
  padding: 0 !important;
}
.m-0{
  margin: 0 !important;
}
.p-0{
  padding: 0 !important;
}
</style>
