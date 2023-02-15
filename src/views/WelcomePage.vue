<template>
  <v-app :style="{ 'background-image': 'url(' + backgroundImage + ')', 'background-size': 'cover' }">
    <v-card class="mx-auto my-auto" color="#A67C52" max-width="400">
      <!-- Title of the card -->
      <v-card-title class="headline" color="#704214" style="font-size: 36px; font-weight: bold;">
        Welcome to the Quizer World!
      </v-card-title>

      <v-card-text>
        <!-- Text fields for user to enter their name, number of questions, and difficulty level -->
        <v-text-field v-model="name" label="Name" color="#704214"></v-text-field>
        <v-select label="Number of questions" color="#704214" v-model="question_num" :items="number_of_questions"></v-select>
        <v-select label="Difficulty" color="#704214" v-model="difficulty" :items="difficultyLevels"></v-select>

        <v-row>
          <v-col>
            <!-- Warning message displayed if user did not fill out required fields -->
            <p v-if="warningMessage" style="color: red;">Please fill all required fields.</p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <!-- Button to submit user input and start the quiz -->
        <v-btn class="quiz-button" color="#704214" elevation="5" @click="onSubmit">Enter</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>


<script>
export default {
  data () {
    return {
      name: '',
      difficulty: '',
      question_num:'',
      difficultyLevels: ['Easy', 'Medium', 'Hard'],
      number_of_questions: ['5', '10', '15','20','25','30'],
      backgroundImage: require('C:/Users/HarVard/Desktop/quizer/src/assets/pexels-pixabay-220096.jpg'),
      warningMessage: false,
    }
  },
  methods: {
    onSubmit () {
      // Check if any of the fields are empty
      if (!this.name || !this.difficulty || !this.question_num) {
        // Set warning message to true
        this.warningMessage = true;
      } else {
        // Set user's name, difficulty and number of questions in Vuex store
        this.$store.commit("setName", this.name);
        this.$store.commit("setDifficulty", this.difficulty);
        this.$store.commit("setQuestionsNumber", this.question_num);
        // Redirect to main game page
        this.$router.push('maingame');
      }
    }
  }
}
</script>


<style>
  /* Change primary and secondary colors to earth tones */
  :root {
    --v-primary-base: #704214;
    --v-secondary-base: #A67C52;
  }
  .quiz-button {
    color: black;
    font-family: 'Creepster', sans-serif;
    border: 2px solid black;
    padding: 10px;
    margin-top: 20px;
  }
</style>
