<template>
  <div>
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

      <div role="radiogroup">
        <p class="mb-4">{{ decodeBase64(question) }}</p>

        <Answer
          v-for="_answer in answers"
          :key="_answer"
          :value="decodeBase64(_answer)"
          :active="answer === _answer"
          class="mb-3"
          @input="chooseAnswerHandler(_answer)"
        />
      </div>

      <template v-slot:footer>
        <b-row align-h="center" class="question-footer">
          <b-col lg="3">
            <b-btn
              variant="primary"
              size="lg"
              block
              :disabled="!answer || answered"
              :title="!answer ? 'Escolha uma opção antes' : ''"
              @click="verifyAnswer"
            >
              Responder
            </b-btn>
          </b-col>
        </b-row>
      </template>
    </b-card>

    <b-modal
      id="modal-result-question-result"
      size="sm"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      :content-class="`modal-${isRight ? 'success' : 'danger'}`"
      body-class="p-5"
    >
      <div class="text-center">
        <font-awesome-icon
          icon="check-circle"
          size="3x"
          :class="`mb-2 text-${isRight ? 'success' : 'danger'}`"
        />

        <h4>
          <template v-if="isRight">Você acertou!</template>
          <template v-else>Você errou!</template>
        </h4>

        <b-button
          variant="primary"
          class="mt-3"
          size="lg"
          @click="$bvModal.hide('modal-result-question-result')"
        >
          Avançar <font-awesome-icon icon="arrow-right" class="ml-3" />
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import shuffle from 'lodash.shuffle'
import { mapState, mapGetters } from 'vuex'
import Answer from './Answer.vue'

const DIFFICULTIES_NAMES = {
  easy: 'Fácil',
  medium: 'Média',
  hard: 'Difícil',
}

export default {
  components: { Answer },
  props: {
    incorrectAnswers: {
      type: Array,
      default: () => [],
    },
    correctAnswer: {
      type: String,
      default: '',
    },
    difficulty: {
      type: String,
      default: '',
    },
    question: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    questionNumber: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    answered: false,
    answer: null,
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
        'question-success': this.chooseRightAnswer,
      }
    },

    isRight() {
      return this.answer === this.correctAnswer
    },
  },

  methods: {
    decodeBase64(str) {
      return window.atob(str)
    },

    chooseAnswerHandler(answer) {
      this.answer = answer
    },

    verifyAnswer() {
      this.answered = true

      this.$emit('answered', this.isRight)
    },
  },
}
</script>

<style lang="scss" scoped>
.question-footer {
  padding: map-get($spacers, 3);
}
</style>
