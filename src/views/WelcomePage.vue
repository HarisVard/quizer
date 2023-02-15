<template>
  <v-app :style="{ 'background-image': 'url(' + backgroundImage + ')', 'background-size': 'cover' }">
    <v-card class="mx-auto my-auto" max-width="400">
      <v-card-title class="headline">Welcome to the Quizer World!</v-card-title>
      <v-card-text>
        <v-text-field v-model="name" label="Name"></v-text-field>
        <v-select label="Number of questions" v-model="question_num" :items="number_of_questions"></v-select>
        <v-select label="Difficulty" v-model="difficulty" :items="difficultyLevels"></v-select>
        <v-row>
          <v-col>
            <p v-if="warningMessage" style="color: red;">Please fill all required fields.</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="onSubmit">Enter</v-btn>
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
      backgroundImage: require('C:/Users/HarVard/Desktop/quizer/src/assets/riccardo-chiarini-XwIp301UMv8-unsplash.jpg'),
      warningMessage: false,
    }
  },
  methods: {
    onSubmit () {
      if (!this.name || !this.difficulty || !this.question_num) {
        this.warningMessage = true;
      } else {
        this.$store.commit("setName", this.name);
        this.$store.commit("setDifficulty", this.difficulty);
        this.$store.commit("setQuestionsNumber", this.question_num);
        this.$router.push('maingame');
      }
    }
  }
}
</script>
