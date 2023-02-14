<template>
  <v-app :style="{ 'background-image': 'url(' + backgroundImage + ')', 'background-size': 'cover' }">
    <v-container>
      <v-app-bar color="indigo" height="50">
        <v-toolbar-title class="ml-0 mr-auto"
          style="color: white; font-family: 'Creepster', sans-serif;">Quizer</v-toolbar-title>
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
                  <span style="color: white;">Question: {{ questions1 }}</span>
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
          <v-col align="center" style="color: white; font-family: 'Creepster', sans-serif;">Difficulty: {{
            difficulty
          }}</v-col>
          <v-col align="center" style="color: white; font-family: 'Creepster', sans-serif;">Questions: {{
            question_num
          }}</v-col>
        </v-row>
        <template>
          <div>
            <h1>Quiz Questions</h1>
            <div v-if="showQuestions">
              <div v-for="(question, index) in questions" :key="index">
                <p>{{ index + 1 }}. {{ question.question }}</p>
                <ul>
                  <li v-for="(choice, index) in question.choices" :key="index">
                    <label>
                      <input type="radio" :name="index" @change="selectAnswer(index, choice)">
                      {{ choice }}
                    </label>
                  </li>
                </ul>
                <p v-if="selectedAnswers[index] !== undefined">
                  Your answer: {{ selectedAnswers[index] }}
                  <span v-if="selectedAnswers[index] === question.answer">✅</span>
                  <span v-else>❌</span>
                </p>
              </div>
            </div>
            <button v-else @click="startQuiz">Start</button>
          </div>
        </template>


      </v-card>
    </v-container>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: this.$store.state.name,
      difficulty: this.$store.state.difficulty,
      question_num: parseInt(this.$store.state.question_num),
      score: 0,
      questions1: this.$store.state.question_num,
      backgroundImage: require('C:/Users/HarVard/Desktop/quizer/src/assets/riccardo-chiarini-XwIp301UMv8-unsplash.jpg'),
      showButton: true,
      array_questions: [],
      selectedAnswer: null,
      showQuestions: false,
      questions: [],
    }
  },
  methods: {
    async generateQuestions() {
      this.showButton = false;
      const url = `https://opentdb.com/api.php?amount=${this.question_num}`;
      const response = await axios.get(url);
      const results = response.data.results;

      const questions = results.map((result) => {
        const { question, correct_answer, incorrect_answers } = result;
        const choices = incorrect_answers.concat(correct_answer).sort();

        return {
          question,
          choices,
          answer: correct_answer,
        };
      });

      console.log(questions);
    },
    selectAnswer(index, choice) {
      this.selectedAnswer = choice;
    },
    startQuiz() {
      this.showQuestions = true;
      this.generateQuestions();
    },
  },
}
</script>