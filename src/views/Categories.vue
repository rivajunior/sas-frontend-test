<template>
  <div class="categories py-5">
    <SectionTitle tag="h1">Categorias</SectionTitle>
    <b-row>
      <b-col
        v-for="category in categories"
        :key="category.id"
        cols="6"
        sm="4"
        md="3"
        class="pt-2 pb-3"
      >
        <CategoryItem v-bind="category" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CategoryItem from '@/components/commons/CategoryItem.vue'

export default {
  name: 'Categories',
  components: {
    CategoryItem,
  },
  computed: mapState(['categories']),
}
</script>

<style lang="scss" scoped>
.row:hover .category-item {
  will-change: box-shadow;
}
</style>
