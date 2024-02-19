<template>
    <v-app-bar :elevation="1" class="app-bar">
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title class="app-bar-title">Phân tích kết quả của học sinh</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<style scoped>
.app-bar{
    height: 64px;
    .app-bar-title{
        text-align: left;
    }
}
</style>