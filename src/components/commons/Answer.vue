<template>
  <b-card role="button" class="answer" @click="$emit('click', answer)">
    <b-card-text>
      {{ answer }}
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: {
    answer: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.answer {
  box-shadow: $box-shadow-sm;
  cursor: pointer;
  // border-radius: ;

  &:hover {
    box-shadow: $box-shadow;
  }
}
</style>
