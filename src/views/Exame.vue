<template>
  <div v-if="category" class="pt-2 pb-5">
    <div class="d-flex justify-content-between align-items-end pb-2">
      <h4>{{ category.name }}</h4>
      <b-btn variant="link" class="text-secondary" to="/">
        <font-awesome-icon :icon="['far', 'times-circle']" /> Fechar
      </b-btn>
    </div>

    <Question v-if="question" v-bind="question" question-number="1" @answer="answerHandler" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Question from '@/components/commons/Question.vue'

export default {
  components: { Question },

  data: () => ({
    category: null
  }),

  computed: {
    ...mapState(['questions', 'categories', 'difficulties']),
    ...mapGetters(['getCategoryById']),

    question() {
      const question = this.questions[0]

      if (!question) {
        return null
      }

      return {
        incorrectAnswers: question.incorrect_answers,
        correctAnswer: question.correct_answer,
        difficulty: question.difficulty,
        question: question.question,
        category: question.category,
        type: question.type
      }
    },

    fails() {
      return this.questions.filter(question => question.user_answer === question.correct_answer)
    },

    hits() {
      return this.questions.filter(question => question.user_answer !== question.correct_answer)
    }
  },

  watch: {
    sameLevelConsecutiveHit(hits) {
      if (hits <= this.sameLevelFailsLimit) {
        this.decreaseDifficulty()
      } else if (hits >= this.sameLevelHitsLimit) {
        this.encreaseDifficulty()
      }
    },

    $route: 'fetchData',
    categories: 'fetchData'
  },

  created() {
    if (this.categories.length > 0) {
      this.fetchData()
    }
  },

  methods: {
    ...mapActions(['loadQuestions']),

    fetchData() {
      const categoryId = parseInt(this.$route.params.id, 10)
      const difficulty = this.currentDifficulty

      this.category = this.getCategoryById(categoryId)

      this.$Progress.start()

      this.loadQuestions({ categoryId, difficulty, amount: 1 }).finally(() => {
        this.$Progress.finish()
      })
    },

    answerHandler({ hit }) {
      if (hit) {
        this.sameLevelConsecutiveHit += 1
      } else {
        this.sameLevelConsecutiveHit -= 1
      }
    },

    decreaseDifficulty() {
      const currentDifficultyIndex = this.getDifficultyIndex(this.question.difficulty)

      if (currentDifficultyIndex > 0) {
        this.currentDifficulty = this.difficulties[currentDifficultyIndex - 1]
      }
    },

    encreaseDifficulty() {
      const currentDifficultyIndex = this.getDifficultyIndex(this.question.difficulty)

      if (currentDifficultyIndex < this.difficulties.length - 1) {
        this.currentDifficulty = this.difficulties[currentDifficultyIndex + 1]
      }
    }
  }
}
</script>
