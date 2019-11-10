<template>
  <div>
    <AppNavBar />

    <b-container>
      <slot></slot>
    </b-container>
  </div>
</template>

<script>
import AppNavBar from '@/components/partials/AppNavBar.vue'

export default {
  components: { AppNavBar }
}
</script>
