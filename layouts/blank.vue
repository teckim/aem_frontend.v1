<template>
  <v-app>
    <snackbar />
    <div>
      <v-container fluid class="pa-0">
        <nuxt />
      </v-container>
    </div>
  </v-app>
</template>

<script>
import snackbar from '~/components/global/snackbar'
export default {
  components: {
    snackbar
  }
}
</script>
<style scoped>
.header {
  padding-top: 64px;
}
</style>
