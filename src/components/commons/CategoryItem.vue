<template>
  <div class="category-item">
    <router-link :to="`/category/${id}/exame`" class="category-name stretched-link">
      {{ name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CategoryItem',
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.category-item {
  display: flex;
  align-items: flex-end;
  height: 104px;
  padding: map-get($spacers, 3);
  border: 0;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-sm;
  transition: box-shadow 0.3s ease-out;
  background-color: $white;

  &:hover {
    box-shadow: $box-shadow;
  }
}

.category-name {
  font-size: 1.125rem;
  font-weight: $font-weight-bold;
  color: $body-color;
  text-decoration: none;
}
</style>
