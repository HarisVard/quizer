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
                  <span style="color: white;">Remaining: {{ remainingQuestions }}</span>
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

        <v-container>
          <template>
            <div>
              <div v-if="end">

                <v-row>
                  <v-col align="center" style="color: white; font-family: 'Creepster', sans-serif;"><span style="color: white;">Score: {{ score }}</span></v-col>
                </v-row>
                <v-row>
                  <v-col align="center" style="color: white; font-family: 'Creepster', sans-serif;"><span style="color: white;">Result: {{ performance }}</span></v-col>
                </v-row>
              </div>



              <div v-else>
                <div v-if="!started">
                  <v-row>
                    <v-col align="center" style="color: white; font-family: 'Creepster', sans-serif;"><button
                        @click="startQuiz">Start Quiz</button></v-col>
                  </v-row>
                </div>
                <div v-else>
                  <v-row>
                    <v-col align="center" style="color: white; font-family: 'Creepster', sans-serif;">
                      <h2>{{ questions[currentQuestionIndex].question }}</h2>
                    </v-col>
                  </v-row>
                  <ul>
                    <v-row>
                      <v-col align="center" style="color: white; font-family: 'Creepster', sans-serif;">
                        <li v-for="(choice, choiceIndex) in questions[currentQuestionIndex].choices" :key="choiceIndex">
                          <label
                            :class="{ 'correct': isCorrect(choice), 'incorrect': isSelected(choice) && !isCorrect(choice) }">
                            <input type="radio" :value="choice" v-model="selectedAnswer" :disabled="hasAnswered">
                            {{ choice }}
                          </label>
                        </li>
                      </v-col>
                    </v-row>
                  </ul>
                  <v-row>
                    <v-col align="center" style="color: white; font-family: 'Creepster', sans-serif;">
                      <button @click="nextQuestion">Next Question</button>
                    </v-col>
                  </v-row>
                  
                  <div v-if="!hasAnswered && submitted">
                    <p>Please select an answer before moving on to the next question.</p>
                  </div>
                </div>


              </div>

            </div>
          </template>
        </v-container>


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
      remainingQuestions: this.$store.state.question_num,
      backgroundImage: require('C:/Users/HarVard/Desktop/quizer/src/assets/riccardo-chiarini-XwIp301UMv8-unsplash.jpg'),
      questions: '',
      currentQuestionIndex: 0,
      selectedAnswer: '',
      started: false,
      hasAnswered: false,
      submitted: false,
      end: false,
      performance:'',
      result:'',
    }
  },
  async mounted() {
    // GET request using axios with async/await
    this.generateQuestions();
  },
  computed: {
    correctAnswer() {
      return this.questions[this.currentQuestionIndex].answer;
    },
  },
  methods: {
    startQuiz() {
      this.started = true;
    },
    nextQuestion() {
      this.submitted = true;
      if (this.hasAnswered) {
        if (this.isCorrect(this.selectedAnswer)) {
          this.score++;
        }
        this.currentQuestionIndex++;
        this.hasAnswered = false;
        this.submitted = false;
        this.remainingQuestions--;
      }
      if (this.remainingQuestions == 0) {
        this.end = true;
        this.performance_stats()
      }
    },
    isCorrect(choice) {
      return this.selectedAnswer === choice && this.selectedAnswer === this.correctAnswer;
    },
    isSelected(choice) {
      return this.selectedAnswer === choice;
    },
    async generateQuestions() {
      const url = `https://opentdb.com/api.php?amount=${this.question_num}&difficulty=${this.difficulty.toLowerCase()}`;
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
      this.questions = questions;
      console.log(this.questions);
    },
    performance_stats(){
      this.result = (this.score / this.question_num) * 100;
      if(this.result >= 80){
        this.performance = `Great job! You got ${this.result}% of the questions right!`;       
      }
      else if(this.result <60){
        this.performance = `You can do better! You got ${this.result}% of the questions right!`;
      }
      else{
        this.performance = `Good job! You got ${this.result}% of the questions right!`;
      }
    }
  },
  watch: {
    selectedAnswer() {
      this.hasAnswered = true;
    },
  },
}
</script>

<style scoped>
.correct {
  color: green;
}

.incorrect {
  color: red;
}
</style>