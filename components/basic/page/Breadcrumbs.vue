<template>
  <ul class="breadcrumbs page-heading__breadcrumbs" :class="[isOneItem ? 'breadcrumbs--one-item' : '']">
    <li class="breadcrumbs__item" v-for="item in items" :key="item.text">
      <router-link v-if="item.to" :to="item.to" class="link breadcrumbs__link" tabIndex="-1">{{ item.text }}</router-link>
      <a v-else class="link breadcrumbs__link" href="#" tabIndex="-1">{{ item.text }}</a>
      <span class="breadcrumbs__slash">/</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: {
    items: Array
  },
  computed: {
    isOneItem() {
      return this.items.length === 1;
    }
  }
}
</script>

<style scoped>

</style>
