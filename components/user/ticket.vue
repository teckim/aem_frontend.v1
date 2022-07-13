<template>
  <div>
    <div class="mb-2 mx-auto actions">
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            x-small
            fab
            color="success"
            v-bind="attrs"
            v-on="on"
            @click="downloadTicket(item._id)"
          >
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </template>
        <span>Download</span>
      </v-tooltip>
      <!-- <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            x-small
            dark
            fab
            color="main"
            v-bind="attrs"
            v-on="on"
            @click="downloadTicket(item._id)"
          >
            <v-icon>mdi-calendar-plus</v-icon>
          </v-btn>
        </template>
        <span>Add to google calendar</span>
      </v-tooltip> -->
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            x-small
            fab
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click="shareDialog = true"
          >
            <v-icon>mdi-share</v-icon>
          </v-btn>
        </template>
        <span>Share event</span>
      </v-tooltip>
      <v-btn
        small
        rounded
        height="32"
        color="error"
        :loading="canceling"
        @click="cancelTicket(item._id, item.event._id)"
      >
        <v-icon left>
          mdi-cancel
        </v-icon>
        not going
      </v-btn>
    </div>
    <v-card raised class="ticket mx-auto" max-width="350" light>
      <v-row justify="center" class="cardTop" no-gutters>
        <div class="qr-container">
          <v-icon
            v-if="item.checkedIn"
            class="qr--checked white"
            size="60"
            color="success"
          >
            mdi-check-circle
          </v-icon>
          <canvas ref="qrcanvas" class="d-block mx-auto" />
        </div>
      </v-row>
      <v-card-title class="mt-4">
        <div>
          <div class="headline">
            {{ `${user.first} ${user.last}` }}
          </div>
          <div class="body-2 text--secondary text-truncate">
            {{ user.email }}
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div v-if="price" class="mb-3">
          <div>
            Price
            <v-chip
              v-if="item.paid && !!price"
              small
              class="ml-4"
              :color="item.paid === price ? 'success' : 'grey'"
            >
              <v-icon small left>
                {{
                  item.paid === price ? 'mdi-check-circle' : 'mdi-alert-circle'
                }}
              </v-icon>
              {{ item.paid === price ? 'Paid' : 'Partly paid' }}
            </v-chip>
            <v-chip v-else-if="!!price" small class="ml-4" color="warning">
              <v-icon small left>
                mdi-alert-circle
              </v-icon>
              Not paid
            </v-chip>
          </div>
          <div class="body-1 black--text">
            {{ price }}
            <span class="overline" v-text="currency" />
          </div>
        </div>
        <div />
        <div class="mb-3">
          <div>Event</div>
          <div class="body-1 black--text">
            {{ item.event.subject }}
          </div>
        </div>
        <div class="mb-3">
          <div>Timing</div>
          <div class="body-1 black--text">
            {{ timing }}
          </div>
        </div>
        <div class="mb-3">
          <div>Location</div>
          <div class="body-1 black--text">
            {{ `${item.event.location.name} ${item.event.location.address}` }}
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="shareDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <share :id="item && item.event._id" />
    </v-dialog>
  </div>
</template>

<script>
import QR from 'qrcode'
import moment from 'moment'
import share from '~/components/dashboard/share'

require('twix')
export default {
  components: {
    share
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: null
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    canceling: false,
    shareDialog: false
  }),
  computed: {
    timing () {
      if (!this.item.event.startsOn || !this.item.event.endsOn) { return '' }
      const t = moment(this.item.event.startsOn).twix(this.item.event.endsOn)
      return t.format({ showDayOfWeek: true, hourFormat: 'H' })
    },
    price () {
      if (!this.item) { return null }
      return this.item.event.price ?? null
    },
    currency () {
      if (!this.item) { return '' }
      return this.item.event.office.currency
    }
  },
  mounted () {
    this.getQR_code(this.item._id)
  },
  methods: {
    getQR_code (s) {
      QR.toCanvas(this.$refs.qrcanvas, s, { scale: 8 })
    },
    formatRange (date1, date2) {
      if (!date1 || !date2) { return '' }
      const t = moment(date1).twix(date2)
      return {
        date: t.format({ showDayOfWeek: true, hourFormat: 'H' }),
        length: t.humanizeLength()
      }
    },
    cancelTicket (ticketId, eventId) {
      this.canceling = true
      this.$axios
        .delete(`/orders/${ticketId}`, {
          params: { event: eventId }
        })
        .then(() => {
          if (this.index !== null) { this.$emit('cancel', this.index) }
          this.$store.dispatch('snackbar', {
            text: 'Ticket canceled successfully',
            color: 'success',
            timeout: 3000
          })
        })
        .finally(() => (this.canceling = false))
    },
    downloadTicket (id) {
      window.open(
        this.$axios.defaults.baseURL + '/orders/' + id + '/pdf',
        '_blank'
      )
    }
  }
}
</script>

<style scoped>
.ticket {
  position: relative;
  border-radius: 12px !important;
  border-top: 12px solid var(--v-main-base);
  /* box-shadow: 2px 2px 15px 0px #7a7a7a; */
}
/* .ticket:before,
.ticket:after {
  content: '';
  position: absolute;
  height: 6px;
  width: 100%;
}
.ticket:before {
  top: -5px;
  background: radial-gradient(
      circle,
      transparent,
      transparent 50%,
      #ffffff 50%,
      #ffffff 100%
    ) -7px -8px / 16px 16px repeat-x;
}
.ticket:after {
  bottom: -5px;
  background: radial-gradient(
      circle,
      transparent,
      transparent 50%,
      #ffffff 50%,
      #ffffff 100%
    ) -7px -2px / 16px 16px repeat-x;
} */
.cardTop {
  position: relative;
  border-bottom: 0.3em dashed #00000033;
}
/* .cardTop:before,
.cardTop:after {
  content: '';
  position: absolute;
  display: block;
  width: 24px;
  height: 24px;
  bottom: -12px;
  background: #ffffff;
  border-radius: 50%;
} */
.cardTop:before {
  left: -12px;
}
.cardTop:after {
  right: -12px;
}

.qr-container {
  position: relative;
}
.qr--checked {
  position: absolute;
  border-radius: 50%;
  bottom: 5px;
  right: 10px;
}
.actions {
  max-width: 350px;
}
</style>
