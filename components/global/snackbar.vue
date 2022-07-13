<template>
  <div v-if="items.length">
    <v-snackbar
      v-for="(item, index) in items.filter((s) => s.showing)"
      :key="item.text + Math.random()"
      v-model="item.showing"
      :timeout="item.timeout"
      :color="item.color || 'info'"
      dense
      top
      :style="`top: ${index * 55 + 5}px`"
    >
      {{ item.text || '' }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    items: []
  }),
  watch: {
    snackbar ({ timeout, color, text, showing }) {
      this.items = this.items.filter(i => i.showing)
      this.items.push({ timeout, color, text, showing })
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapState(['snackbar'])
  }
}
</script>

<style></style>
