<template>
  <div>
    <v-card v-if="!items.length && !loading" flat class="py-8">
      <v-card-text>
        <div class="text-center">
          <span>
            No live event to show, Please
            <a>retry</a>
            <br>Or you can
            <a @click="$router.push('/dashboard/events/create')">
              create
            </a>
            new event.
          </span>
        </div>
      </v-card-text>
    </v-card>
    <div v-else>
      <v-card v-if="live" outlined flat>
        <v-btn
          depressed
          tile
          color="primary"
          :disabled="!ids.length"
          :loading="notifying"
          @click="notify"
        >
          notify via email
        </v-btn>
        <span class="px-1 body-2">{{ ids.length }} event selected</span>
        <v-btn
          v-show="!!ids.length"
          x-small
          icon
          color="error"
          @click="ids = []"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card>
      <div v-outside-click="onClickOutside">
        <event
          v-for="(event, i) in items"
          :key="event._id"
          :event="event"
          :index="i"
          :live="live"
          :actions="actionBtns === i"
          @actions="(i) => (actionBtns = i)"
          @details="showDetails"
          @share="shareEvent"
          @update="update"
          @remove="remove"
          @suspend="suspend"
          @unsuspend="unsuspend"
          @select="select"
        />
      </div>
      <div v-if="!loading && !!items.length" class="text-center py-5">
        <v-btn rounded text color="primary" @click="$emit('loadMore')">
          <v-icon left>
            mdi-chevron-down
          </v-icon>
          load more
        </v-btn>
      </div>
    </div>
    <div v-if="loading">
      <v-card
        v-for="index in limit"
        :key="index"
        outlined
        class="d-flex justify-space-between py-2 px-2 my-2"
        :style="`opacity: ${(limit - index + 1) / limit}`"
      >
        <v-responsive max-width="250">
          <v-skeleton-loader
            ref="skeleton"
            type="list-item-avatar-three-line"
            class="mx-auto"
          />
        </v-responsive>
        <v-responsive max-width="200" class="d-md-flex d-none">
          <v-skeleton-loader
            ref="skeleton"
            type="list-item-two-line"
            class="mx-auto"
          />
        </v-responsive>
      </v-card>
    </div>
    <v-dialog
      v-model="shareDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <share :id="id" />
    </v-dialog>
    <v-dialog
      v-model="removeDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <remove
        alert="Some users may already get tickets for this event"
        message="Are you sure you want to delete this event?"
        @cancel="removeDialog = false"
        @confirm="confirmedRemove"
      />
    </v-dialog>
  </div>
</template>

<script>
// import moment from 'moment'
import event from '~/components/dashboard/event'
import share from '~/components/dashboard/share'
import remove from '~/components/global/remove'

export default {
  components: {
    event,
    share,
    remove
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    live: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 5
    }
  },
  data: () => ({
    // moment,
    shareDialog: false,
    removeDialog: false,
    notifying: false,
    actionBtns: null,
    id: '',
    ids: [],
    details: ''
  }),
  methods: {
    shareEvent (id) {
      this.id = id
      this.shareDialog = true
    },
    update (id) {
      this.$router.push(`/dashboard/events/${id}/edit/`)
    },
    suspend (event) {
      event.suspended = true
      const data = {
        suspended: true,
        office: { _id: event.office }
      }
      this.$axios
        .put(`/events/${event._id}`, data)
        .then(() => {
          this.$store.dispatch('snackbar', {
            text: 'Event suspended',
            color: 'success',
            timeout: 3000
          })
        })
        .catch(() => (event.suspended = false))
    },
    unsuspend (event) {
      event.suspended = false
      const data = {
        suspended: false,
        office: { _id: event.office }
      }
      this.$axios
        .put(`/events/${event._id}`, data)
        .then(() => {
          this.$store.dispatch('snackbar', {
            text: 'Event unsuspended',
            color: 'success',
            timeout: 3000
          })
        })
        .catch(() => (event.suspended = true))
    },
    remove (id) {
      this.id = id
      this.removeDialog = true
    },
    confirmedRemove () {
      this.removeDialog = false
      this.$axios.delete(`/events/${this.id}`).then(() => {
        this.$store.dispatch('snackbar', {
          text: 'Event deleted successfylly',
          color: 'success',
          timeout: 3000
        })
        this.$emit('refresh')
      })
    },
    select (id) {
      if (!this.ids.includes(id)) {
        this.ids.push(id)
      }
    },
    notify () {
      this.notifying = true
      this.$axios
        .post('/notifications/events', { ids: this.ids })
        .then(() => {
          this.$store.dispatch('snackbar', {
            text: 'Emails was sent successfully',
            color: 'success',
            timeout: 3000
          })
        })
        .finally(() => (this.notifying = false))
    },
    showDetails (id) {
      if (this.details === id) { this.details = '' } else { this.details = id }
    },
    onClickOutside (event) {
      this.actionBtns = null
    }
  }
}
</script>
