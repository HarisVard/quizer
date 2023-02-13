<template>
    <v-app>
        <v-card class="mx-auto my-auto" max-width="400">
        <v-card-title class="headline">Welcome!</v-card-title>
        <v-card-text>
          <p>Hello {{ name }}!</p>
        </v-card-text>
      </v-card>
    </v-app>
  </template>
  
  <script>
  export default {
    data () {
      return {
        name: this.$store.state.name
      }
    }
  }
  </script>
  
  <style>
    @import "~vuetify/dist/vuetify.min.css";
  </style>
  
  