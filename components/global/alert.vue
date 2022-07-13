<template>
  <div style="position: absolute">
    <v-alert
      v-model="show"
      :type="alert.type || 'info'"
      text
      dismissible
      class="alert-container"
    >
      {{ alert.message || 'test' }}
    </v-alert>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    show: true
  }),
  computed: mapState(['alert'])
}
</script>

<style scoped>
.alert-container {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 300;
  max-width: 460px;
  margin: auto;
  top: 15px;
}
</style>
