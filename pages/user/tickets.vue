<template>
  <div>
    <v-row>
      <v-col>
        <v-alert dense text border="left" type="warning" :value="true">
          Please note that more then 3 unchecked in tickets, your account will
          be banned for a while.
        </v-alert>
      </v-col>
    </v-row>
    <v-row justify="space-between" align="center" no-gutters>
      <span class="headline py-2">My tickets</span>
      <v-btn to="/events" rounded dark color="main">
        <span class="pr-4">events</span>
        <v-icon right>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-row>
    <div class="mt-12">
      <tickets-slider
        :loading="loading"
        :items="tickets"
        @cancel="(i) => tickets.splice(i, 1)"
      />
      <!-- <v-row>
        <v-col v-for="(ticket, i) in tickets" :key="i" cols="12" md="6">
        </v-col>
      </v-row> -->
    </div>
  </div>
</template>
<script>
import ticketsSlider from '~/components/user/ticketsSlider'

export default {
  components: {
    ticketsSlider
  },
  data: () => ({
    tickets: null,
    loading: true,
    query: {
      page: 1,
      limit: 10
    }
  }),
  head () {
    return {
      title: 'Tikets'
    }
  },
  mounted () {
    this.getTickets()
  },
  methods: {
    getTickets () {
      this.loading = true
      this.$axios
        .get('/orders/user', {
          params: { ...this.query }
        })
        .then(({ data }) => {
          this.tickets = data.tickets.filter(ticket =>
            ['coming', 'live'].includes(ticket.event.state)
          )
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>
