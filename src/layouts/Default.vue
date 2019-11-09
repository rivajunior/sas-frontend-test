<template>
  <div>
    <AppNavBar />

    <b-container class="py-5">
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
