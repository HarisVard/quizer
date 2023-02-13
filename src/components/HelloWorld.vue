<template>
  <v-app>
    <v-container class="d-flex align-center justify-center" fluid>
      <v-card class="elevation-12" dark>
        <v-card-title class="headline">Welcome to the Dark World</v-card-title>
        <v-card-text>
          <p>Enter your name to enter the dark world:</p>
          <v-text-field v-model="username" label="Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="enterDarkWorld">Enter</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  methods: {
    enterDarkWorld () {
      if (this.username) {
        this.$emit('enteredDarkWorld', this.username)
      }
    }
  }
}
</script>

<style>
  /* Add a spooky background image */
  body {
    background-image: url('../assets/riccardo-chiarini-XwIp301UMv8-unsplash.jpg');
    background-size: cover;
  }

  /* Add some spooky styles to the v-card */
  .v-card {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }

  /* Add some custom styles to the v-text-field */
  .v-text-field input {
    color: white;
  }
</style>
