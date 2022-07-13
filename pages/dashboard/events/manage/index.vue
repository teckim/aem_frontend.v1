<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <span class="headline py-2">Manage events</span>
      <v-btn rounded color="success" to="/dashboard/events/create">
        <span class="pr-4">create</span>
        <v-icon right>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-row>
    <v-row no-gutters>
      <v-card flat class="mt-8 mb-4" width="100%">
        <v-tabs
          v-model="tabs"
          grow
          background-color="white"
          color="main"
          class="mb-1"
        >
          <v-tab :key="0" class="px-8">
            <span>Live</span>
          </v-tab>
          <v-tab :key="1" class="px-8">
            <span>Past</span>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs" class="pt-4">
          <v-tab-item :key="0">
            <events-list
              live
              :limit="liveQuery.limit"
              :items="liveEvents"
              :loading="loadingLiveEvents"
              @loadMore="liveQuery.page++"
              @refresh="getLiveEvents(true)"
            />
          </v-tab-item>
          <v-tab-item :key="1">
            <events-list
              :limit="pastQuery.limit"
              :items="pastEvents"
              :loading="loadingPastEvents"
              @loadMore="pastQuery.page++"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import eventsList from '~/components/dashboard/eventsList'
require('twix')

export default {
  components: {
    eventsList
  },
  data: () => ({
    tabs: null,
    liveEvents: [],
    pastEvents: [],
    events: [],
    loadingLiveEvents: false,
    loadingPastEvents: false,
    liveQuery: {
      page: 1,
      limit: 5
    },
    pastQuery: {
      page: 1,
      limit: 5
    }
  }),
  head () {
    return {
      title: 'Manage events'
    }
  },
  computed: {
    livePageNum () {
      return this.liveQuery.page
    },
    pastPageNum () {
      return this.pastQuery.page
    }
  },
  watch: {
    livePageNum (v) {
      this.getLiveEvents()
    },
    pastPageNum (v) {
      this.getPastEvents()
    }
  },
  mounted () {
    this.getLiveEvents()
    this.getPastEvents()
  },
  methods: {
    getLiveEvents (re = false) {
      if (re) {
        this.liveEvents = []
        this.liveQuery.page = 1
      }
      this.loadingLiveEvents = true
      this.$axios
        .get('/events/office', {
          params: { ...this.liveQuery, state: 'live' }
        })
        .then(({ data }) => {
          this.liveEvents.push(...data.events)
        })
        .finally(() => (this.loadingLiveEvents = false))
    },
    getPastEvents () {
      this.loadingPastEvents = true
      this.$axios
        .get('/events/office', {
          params: { ...this.pastQuery, state: 'past' }
        })
        .then(({ data }) => {
          this.pastEvents.push(...data.events)
        })
        .finally(() => (this.loadingPastEvents = false))
    }
  }
}
</script>
