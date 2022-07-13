<template>
  <div class="text-center py-12 mt-12">
    <h1 class="headline text-uppercase font-weight-bold mb-2">
      {{ text }}
    </h1>
    <v-divider class="main section-unerline" />
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.section-unerline {
  max-width: 28px;
  min-height: 4px;
  margin: auto;
}
</style>
