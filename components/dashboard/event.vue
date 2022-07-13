<template>
  <v-card
    v-if="!!event"
    outlined
    class="my-2 event-card"
    :ripple="false"
    @click.stop="$emit('actions', index)"
  >
    <v-row no-gutters class="px-2" justify="space-between">
      <span class="d-flex align-self-center py-2">
        <v-progress-circular
          color="main"
          :rotate="265"
          :size="60"
          :value="ticketsPercentage(event.ticketsCount, event.ticketsNumber)"
          :width="4"
          style="min-width: 60px"
        >
          <span class="text--secondary text--darken-1 body-2">{{
            ticketsPercentage(event.ticketsCount, event.ticketsNumber)
          }}%</span>
        </v-progress-circular>
        <span class="align-self-center d-flex flex-column pl-5">
          <div class="title">
            <span v-text="event.subject" />
          </div>
          <div>
            <span
              class="body-2 text--secondary"
              v-text="
                moment(event.startsOn).from() +
                  ' at ' +
                  moment(event.startsOn).format('LT')
              "
            />
            <v-chip
              v-if="event.suspended"
              x-small
              outlined
              class="mx-2"
              color="error"
            >
              <span class="font-weight-bold">SUSPENDED</span>
            </v-chip>
            <v-chip
              v-if="event.state === 'live'"
              x-small
              outlined
              class="mx-2"
              color="success"
            >
              <span class="font-weight-bold">LIVE NOW</span>
            </v-chip>
          </div>
        </span>
      </span>
      <div v-show="actions" class="event-action-buttons fill-height">
        <v-btn
          tile
          depressed
          color="primary"
          height="100%"
          min-width="60"
          max-width="80"
          :to="`/dashboard/events/${event._id}/orders/`"
        >
          <v-badge
            color="error"
            offset-x="13"
            :content="
              event.ticketsCount > 999 ? '999+' : event.ticketsCount.toString()
            "
            overlap
          >
            <v-icon>mdi-account-group</v-icon>
          </v-badge>
        </v-btn>
        <v-spacer>
          <v-btn
            tile
            depressed
            color="white"
            height="100%"
            width="100%"
            class="v-btn--plain"
            :ripple="false"
            @click="$emit('details', event._id)"
          />
        </v-spacer>
        <template v-if="live">
          <v-divider vertical />
          <v-menu offset-y bottom left>
            <template #activator="{ on, attrs }">
              <v-btn
                color="white"
                height="100%"
                min-width="60"
                max-width="80"
                tile
                depressed
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="primary">
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item @click="$emit('share', event._id)">
                <v-list-item-icon class="mr-4">
                  <v-icon small color="success">
                    mdi-share-variant
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  share
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-if="role == 'officeAdmin' && event.state !== 'live'"
                @click="$emit('update', event._id)"
              >
                <v-list-item-icon class="mr-4">
                  <v-icon small color="primary">
                    mdi-circle-edit-outline
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  edit
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-if="role == 'officeAdmin'"
                @click="
                  event.suspended
                    ? $emit('unsuspend', event)
                    : $emit('suspend', event)
                "
              >
                <v-list-item-icon class="mr-4">
                  <v-icon small :color="event.suspended ? 'success' : 'error'">
                    {{ event.suspended ? 'mdi-backup-restore' : 'mdi-cancel' }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  {{ event.suspended ? 'unsuspend' : 'suspend' }}
                </v-list-item-content>
              </v-list-item>
              <template v-if="role == 'officeAdmin'">
                <v-list-item @click="$emit('remove', event._id)">
                  <v-list-item-icon class="mr-4">
                    <v-icon small color="error">
                      mdi-delete-forever-outline
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    delete
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="$emit('select', event._id)">
                  <v-list-item-icon class="mr-4">
                    <v-icon small color="error">
                      mdi-check
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    select
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </template>
      </div>
    </v-row>
    <v-slide-x-transition hide-on-leave>
      <div v-show="actions">
        <v-divider />
        <v-card flat tile class="pa-2">
          <table align-start>
            <tbody>
              <tr>
                <td class="pr-4 td-icon">
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
              </tr>
              <tr>
                <td class="pr-4 td-icon">
                  <v-icon color="main">
                    mdi-information-variant
                  </v-icon>
                </td>
                <td>
                  <div>
                    {{ event.subject }}
                  </div>
                  <div class="text--secondary body-2">
                    {{ event.project.title }}
                  </div>
                  <div class="text--secondary body-2">
                    {{ event.location.name + ' - ' + event.location.address }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="pr-4 td-icon">
                  <v-icon color="main">
                    mdi-currency-usd
                  </v-icon>
                </td>
                <td>
                  <div v-text="eventPrice(event.price)" />
                  <span
                    class="text--secondary body-2"
                    v-text="event.ticketsNumber + ' tickets'"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <v-btn
            :to="`/dashboard/events/create?cid=${event._id}`"
            depressed
            text
            rounded
            small
            color="success"
          >
            <v-icon left>
              mdi-plus-circle-multiple-outline
            </v-icon>
            clone
          </v-btn>
        </v-card>
      </div>
    </v-slide-x-transition>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    event: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: null
    },
    actions: {
      type: Boolean,
      default: false
    },
    live: {
      type: Boolean
    }
  },
  data: () => ({
    moment
  }),
  computed: {
    role () {
      return this.$auth.user.role
    }
  },
  methods: {
    formatRange (date1, date2) {
      if (!date1 || !date2) { return '' }
      const t = moment(date1).twix(date2)
      return {
        date: t.format({ showDayOfWeek: true, hourFormat: 'H' }),
        length: t.humanizeLength()
      }
    },
    eventPrice (price) {
      if (!price) { return 'FREE' } else { return price + ' ' + this.$auth.user.office.currency }
    },
    ticketsPercentage (ticketsCount, ticketsNumber) {
      return Math.floor((ticketsCount * 100) / ticketsNumber)
    }
  }
}
</script>

<style scoped>
.event-card {
  transition: all 200ms;
  border-radius: 0;
  /* min-height: 104px; */
}
.event-card .row {
  position: relative;
}
.event-card table {
  border-spacing: 0 16px;
}
.event-card .td-icon {
  width: 80px;
  vertical-align: baseline;
  text-align: center;
}
.event-card:hover {
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  /* transform: scale(1.005); */
  position: relative;
  z-index: 2;
}
/* .event-card:hover .event-action-buttons {
  display: inline-flex;
} */
.event-action-buttons > * {
  flex-grow: 1;
  flex-basis: 0;
}
.event-action-buttons {
  position: absolute;
  overflow: hidden;
  right: 0;
  width: 100%;
  background-color: #fff;
  /* right: 5px;
  top: -14px; */
  display: inline-flex;
  flex-grow: 1;
  flex-basis: 0;
}
.v-toolbar__content {
  padding: 0px !important;
}
</style>
