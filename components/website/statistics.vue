<template>
  <v-row class="py-4">
    <v-col
      v-for="(item, i) in items"
      :key="i"
      sm="4"
      cols="12"
      class="d-flex flex-column align-center"
    >
      <div class="mx-auto my-2">
        <img width="70" :src="item.img" :alt="item.title">
      </div>
      <div
        v-if="item.value"
        class="display-1 font-weight-medium"
        v-text="formatNumber(item.value)"
      />
      <div v-else>
        ...
      </div>
      <div class="px-3 pb-1 my-2 grey lighten-2" />
      <div class="text-center text--secondary title" v-text="item.title" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: 'Events',
        img: require('~/assets/icons/events.png'),
        value: 0
      },
      {
        title: 'Tickets',
        img: require('~/assets/icons/tickets.png'),
        value: 0
      },
      {
        title: 'Participants',
        img: require('~/assets/icons/participants.png'),
        value: 0
      }
    ]
  }),
  mounted () {
    this.getInsights()
  },
  methods: {
    formatNumber (n) {
      if (n > 9999) { return '9,999+' } else {
        const s = n.toString()
        if (s.length > 3) {
          return [s.substring(0, s.length - 3), s.substring(s.length - 3)].join(
            ','
          )
        } else { return s }
      }
    },
    getInsights () {
      this.$axios.get('/insights/general').then(({ data }) => {
        this.items[0].value = data.events + 60
        this.items[1].value = data.tickets + 3600
        this.items[2].value = data.users + 1500
      })
    }
  }
}
</script>

<style></style>
