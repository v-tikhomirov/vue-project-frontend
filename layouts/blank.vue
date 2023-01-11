<template>
  <div>
     <sprite/>
     <Nuxt />
  </div>
</template>

<script>
  import sprite from "./blocks/sprite.vue";
  export default {
    name: 'Blanklayout',
    components: {
      sprite
    },
  }
</script>
