<template>
    <v-app>
      <v-card class="mx-auto my-5" max-width="400">
        <v-card-title class="headline">Welcome!</v-card-title>
        <v-card-text>
          <p>Hello {{ name }}!</p>
        </v-card-text>
      </v-card>
    </v-app>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    computed: {
      ...mapState(['name'])
    }
  }
  </script>
  
  <style>
    @import "~vuetify/dist/vuetify.min.css";
  </style>
  