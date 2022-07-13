<template>
  <div class="py-8 my-8">
    <div v-if="event && event.sponsors.length" class="mt-8">
      <div class="text-center title text--secondary">
        Sponsored by
      </div>
      <sponsors :height="200" :items="event.sponsors" />
    </div>
    <v-container class="mt-8">
      <v-card v-if="!loadingEvent && !!event" raised>
        <v-row no-gutters>
          <v-col cols="12" md="7">
            <v-img
              :aspect-ratio="16 / 9"
              :src="
                event.image &&
                  $axios.defaults.baseURL +
                  '/images/' +
                  event.image.name +
                  '?w=600'
              "
              :lazy-src="require('@/assets/images/placeholder.png')"
            />
          </v-col>
          <v-col cols="12" md="5">
            <v-row
              no-gutters
              class="flex-column fill-height"
              justify="space-between"
            >
              <div>
                <v-card-title primary-title class="flex-column align-start">
                  <div class="main--text">
                    {{ moment(event.startsOn).fromNow() }}
                  </div>
                  <div class="display-1 mb-12">
                    {{ event.subject }}
                  </div>
                </v-card-title>
              </div>
              <v-card-text class="pt-0">
                <div class="black--text font-weight-bold title">
                  {{
                    !event.price
                      ? 'Free'
                      : event.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                  }}
                  <span v-if="event.price" class="overline">
                    {{ event.office.currency }}
                  </span>
                </div>
              </v-card-text>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-app-bar flat tile height="64" color="grey lighten-5">
            <v-btn
              depressed
              tile
              height="64"
              class="ml-n4"
              color="grey lighten-5"
              @click="shareDialog = true"
            >
              <v-icon color="primary">
                mdi-share-variant
              </v-icon>
            </v-btn>
            <v-spacer />
            <v-btn
              depressed
              tile
              large
              height="64"
              width="150"
              color="main"
              class="mr-n4"
              :loading="loading"
              :disabled="
                soldOut ||
                  isBlocked ||
                  ($auth.user && !isConfirmed) ||
                  event.suspended
              "
              @click="getTicket(event._id)"
            >
              <span v-if="event.suspended" class="white--text">suspended</span>
              <span v-else-if="soldOut" class="white--text">sold out</span>
              <span v-else-if="isBlocked" class="white--text">blocked</span>
              <span v-else class="white--text">get ticket</span>
            </v-btn>
          </v-app-bar>
        </v-row>
        <v-alert
          :value="$auth.user && !isConfirmed"
          dense
          tile
          text
          type="warning"
          class="body-2"
        >
          You cannot get a ticket before confirming your email, please check
          your email inbox/spam.
        </v-alert>
        <v-row class=" pt-4 fill-height" no-gutters>
          <v-col class="px-4" sm="10" md="8" cols="12">
            <table class="mx-4">
              <tbody>
                <tr v-if="event.about">
                  <td class="pr-4">
                    <v-icon class="pt-1 text--disabled" size="28">
                      mdi-information-variant
                    </v-icon>
                  </td>
                  <td class="pl-4">
                    <div class="title">
                      About this
                      <span v-text="event.project.title" />
                    </div>
                    <span class="text--secondary body-1">
                      {{ event.about }}
                    </span>
                  </td>
                </tr>
                <tr v-else>
                  <td class="pr-4">
                    <v-icon class="pt-1 text--disabled" size="28">
                      mdi-information-variant
                    </v-icon>
                  </td>
                  <td class="pl-4">
                    <div class="title">
                      {{ event.project.title }}
                    </div>
                    <span class="text--secondary body-1">
                      {{ event.project.description }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="pr-4">
                    <v-icon class="pt-1 text--disabled" size="28">
                      mdi-clock-outline
                    </v-icon>
                  </td>
                  <td class="pl-4">
                    <div class="title">
                      {{ formatRange(event.startsOn, event.endsOn).date }}
                    </div>
                    <span class="text--secondary body-1">
                      ~{{ formatRange(event.startsOn, event.endsOn).length }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="pr-4">
                    <v-icon class="pt-1 text--disabled" size="28">
                      mdi-map-marker-outline
                    </v-icon>
                  </td>
                  <td class="pl-4">
                    <div class="title">
                      {{ event.office.province + ' - ' + event.office.country }}
                    </div>
                    <span class="text--secondary body-1">
                      {{ event.location.name + ' - ' + event.location.address }}
                    </span>
                  </td>
                </tr>
                <div class="mb-8" />
                <tr>
                  <td class="pr-4">
                    <v-icon class="pt-1 text--disabled" size="28">
                      mdi-card-account-details-outline
                    </v-icon>
                  </td>
                  <td class="pl-4">
                    <div class="d-flex align-start">
                      <span class="title mr-8">
                        Created by {{ event.office.name }}
                      </span>
                      <v-btn
                        rounded
                        depressed
                        :outlined="followingOffice"
                        x-small
                        :color="followingOffice ? 'success' : 'primary'"
                        height="22"
                        class="mt-2"
                        :loading="loadingFollow"
                        @click="toggleFollow"
                      >
                        <v-icon
                          small
                          left
                          v-text="followingOffice ? 'mdi-check' : 'mdi-plus'"
                        />
                        <span
                          v-text="followingOffice ? 'follwing' : 'follow'"
                        />
                      </v-btn>
                      <!-- <a>FOLLOW</a> -->
                    </div>
                    <span class="text--secondary body-1 mr-4">
                      {{ event.office.province }} Team
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>
        <v-alert
          tile
          border="left"
          type="warning"
          :value="ticketsPercentage > 75 && ticketsPercentage < 100"
        >
          Hurry up! More than 75% of the Tickets allredy sold
        </v-alert>
      </v-card>
      <v-card v-else-if="loadingEvent" raised>
        <v-row no-gutters>
          <v-col cols="12" md="7">
            <v-responsive :aspect-ratio="16 / 9" class="grey" />
          </v-col>
          <v-col cols="12" md="5" class="pa-4">
            <v-responsive class="fill-height">
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
                  type="list-item"
                  max-height="50"
                  max-width="80"
                />
              </v-row>
            </v-responsive>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-else raised class="text-center">
        <v-row no-gutters class="fill-height" align="center" justify="center">
          <div class="mx-4 my-12">
            <h3 class="mb-4">
              Sorry it seems that there is no event with ID like
              <span class="main--text" v-text="id" />
            </h3>
            <v-btn rounded text color="primary" to="/events">
              see events
            </v-btn>
          </div>
        </v-row>
      </v-card>
    </v-container>
    <v-dialog
      v-model="shareDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <share :id="id" />
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import share from '~/components/dashboard/share'
import sponsors from '~/components/website/sponsors'
require('twix')
export default {
  components: {
    share,
    sponsors
  },
  asyncData ({ params, app, error }) {
    return app.$axios
      .get(`/events/${params.id}`)
      .then(({ data }) => {
        return { event: data }
      })
      .catch((e) => {
        error({ statusCode: e.response ? e.response.status : 500 })
      })
  },
  data: () => ({
    moment,
    loading: false,
    loadingEvent: false,
    shareDialog: false,
    loadingFollow: false
  }),
  head () {
    if (!this.event) {
      return {
        title: this.event ? this.event.subject : 'Event'
      }
    }
    const desc = `on ${new Date(this.event.startsOn).toUTCString()} - 
    ${this.event.about || this.event.project.description}`
    const title = `${this.event.subject || 'Event'} - Algeria English Meeting`
    const image = `${this.$axios.defaults.baseURL}/images/${this.event.image.name}?w=500`
    return {
      title: this.event ? this.event.subject : 'Event',
      meta: [
        { hid: 'title', name: 'title', content: title },
        {
          hid: 'description',
          name: 'description',
          content: desc
        },
        // Search Engin
        {
          hid: 'google-name',
          itemprop: 'name',
          content: title
        },
        {
          hid: 'google-description',
          itemprop: 'description',
          content: desc
        },
        {
          hid: 'google-image',
          itemprop: 'image',
          content: image
        },
        // Facebook
        {
          hid: 'url',
          property: 'og:url',
          content: `https://aemeeting.org/events/${this.event._id}`
        },
        {
          hid: 'fb-title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'fb-description',
          property: 'og:description',
          content: desc
        },
        {
          hid: 'fb-image',
          property: 'og:image',
          content: image
        },
        // Twitter
        {
          hid: 'tw-title',
          name: 'twitter:title',
          content: title
        },
        {
          hid: 'tw-description',
          name: 'twitter:decription',
          content: desc
        },
        {
          hid: 'tw-image',
          name: 'twitter:image',
          content: image
        }
      ]
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    soldOut () {
      if (!this.event) { return null }
      return this.event.ticketsCount >= this.event.ticketsNumber
    },
    followingOffice () {
      if (!this.$auth.user) { return false }
      return (this.$auth.user.followOffice || []).includes(
        this.event.office._id
      )
    },
    ticketsPercentage () {
      return Math.floor(
        (this.event.ticketsCount * 100) / this.event.ticketsNumber
      )
    },
    isBlocked () {
      if (!this.$auth.user || !this.$auth.user.blocked) { return false }
      if (new Date(this.$auth.user.blocked).getTime() > new Date().getTime()) { return true }
      return false
    },
    isConfirmed () {
      if (this.$auth.user && this.$auth.user.confirmed) { return true }
      return false
    }
  },
  mounted () {
    localStorage.setItem('path', this.$route.fullPath)
    // this.getEvent(this.id)
  },
  methods: {
    // getEvent(id) {
    //   this.$axios
    //     .get(`/events/${id}`)
    //     .then(({ data }) => {
    //       this.event = data
    //     })
    //     .finally(() => (this.loadingEvent = false))
    // },
    getTicket (id) {
      if (!this.$auth.loggedIn) { return this.$router.push('/login') }
      this.loading = true
      this.$axios
        .post('/orders', { id })
        .then(({ data }) => {
          this.$router.push('/user/tickets')
        })
        .finally(() => (this.loading = false))
    },
    async toggleFollow () {
      this.loadingFollow = true
      if (this.followingOffice) {
        await this.$axios.put(
          `/users/offices/${this.event.office._id}/following?action=unfollow`
        )
      } else {
        await this.$axios.put(
          `/users/offices/${this.event.office._id}/following?action=follow`
        )
      }
      await this.$auth.fetchUser()
      this.loadingFollow = false
    },
    formatRange (date1, date2) {
      if (!date1 || !date2) { return '' }
      const t = moment(date1).twix(date2)
      return {
        date: t.format({ showDayOfWeek: true, hourFormat: 'H' }),
        length: t.humanizeLength()
      }
    }
  }
}
</script>

<style scoped>
td {
  vertical-align: baseline;
  padding-bottom: 32px;
}
</style>
