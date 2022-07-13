<template>
  <div>
    <div class="py-8 my-8 grey lighten-3">
      <!-- <touch class="right bottom white" /> -->
      <v-container class="mt-12">
        <v-card flat class="mx-auto transparent text-center">
          <h1>BROWSE EVENTS</h1>
          <div class="text--secondary">
            Find what suits you and get a ticket
          </div>
        </v-card>
      </v-container>
    </div>
    <div style="position: relative">
      <touch class="left bottom grey lighten-3" />
    </div>
    <div>
      <v-container>
        <search-bar ref="search" @search="search" />
        <v-row v-if="loading && !events.length">
          <v-card
            v-for="i in 4"
            :key="i"
            outlined
            class="mx-auto my-5"
            min-width="280"
            flat
            max-width="280"
          >
            <v-skeleton-loader type="image" />
            <v-skeleton-loader
              type="list-item"
              max-height="34"
              max-width="140"
            />
            <v-skeleton-loader
              type="list-item-two-line"
              max-height="75"
              max-width="200"
            />
          </v-card>
        </v-row>
        <v-card
          v-else-if="!events || !events.length"
          tile
          flat
          class="mx-auto my-12"
          min-height="200"
          width="100%"
        >
          <v-row class="fill-height text-center flex-column" justify="center">
            <div class="mb-4">
              <v-icon size="80">
                mdi-emoticon-sad-outline
              </v-icon>
            </div>
            <div>
              Sorry, It seems that there is no events <br>
              Please try somthing else, or
              <a @click="$refs.search.resetFilters">Reset filters</a>
            </div>
          </v-row>
        </v-card>
        <template v-else>
          <v-row>
            <v-col
              v-for="(event, i) in events"
              :key="i"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
            >
              <event-card :item="event" />
            </v-col>
          </v-row>
          <div class="text-center py-5 mb-12">
            <v-btn
              rounded
              text
              color="primary"
              :loading="loading"
              :disabled="noMore"
              @click="page.number++"
            >
              <v-icon left>
                mdi-chevron-down
              </v-icon>
              load more
            </v-btn>
          </div>
        </template>
      </v-container>
    </div>
  </div>
</template>

<script>
import searchBar from '~/components/website/searchBar'
import eventCard from '~/components/website/eventCard'
import touch from '~/components/website/touch'
export default {
  components: {
    searchBar,
    eventCard,
    touch
  },
  data: () => ({
    office: null,
    project: null,
    events: [],
    loading: true,
    loadingMore: false,
    noMore: false,
    page: {
      number: 1,
      limit: 12
    }
  }),
  head () {
    return {
      title: 'Events'
    }
  },
  computed: {
    query () {
      const q = {}
      if (this.office) {
        q.office = this.office
      }
      if (this.project) {
        q.project = this.project
      }
      return q
    }
  },
  watch: {
    query (v) {
      this.init()
      this.loadEvents(v)
    },
    'page.number' () {
      this.loadEvents(this.query)
    }
  },
  methods: {
    init () {
      this.page.limit = 12
      this.page.number = 1
      this.events = []
      this.noMore = false
    },
    search (query) {
      if (query.office) { this.office = query.office._id } else { this.office = null }
      this.project = query.project
    },
    getEvents (query) {
      this.noMore = false
      this.loading = true
      this.$axios
        .get('/events', {
          params: { ...query, page: this.page }
        })
        .then(({ data }) => {
          this.events = data.docs
          if (data.page === data.totalPages) { this.noMore = true }
        })
        .finally(() => (this.loading = false))
    },
    loadEvents (query) {
      this.loading = true
      // this.page.number++
      this.$axios
        .get('/events', {
          params: { ...query, page: this.page }
        })
        .then(({ data }) => {
          if (data.page === data.totalPages) { this.noMore = true }
          this.events.push(...data.docs)
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style></style>
