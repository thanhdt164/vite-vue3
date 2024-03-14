<script setup>
import AppBar from './components/AppBar.vue'
import SideBar from './components/SideBar.vue'
import { useRoute } from 'vue-router'
const route = useRoute();
</script>

<template >
    <v-app class="v-app">
      <!-- APP BAR -->
      <app-bar v-if="route.path !== '/login'"></app-bar>
      <v-main class="v-main">
        <!-- SIDE BAR -->
        <side-bar v-if="route.path !== '/login'"></side-bar>
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
.container{
  position: absolute;
  /* background: gray; */
  left: 300px;
  height: 100%;
  width: calc(100% - 300px);
  padding: 24px;
 
}
.sheet{
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
}
.gray{
  background: gray;
}
.v-main{
  position: absolute;
  top: 64px;
  min-width: 100vw;
  height: calc(100vh - 64px);
  margin: 0 !important;
  padding: 0 !important;
}
.m-0{
  margin: 0 !important;
}
.p-0{
  padding: 0 !important;
}



/* Scroll */
.light::-webkit-scrollbar {
  width: 15px;
}

.light::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: black;
}

.dark::-webkit-scrollbar {
  width: 15px;
}

.dark::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.dark::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
