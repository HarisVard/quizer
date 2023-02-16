<template>
  <v-app :style="{ 'background-image': 'url(' + backgroundImage + ')', 'background-size': 'cover' }">
    <v-container>
      <!-- The app bar that contains the name of the app, the score, and the remaining questions -->
      <v-app-bar color="#704214" height="50">
        <v-toolbar-title class="ml-0 mr-auto"
          style="color: black; font-weight: bold; font-size: 30px;">Quizer</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row class="hidden-sm-and-down">
          <v-col cols="9"></v-col>
          <v-col>
            <!-- The badge that displays the score -->
            <v-badge color="black" overlap>
              <template v-slot:badge>
                <div style="display: flex; flex-direction: column;">
                  <span style="color: #A67C52;">Score: {{ score }}</span>
                </div>
              </template>
            </v-badge>
          </v-col>
          <v-col>
            <!-- The badge that displays the remaining questions -->
            <v-badge color="black" overlap>
              <template v-slot:badge>
                <div style="display: flex; flex-direction: column;">
                  <span style="color: #A67C52;">Remaining: {{ remainingQuestions }}</span>
                </div>
              </template>
            </v-badge>
          </v-col>
        </v-row>
      </v-app-bar>
    </v-container>
    <v-container>
      <v-card class="mx-auto my-auto" max-width="600" style="background-color: #A67C52;">
        <!-- Welcome message row -->
        <v-row>
          <v-col></v-col>
          <v-col align="center" style="font-weight: bold; font-size: 25px;" elevation="5">Welcome!</v-col>
          <v-col></v-col>
        </v-row>

        <!-- Player info row -->
        <v-row>
          <v-col align="center" style="font-weight: bold; font-size: 17px;" elevation="5">Player: {{ name }}</v-col>
          <v-col align="center" style="font-weight: bold; font-size: 17px;" elevation="5">Difficulty: {{
            difficulty
          }}</v-col>
          <v-col align="center" style="font-weight: bold; font-size: 17px;" elevation="5">Questions: {{
            question_num
          }}</v-col>
        </v-row>
        <v-container>
          <template>
            <div>
              <div v-if="end">
                <!-- Display the final score and performance -->
                <v-row>
                  <v-col align="center"><span style="font-weight: bold; font-size: 17px;" elevation="5">Score: {{
                    score
                  }}</span></v-col>
                </v-row>
                <v-row>
                  <v-col align="center"><span style="font-weight: bold; font-size: 17px;" elevation="5">Result: {{
                    performance
                  }}</span></v-col>
                </v-row>
                <!-- Allow the user to finish the quiz -->
                <v-row>
                  <v-col align="center"><v-btn class="quiz-button" color="#704214" elevation="5"
                      @click="onSubmit">Finish</v-btn></v-col>
                </v-row>
              </div>
              <!-- Render a div with the v-else directive if the started property is false -->
              <div v-else>
                <!-- Render a div with the v-if directive if the started property is true and the user has not answered any questions yet -->
                <div v-if="!started">
                  <v-row>
                    <v-col align="center">
                      <button @click="startQuiz" class="quiz-button" style="font-weight: bold; font-size: 18px;"
                        elevation="5">Start Quiz</button>
                    </v-col>
                  </v-row>
                </div>
                <div v-else>
                  <v-row>
                    <v-col align="center" elevation="5">
                      <!-- Render a heading with the current question using the questions array and the currentQuestionIndex property -->
                      <h2 style="border: 2px solid black">{{ questions[currentQuestionIndex].question }}</h2>
                    </v-col>
                  </v-row>
                  <!-- Render an unordered list to display the answer choices for the current question -->
                  <ul style="list-style-type: none">
                    <v-row>
                      <v-col align="left">
                        <li v-for="(choice, choiceIndex) in questions[currentQuestionIndex].choices" :key="choiceIndex">
                          <label :class="{
                            'correct': isCorrect(choice), 'incorrect': isSelected(choice)
                              && !isCorrect(choice), 'highlight': hasAnswered && !isCorrect(choice) && choice === correctAnswer
                          }" style="padding: 5px;">
                            <!-- Bind the choice value to the radio button input and the selectedAnswer property using v-model, and disable the input if the user has already answered the question -->
                            <input type="radio" :value="choice" v-model="selectedAnswer" :disabled="hasAnswered">
                            <span style="cursor: pointer">{{ choice }}</span>
                          </label>
                        </li>
                      </v-col>
                    </v-row>
                  </ul>
                  <v-row>
                    <v-col align="center">
                      <button @click="nextQuestion" class="quiz-button" style="font-weight: bold; font-size: 18px;"
                        elevation="5">Next Question</button>
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
      backgroundImage: require('../assets/pexels-pixabay-220096.jpg'),
      questions: '',
      currentQuestionIndex: 0,
      selectedAnswer: '',
      started: false,
      hasAnswered: false,
      submitted: false,
      end: false,
      performance: '',
      result: '',
    }
  },
  async mounted() {
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
    onSubmit() {
      this.$router.push('/');
    },
    nextQuestion() {
      this.submitted = true;
      // Check if the user has answered the question
      if (this.hasAnswered) {
        if (this.isCorrect(this.selectedAnswer)) {
          this.score++;
        }
        // Move on to the next question
        this.currentQuestionIndex++;
        this.hasAnswered = false;
        this.submitted = false;
        this.remainingQuestions--;
      }
      // If there are no remaining questions, end the quiz and display performance stats
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
      // Construct the API URL using the question_num and difficulty properties
      const url = `https://opentdb.com/api.php?amount=${this.question_num}&difficulty=${this.difficulty.toLowerCase()}`;
      // Send a GET request to the API using axios and await the response
      const response = await axios.get(url);
      const results = response.data.results;
      // Map the results array to create an array of question obje
      const questions = results.map((result) => {
        let { question, correct_answer, incorrect_answers } = result;
        question = question.replace(/[^\w\s]/gi, '');
        correct_answer = correct_answer.replace(/[^\w\s]/gi, '');
        incorrect_answers = incorrect_answers.map(answer => answer.replace(/[^\w\s]/gi, ''));
        // Combine the correct answer with the incorrect answers and shuffle them
        const choices = incorrect_answers.concat(correct_answer).sort();
        return {
          question,
          choices,
          answer: correct_answer,
        };
      });
      this.questions = questions;
    },
    //set the performance base on the score and the nummber of questions
    performance_stats() {
      this.result = ((this.score / this.question_num) * 100).toFixed(0);
      if (this.result >= 80) {
        this.performance = `Great job! You got ${this.result}% of the questions right!`;
      }
      else if (this.result < 60) {
        this.performance = `You can do better! You got ${this.result}% of the questions right!`;
      }
      else {
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

.highlight {
  color: yellow;
}

.quiz-button {
  color: black;
  font-family: 'Creepster', sans-serif;
  border: 2px solid black;
  padding: 10px;
  margin-top: 20px;
}
</style>