<template>
  <div>
    <h1>{{ selectedCategory }}</h1>
    <b-card></b-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['questions']),
    ...mapGetters(['getCategoryById'])
  },
  created() {
    this.loadQuestions()
  },
  methods: {
    ...mapActions(['loadQuestions'])
  }
}
</script>
