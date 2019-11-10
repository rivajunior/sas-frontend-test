<template>
  <b-card class="question">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h6 class="mb-0">Questão {{ questionNumber }}</h6>

      <div>
        <b-badge variant="light" pill class="py-1 font-weight-normal">
          <font-awesome-icon
            v-for="(_difficulty, index) in difficulties"
            :key="_difficulty"
            :icon="[index <= difficultyIndex ? 'fas' : 'far', 'star']"
          />

          {{ difficultyName }}
        </b-badge>
      </div>
    </div>

    <p>{{ decodeBase64(question) }}</p>

    <Answer
      v-for="answer in answers"
      :key="answer"
      :answer="decodeBase64(answer)"
      class="mb-3"
      @click="setAnswer(answer)"
    />
  </b-card>
</template>

<script>
import shuffle from 'lodash.shuffle'
import { mapState, mapGetters } from 'vuex'
import Answer from './Answer.vue'

const DIFFICULTIES_NAMES = {
  easy: 'Fácil',
  medium: 'Média',
  hard: 'Difícil'
}

export default {
  components: { Answer },
  props: {
    incorrectAnswers: {
      type: Array,
      default: () => []
    },
    correctAnswer: {
      type: String,
      default: ''
    },
    difficulty: {
      type: String,
      default: ''
    },
    question: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    questionNumber: {
      type: String,
      required: true
    }
  },

  data: () => ({
    answered: false,
    answer: null
  }),

  computed: {
    ...mapState(['difficulties']),
    ...mapGetters(['getDifficultyIndex']),

    answers() {
      const answers = [...this.incorrectAnswers]

      if (!answers) {
        return []
      }

      answers.push(this.correctAnswer)

      return shuffle(answers)
    },

    decodedDifficulty() {
      return this.decodeBase64(this.difficulty)
    },

    difficultyName() {
      return DIFFICULTIES_NAMES[this.decodedDifficulty]
    },

    difficultyIndex() {
      return this.getDifficultyIndex(this.decodedDifficulty)
    },

    classes() {
      return {
        question: true,
        'question-success': this.chooseRightAnswer
      }
    }
  },

  methods: {
    decodeBase64(str) {
      return window.atob(str)
    },

    chooseAnswerHandler(answer) {
      this.answer = answer
    },

    isRight() {
      return this.answer === this.correctAnswer
    },

    verifyAnswer() {
      this.answered = true

      this.$emit('answered', this.isRight())
    }
  }
}
</script>
