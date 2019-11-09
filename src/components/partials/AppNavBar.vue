<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand href="#">{{ appName }}</b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  data: () => ({
    appName: process.env.VUE_APP_NAME
  })
}
</script>
