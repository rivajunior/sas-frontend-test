<template>
  <b-card
    role="radio"
    :aria-checked="active"
    :tabindex="0"
    :class="{ answer: true, active: active }"
    @click="$emit('input', value)"
  >
    <b-card-text>
      {{ value }}
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    active: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.answer {
  box-shadow: $box-shadow-sm;
  border: 2px solid transparent;
  cursor: pointer;

  &:hover,
  &:focus {
    box-shadow: $box-shadow;
  }

  &:hover {
    will-change: border-color;
  }

  &.active {
    border-color: $primary;
  }
}
</style>
