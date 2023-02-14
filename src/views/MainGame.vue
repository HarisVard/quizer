<template>
  <v-app :style="{ 'background-image': 'url(' + backgroundImage + ')', 'background-size': 'cover' }">
    <v-container>
      <v-app-bar color="indigo" height="50">
        <v-toolbar-title class="ml-0 mr-auto" style="color: white; font-family: 'Creepster', sans-serif;">Quizer</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row class="hidden-sm-and-down">
          <v-col cols="9"></v-col>
          <v-col>
            <v-badge color="red" overlap>
              <template v-slot:badge>
                <div style="display: flex; flex-direction: column;">
                  <span style="color: white;">Score: {{ score }}</span>
                </div>
              </template>
            </v-badge>
          </v-col>
          <v-col>
            <v-badge color="blue" overlap>
              <template v-slot:badge>
                <div style="display: flex; flex-direction: column;">
                  <span style="color: white;">Question: {{ questions }}</span>
                </div>
              </template>
            </v-badge>
          </v-col>
        </v-row>
      </v-app-bar>
    </v-container>
    <v-container>
      <v-card class="mx-auto my-auto" max-width="600" style="background-color: #333;">
        <v-row>
          <v-col></v-col>
          <v-col align="center" style="color: white; font-family: 'Creepster', sans-serif;">Welcome!</v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col align="center" style="color: white; font-family: 'Creepster', sans-serif;">Player: {{ name }}!</v-col>
          <v-col align="center" style="color: white; font-family: 'Creepster', sans-serif;">Difficulty: {{ difficulty }}</v-col>
          <v-col align="center" style="color: white; font-family: 'Creepster', sans-serif;">Questions: {{ question_num }}</v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      name: this.$store.state.name,
      difficulty: this.$store.state.difficulty,
      question_num: this.$store.state.question_num,
      score: 0,
      questions: this.$store.state.question_num,
      backgroundImage: require('C:/Users/HarVard/Desktop/quizer/src/assets/riccardo-chiarini-XwIp301UMv8-unsplash.jpg'),
    }
  }
}
</script>