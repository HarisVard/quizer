<template>
    <v-app class="spooky-background">
      <v-card class="mx-auto my-auto" max-width="400">
        <v-card-title class="headline">Welcome to the Spooky World!</v-card-title>
        <v-card-text>
          <p>What's your name, brave adventurer?</p>
          <v-text-field v-model="name" label="Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="onSubmit">Enter</v-btn>
        </v-card-actions>
      </v-card>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: ''
      }
    },
    methods: {
      onSubmit() {
        this.$store.commit("setName", this.name);
        this.$router.push('maingame');
      }
    }
  }
  </script>
  
  <style>
  @import "../style.css";
</style>
  