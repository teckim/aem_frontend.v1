<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <span class="headline py-2">Edit event</span>
      <v-btn
        rounded
        color="success"
        :disabled="!event"
        :loading="isSaving"
        @click="save"
      >
        <span class="pr-4">save</span>
        <v-icon right>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-row>
    <v-row v-if="loading" no-gutters>
      <v-card class="mt-8 mb-4" width="100%">
        <v-row no-gutters>
          <v-col cols="12" md="7">
            <v-skeleton-loader tile type="image" />
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
            </v-responsive>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row v-else no-gutters>
      <div v-if="!event" class="mx-auto my-12 text-center">
        <div class="py-4">
          <h3>{{ message }}</h3>
        </div>
        <div>
          <v-btn text exact color="primary" to="/dashboard/events/manage">
            see events
          </v-btn>
          Or
          <v-btn text exact color="primary" to="/dashboard/events/create">
            create one
          </v-btn>
        </div>
      </div>
      <div v-else style="width:100%">
        <div>
          <v-switch
            v-model="event.available"
            :label="event.available ? 'Available' : 'Suspended'"
            persistent-hint
            :hint="
              event.available
                ? 'Users can get tickets'
                : 'Users cannot get tickets'
            "
          />
        </div>
        <v-card class="mt-8 mb-4" width="100%">
          <v-row no-gutters>
            <v-col cols="12" md="7">
              <v-img
                :aspect-ratio="16 / 9"
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
                  @click="form = 'media'"
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
                        ~{{ formatRange(event.startsOn, event.endsOn).length }}
                      </span>
                    </td>
                    <td class="pl-4 event--data_edit">
                      <v-btn
                        icon
                        small
                        color="primary"
                        class="ml-auto"
                        @click="form = 'timing'"
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
                      <div class="text--secondary body-2">
                        {{ event.subject }} <br>
                        {{
                          event.location.name + ' - ' + event.location.address
                        }}
                      </div>
                    </td>
                    <td class="pl-4 event--data_edit">
                      <v-btn
                        icon
                        small
                        color="primary"
                        class="ml-auto"
                        @click="form = 'general'"
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
                        @click="form = 'tickets'"
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
        <div class="event--data">
          <h3 class="font-weight-regular">
            About this event
            <span class="pl-4 event--data_edit">
              <v-btn
                v-show="!!event.about"
                icon
                small
                color="primary"
                class="ml-auto"
                @click="form = 'general'"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </span>
            <span>
              <v-btn
                v-show="!event.about"
                rounded
                text
                small
                color="primary"
                class="ml-auto "
                @click="form = 'general'"
              >
                <v-icon small>mdi-plus</v-icon>
                add description
              </v-btn>
            </span>
          </h3>
          <p>{{ event.about || '' }}</p>
        </div>
        <div>
          <sponsors-form
            ref="sponsors"
            :data="event"
            @selected="(v) => (event.sponsors = v)"
          />
        </div>
      </div>
    </v-row>
    <v-dialog
      v-model="showEditDialog"
      scrollable
      persistent
      transition="dialog-transition"
    >
      <v-card>
        <div class="px-4 py-5">
          <general-form
            v-show="form === 'general'"
            :edit="true"
            :data="event"
            :update-mode="true"
            @cancel="form = null"
            @update="preview"
          />
          <timing-form
            v-show="form === 'timing'"
            :edit="true"
            :data="event"
            :update-mode="true"
            @cancel="form = null"
            @update="preview"
          />
          <media-form
            v-show="form === 'media'"
            :edit="true"
            :data="event"
            :update-mode="true"
            @cancel="form = null"
            @update="preview"
          />
          <tickets-form
            v-show="form === 'tickets'"
            :edit="true"
            :data="event"
            :update-mode="true"
            @cancel="form = null"
            @update="preview"
          />
        </div>
      </v-card>
    </v-dialog>
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
    loading: true,
    isSaving: false,
    message: 'No event to show',
    notify: true,
    form: null,
    showEditDialog: false
  }),
  head () {
    return {
      title: 'Edit event'
    }
  },
  computed: {
    eventPrice () {
      if (!this.event.price) { return 'FREE' } else { return this.event.price + ' ' + this.$auth.user.office.currency }
    }
  },
  watch: {
    form (v) {
      if (!v) { this.showEditDialog = false } else { this.showEditDialog = true }
    }
  },
  mounted () {
    this.getEvent(this.$route.params.id)
  },
  methods: {
    getEvent (id) {
      this.loading = true
      this.$axios
        .get(`/events/${id}`)
        .then(({ data }) => {
          this.event = data
        })
        .finally(() => (this.loading = false))
    },
    save () {
      this.isSaving = true
      const data = JSON.parse(JSON.stringify(this.event))
      data.project = data.project._id
      data.startsOn = new Date(data.startsOn)
      data.endsOn = new Date(data.endsOn)

      this.$axios
        .put(`/events/${this.$route.params.id}`, data)
        .then((res) => {
          this.$store.dispatch('snackbar', {
            text: 'Event updated successfylly',
            color: 'success',
            timeout: 3000
          })
          this.$router.push('/dashboard/events/manage')
        })
        .finally(() => (this.isSaving = false))
    },
    formatRange (date1, date2) {
      if (!date1 || !date2) { return '' }
      const t = moment(date1).twix(date2)
      return {
        date: t.format({ showDayOfWeek: true, hourFormat: 'H' }),
        length: t.humanizeLength()
      }
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
      this.form = null
    }
  }
}
</script>
<style scoped>
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
