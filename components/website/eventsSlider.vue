<template>
  <div>
    <!-- <v-btn color="success" @click="$refs.slider.prev()">text</v-btn> -->
    <v-row v-if="(events || []).length > 1" justify="center" no-gutters>
      <v-btn
        depressed
        text
        tile
        x-large
        @click="$refs.slider.prev()"
      >
        <v-icon color="grey">
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-btn
        depressed
        text
        tile
        x-large
        @click="$refs.slider.next()"
      >
        <v-icon color="grey">
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-row>
    <v-carousel
      v-if="(events || []).length"
      ref="slider"
      height="auto"
      class="elevation-5"
      hide-delimiters
      :show-arrows="false"
    >
      <v-carousel-item v-for="event in events" :key="event._id">
        <v-card
          tile
          flat
          light
          width="100%"
          :ripple="false"
          :to="`events/${event._id}`"
        >
          <v-row no-gutters class="flex-md-row flex-column-reverse">
            <v-col cols="12" md="5">
              <v-row
                no-gutters
                class="flex-column fill-height"
                justify="space-between"
              >
                <div>
                  <v-card-title primary-title class="flex-column align-start">
                    <div class="display-1">
                      {{ event.subject }}
                    </div>
                    <div class="main--text">
                      {{ moment(event.startsOn).format('dddd, D MMM') }}
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <div class="body-1">
                      {{
                        (event.about || '').length > 450
                          ? event.about.slice(0, 450) + '...'
                          : event.about
                      }}
                    </div>
                  </v-card-text>
                </div>
                <v-card-text class="pt-0">
                  <div
                    class="text-truncate black--text font-weight-medium body-1"
                  >
                    {{ event.location.name + ' - ' + event.location.address }}
                  </div>
                </v-card-text>
              </v-row>
            </v-col>
            <v-col cols="12" md="7">
              <v-img
                :aspect-ratio="16 / 9"
                :src="
                  event.image &&
                    $axios.defaults.baseURL +
                    '/images/' +
                    event.image.name +
                    '?w=700'
                "
                :lazy-src="require('@/assets/images/placeholder.png')"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
    </v-carousel>
    <v-card v-else-if="loading" tile flat width="100%">
      <v-row no-gutters class="flex-md-row flex-column-reverse">
        <v-col cols="12" md="5">
          <v-row
            class="flex-column fill-height"
            justify="space-between"
            no-gutters
          >
            <v-skeleton-loader
              type="list-item-two-line"
              max-height="50"
              max-width="270"
            />
            <v-skeleton-loader
              type="list-item-two-line"
              max-height="50"
              max-width="140"
            />
            <v-skeleton-loader
              type="list-item-two-line"
              max-height="50"
              max-width="120"
            />
          </v-row>
        </v-col>
        <v-col cols="12" md="7">
          <v-skeleton-loader tile type="image" />
        </v-col>
      </v-row>
    </v-card>
    <v-card v-else tile flat min-height="200" width="100%">
      <v-row class="fill-height text-center flex-column" justify="center">
        <div class="mb-4">
          <v-icon size="80">
            mdi-emoticon-sad-outline
          </v-icon>
        </div>
        <div>
          It seems that there is no fresh events <br>
          Please stay tuned
        </div>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data: () => ({
    moment,
    events: null,
    loading: false
  }),
  mounted () {
    this.getLatestEvents()
  },
  methods: {
    getLatestEvents () {
      this.loading = true
      this.$axios
        .get('/events/latest')
        .then(({ data }) => {
          this.events = data.events
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style scoped></style>
