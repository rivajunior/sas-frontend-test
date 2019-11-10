<template>
  <component :is="tag" class="title mb-4">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
}
</script>
