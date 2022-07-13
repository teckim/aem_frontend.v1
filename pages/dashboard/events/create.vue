<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <span class="headline py-2">Create event</span>
      <!-- <v-btn rounded dark color="main" :disabled="loading">
        <span class="pr-4">events</span>
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn> -->
    </v-row>
    <v-card elevation="3" class="mt-6" :loading="loading" :disabled="loading">
      <v-stepper v-model="step" class="elevation-0" vertical>
        <v-stepper-step
          :color="step > 1 ? 'success' : 'main'"
          :complete="step > 1"
          step="1"
        >
          <span :class="step === 1 ? 'body-1' : 'body-2'">General</span><small
            v-show="step === 1"
            class="main--text"
          >required</small>
        </v-stepper-step>
        <v-stepper-content step="1">
          <general-form
            :data="event"
            :edit="editMode"
            @update="preview"
            @submit="next"
          />
        </v-stepper-content>
        <v-stepper-step
          :color="step > 2 ? 'success' : 'main'"
          :complete="step > 2"
          step="2"
        >
          <span :class="step === 2 ? 'body-1' : 'body-2'">Timing</span><small
            v-show="step === 2"
            class="main--text"
          >required</small>
        </v-stepper-step>
        <v-stepper-content step="2">
          <timing-form
            :data="event"
            :edit="editMode"
            @update="preview"
            @submit="next"
          />
        </v-stepper-content>
        <v-stepper-step
          :color="step > 3 ? 'success' : 'main'"
          :complete="step > 3"
          step="3"
        >
          <span :class="step === 3 ? 'body-1' : 'body-2'">Media</span>
        </v-stepper-step>
        <v-stepper-content step="3">
          <media-form
            :data="event"
            :edit="editMode"
            @update="preview"
            @submit="next"
          />
        </v-stepper-content>
        <v-stepper-step
          :color="step > 4 ? 'success' : 'main'"
          :complete="step > 4"
          step="4"
        >
          <span :class="step === 4 ? 'body-1' : 'body-2'">Tickets</span>
        </v-stepper-step>
        <v-stepper-content step="4">
          <tickets-form :data="event" :edit="editMode" @submit="next" />
        </v-stepper-content>
        <v-stepper-step
          :color="step === 5 ? 'success' : 'main'"
          :complete="step === 5"
          step="5"
        >
          <span :class="step === 5 ? 'body-1' : 'body-2'">Preview & save</span>
        </v-stepper-step>
        <v-stepper-content step="5">
          <div v-if="!!event" class="pa-4">
            <v-card tile class="mb-4">
              <!-- <v-row no-gutters>
                <v-col cols="auto">
                  <v-img
                    :src="$axios.defaults.baseURL + '/images/' + event.image"
                    max-width="360"
                  ></v-img>
                </v-col>
                <v-responsive max-width="200">
                  lkjlksdfldskj
                </v-responsive>
              </v-row> -->
              <v-row no-gutters>
                <v-col cols="12" md="7">
                  <v-img
                    :src="
                      event.image &&
                        $axios.defaults.baseURL + '/images/' + event.image.name
                    "
                    class="text-center align-center event--data"
                  >
                    <v-btn
                      rounded
                      depressed
                      color="primary"
                      class="event--data_edit"
                      @click="step = 3"
                    >
                      <v-icon left>
                        mdi-pencil
                      </v-icon> change
                    </v-btn>
                  </v-img>
                </v-col>
                <v-col cols="12" md="5" class="pa-4">
                  <v-responsive min-height="200" class="fill-height">
                    <v-row
                      class="flex-column fill-height"
                      justify="space-between"
                      no-gutters
                    >
                      <tr class="event--data">
                        <td class="pr-4">
                          <v-icon color="main">
                            mdi-clock-outline
                          </v-icon>
                        </td>
                        <td>
                          <div>
                            {{ formatRange(event.startsOn, event.endsOn).date }}
                          </div>
                          <span class="text--secondary body-2">
                            ~{{
                              formatRange(event.startsOn, event.endsOn).length
                            }}
                          </span>
                        </td>
                        <td class="pl-4 event--data_edit">
                          <v-btn
                            icon
                            small
                            color="primary"
                            class="ml-auto"
                            @click="step = 2"
                          >
                            <v-icon small>
                              mdi-pencil
                            </v-icon>
                          </v-btn>
                        </td>
                      </tr>
                      <tr class="event--data">
                        <td class="pr-4">
                          <v-icon color="main">
                            mdi-information-variant
                          </v-icon>
                        </td>
                        <td>
                          <div>
                            {{ event.project && event.project.title }}
                          </div>
                          <span class="text--secondary body-2">
                            {{ event.subject }}
                          </span>
                        </td>
                        <td class="pl-4 event--data_edit">
                          <v-btn
                            icon
                            small
                            color="primary"
                            class="ml-auto"
                            @click="step = 1"
                          >
                            <v-icon small>
                              mdi-pencil
                            </v-icon>
                          </v-btn>
                        </td>
                      </tr>
                      <tr class="event--data">
                        <td class="pr-4">
                          <v-icon color="main">
                            mdi-currency-usd
                          </v-icon>
                        </td>
                        <td>
                          <div v-text="eventPrice" />
                          <span
                            class="text--secondary body-2"
                            v-text="event.ticketsNumber + ' tickets'"
                          />
                        </td>
                        <td class="pl-4 event--data_edit">
                          <v-btn
                            icon
                            small
                            color="primary"
                            class="ml-auto"
                            @click="step = 4"
                          >
                            <v-icon small>
                              mdi-pencil
                            </v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </v-row>
                  </v-responsive>
                </v-col>
              </v-row>
            </v-card>
            <div v-show="!!event.about">
              <h3>About this event</h3>
              <p>{{ event.about || '' }}</p>
            </div>
            <div>
              <sponsors-form
                ref="sponsors"
                @selected="(v) => (event.sponsors = v)"
              />
            </div>
            <v-row align="center" no-gutters>
              <v-btn
                depressed
                dark
                color="success"
                :loading="isSaving"
                @click="save"
              >
                <span>save event</span>
                <v-icon right>
                  mdi-arrow-right
                </v-icon>
              </v-btn>
              <v-checkbox
                v-model="notify"
                label="notify followers by email"
                color="main"
                class="pl-4"
              />
            </v-row>
          </div>
          <div v-else class="text-center">
            nothing to show here, please fill the form
          </div>
        </v-stepper-content>
        <!-- <v-stepper-header v-show="step !== 4" class="elevation-0">
        <v-stepper-step
          :color="step > 1 ? 'success' : 'main'"
          :complete="step > 1"
          step="1"
          ><span :class="step === 1 ? 'body-1' : 'body-2'">General</span
          ><small v-show="step === 1" class="main--text"
            >required</small
          ></v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step
          :color="step > 2 ? 'success' : 'main'"
          :complete="step > 2"
          step="2"
          ><span :class="step === 2 ? 'body-1' : 'body-2'">Timing</span
          ><small v-show="step === 2" class="main--text"
            >required</small
          ></v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step
          :color="step > 3 ? 'success' : 'main'"
          :complete="step > 3"
          step="3"
          ><span :class="step === 3 ? 'body-1' : 'body-2'"
            >Media</span
          ></v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step
          :color="step > 4 ? 'success' : 'main'"
          :complete="step > 4"
          step="4"
          ><span :class="step === 4 ? 'body-1' : 'body-2'"
            >Tickets</span
          ></v-stepper-step
        >
      </v-stepper-header>
      <v-stepper-items>
        <v-card elevation="3" :loading="loading" :disabled="loading">
          <v-card-text>
            <v-stepper-content step="1" class="pa-0">
              this is step {{ step }}
            </v-stepper-content>
          </v-card-text>
        </v-card>
      </v-stepper-items> -->
      </v-stepper>
    </v-card>
  </div>
</template>
<script>
import moment from 'moment'
import generalForm from '~/components/dashboard/events/generalForm'
import timingForm from '~/components/dashboard/events/timingForm'
import mediaForm from '~/components/dashboard/events/mediaForm'
import ticketsForm from '~/components/dashboard/events/ticketsForm'
import sponsorsForm from '~/components/dashboard/events/sponsorsForm'
require('twix')
// {
//   about:
//     'In this event we will be socializing learning English and having fun at the same time.',
//   endsOn: '2020-05-17T22:30:00.000Z',
//   image: { name: '1589487062692.jpeg' },

//   location: { text: 'Online', value: 'Zoom application' },

//   price: 0,
//   project: { _id: '5e316dae39d09d0ae45bf4c4', title: 'COFFEE MEETUP' },

//   startsOn: '2020-05-16T22:00:00.000Z',
//   subject: 'Negotiation',
//   ticketsNumber: 50
// }
export default {
  components: {
    generalForm,
    timingForm,
    mediaForm,
    ticketsForm,
    sponsorsForm
  },
  data: () => ({
    event: null,
    loading: false,
    isSaving: false,
    editMode: false,
    notify: true,
    step: 1
  }),
  head () {
    return {
      title: 'Create event'
    }
  },
  computed: {
    eventPrice () {
      if (!this.event.price) { return 'FREE' } else { return this.event.price + ' ' + this.$auth.user.office.currency }
    }
  },
  async mounted () {
    if (this.$route.query.cid) {
      const id = this.$route.query.cid
      const { data } = await this.$axios.get(`/events/${id}`)
      delete data._id
      data.startsOn = new Date().toISOString()
      data.endsOn = new Date().toISOString()
      this.event = data
    }
  },
  methods: {
    save () {
      this.isSaving = true
      const data = JSON.parse(JSON.stringify(this.event))
      data.project = data.project._id
      data.startsOn = new Date(data.startsOn)
      data.endsOn = new Date(data.endsOn)
      data.notify = this.notify

      this.$axios
        .post('/events', data)
        .then((res) => {
          this.$store.dispatch('snackbar', {
            text: 'Event added successfylly',
            color: 'success',
            timeout: 3000
          })
          this.$router.push('/dashboard/events/manage')
        })
        .finally(() => (this.isSaving = false))
    },
    next (v) {
      if (!v || ![2, 3, 4, 5].includes(this.step + 1)) {
        return this.$store.dispatch('snackbar', {
          text: 'Somthing went wrong, please try again',
          color: 'error',
          timeout: 3000
        })
      }
      if (!this.event) { this.event = {} }
      Object.assign(this.event, v)
      this.step++
      if (this.step === 5) { this.editMode = true }
    },
    preview (v) {
      if (!v) {
        return this.$store.dispatch('snackbar', {
          text: 'Somthing went wrong, please try again',
          color: 'error',
          timeout: 3000
        })
      }
      Object.assign(this.event, v)
      this.step = 5
      this.editMode = true
    },
    formatRange (date1, date2) {
      if (!date1 || !date2) { return '' }
      const t = moment(date1).twix(date2)
      // const t = moment('1982-01-25T09:30').twix('1982-01-25T13:30')

      return {
        date: t.format({ showDayOfWeek: true, hourFormat: 'H' }),
        length: t.humanizeLength()
      }
    }
  }
}
</script>
<style scoped>
/* .v-stepper,
.v-stepper__items {
  overflow: visible !important;
} */
.v-stepper--vertical .v-stepper__content {
  padding: 16px 37px 16px 0 !important;
}
.overlay {
  background-color: rgba(255, 255, 255, 0.51);
}
.event--data_edit {
  /* display: none;
  visibility: hidden;
  transition: display ease-in-out 1s; */
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s linear;
}
.event--data:hover .event--data_edit {
  /* display: table-cell;
  visibility: visible; */
  visibility: visible;
  opacity: 1;
}
</style>
