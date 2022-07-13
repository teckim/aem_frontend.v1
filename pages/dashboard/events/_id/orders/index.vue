<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <div class="py-2">
        <div class="headline">
          Manage participants
        </div>
        <div
          class="d-inline-block text-truncate subtitle text--secondary"
          style="max-width: 200px;"
          v-text="event && `${event.subject}, ${moment(event.startsOn).from()}`"
        />
      </div>
      <div>
        <v-btn
          v-if="$auth.user.role === 'officeAdmin'"
          rounded
          color="success"
          :disabled="!orders"
          @click="createCSV(orders)"
        >
          CSV
          <v-icon right>
            mdi-file-export-outline
          </v-icon>
        </v-btn>
        <v-btn
          rounded
          color="main white--text"
          :disabled="!orders"
          @click="scan"
        >
          <span class="pr-4">scan</span>
          <v-icon right>
            mdi-qrcode-scan
          </v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-row no-gutters>
      <v-card flat class="mt-8 mb-4" width="100%">
        <v-btn
          small
          text
          color="primary"
          class="v-btn--plain px-0"
          :ripple="false"
          @click="showInsights = !showInsights"
        >
          {{ !showInsights ? 'show insights' : 'hide insights' }}
          <v-icon>mdi-chevron-{{ !showInsights ? 'down' : 'up' }}</v-icon>
        </v-btn>
        <v-slide-x-transition>
          <div v-show="showInsights">
            <event-insight :data="{ event, orders }" />
          </div>
        </v-slide-x-transition>
        <v-divider class="mb-4" />
        <v-card flat outlined>
          <v-row class="px-4">
            <v-col cols="12" sm="5" md="4">
              <v-checkbox
                v-model="assignTables"
                dense
                hide-details
                class="my-0"
                label="assign table on check in"
              />
            </v-col>
            <v-col cols="5" sm="3" md="2">
              <v-text-field
                v-model="tables"
                dense
                validate-on-blur
                max-width="100"
                type="number"
                color="main lighten-2"
                name="tables"
                label="Tables number"
                :disabled="!assignTables"
                :rules="[(v) => v >= 0 || 'Positive only']"
              />
            </v-col>
            <v-col cols="5" sm="3" md="2">
              <v-text-field
                v-model="partPerTable"
                dense
                validate-on-blur
                max-width="100"
                type="number"
                color="main lighten-2"
                name="partPerTable"
                label="Participants per table"
                :disabled="!assignTables"
                :rules="[(v) => v >= 0 || 'Positive only']"
              />
            </v-col>
          </v-row>
        </v-card>
        <orders-list
          :items="orders"
          :b-days="birthDays"
          :event="event"
          :role="role"
          :limit="query.limit"
          :loading="loadingOrders"
          @loadMore="query.page++"
          @checkin="checkIn"
          @checkout="checkOut"
          @retry="getOrders"
          @edit="onEdit"
        />
      </v-card>
    </v-row>
    <v-dialog
      :value="scanDialog"
      persistent
      width="512px"
      transition="dialog-transition"
    >
      <scanQR
        :open="scanDialog"
        :order="order"
        :error="checkInError"
        :paid-event="event && !!event.price"
        @checkin="checkIn"
        @checkout="checkOut"
        @decoded="checkIn"
        @close="scanDialog = false"
        @done="order = null"
      />
    </v-dialog>
    <v-dialog v-model="editDialog" width="512px" transition="dialog-transition">
      <edit-order
        :order="order"
        :price="(event && event.price) || 0"
        @cancel="editDialog = false"
        @save="saveEdit"
      />
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import ordersList from '~/components/dashboard/ordersList'
import eventInsight from '~/components/dashboard/eventInsight'
import editOrder from '~/components/dashboard/editOrder'
import scanQR from '~/components/dashboard/scanQR'
// const scanQR = process.client
//   ? require('~/components/dashboard/scanQR').default
//   : null
export default {
  components: {
    ordersList,
    eventInsight,
    editOrder,
    scanQR
  },
  data: () => ({
    moment,
    orders: [],
    event: null,
    order: null,
    assignTables: false,
    tables: 5,
    partPerTable: 3,
    loadingOrders: true,
    showInsights: false,
    scanDialog: false,
    editDialog: false,
    checkInError: '',
    timeout: null,
    query: {
      page: 1,
      limit: 100
    }
  }),
  head () {
    return {
      title: 'Manage tickets'
    }
  },
  computed: {
    role () {
      return this.$auth.user.role
    },
    eventId () {
      return this.$route.params.id
    },
    pageNum () {
      return this.query.page
    },
    birthDays () {
      if (!this.orders) { return null }
      const bDays = []
      this.orders.forEach((order) => {
        if (order.user && order.user.isBirthday) { bDays.push(order.user) }
      })
      return bDays
    }
  },
  watch: {
    pageNum (v) {
      this.getOrders()
    },
    checkInError (v) {
      if (v) {
        if (this.timeout) { clearTimeout(this.timeout) }
        this.timeout = setTimeout(() => {
          this.checkInError = ''
        }, 5000)
      }
    },
    orders (v) {
      this.tables = Math.ceil(v.length / 5)
      this.partPerTable = 5
    }
  },
  mounted () {
    this.getEvent(this.eventId)
    this.getOrders()
  },
  methods: {
    getOrders (re = false) {
      if (re) {
        this.orders = []
        this.query.page = 1
      }
      this.loadingOrders = true
      this.$axios
        .get(`/orders/event/${this.eventId}`, {
          params: { ...this.query }
        })
        .then(({ data }) => {
          this.orders.push(...data.orders)
        })
        .finally(() => (this.loadingOrders = false))
    },
    getEvent (id) {
      this.$axios.get(`/events/${id}`).then(({ data }) => {
        this.event = data
      })
    },
    scan () {
      this.order = null
      this.scanDialog = true
    },
    findOrderIndexById (id) {
      if (!this.orders) { return -1 }

      let index = -1
      for (let i = 0; i < this.orders.length; i++) {
        // eslint-disable-next-line no-console
        console.log(this.orders[i]._id, id)
        if (this.orders[i]._id === id) {
          index = i
          break
        }
      }
      return index
    },
    checkIn (id) {
      let index
      if (typeof id === 'string') {
        this.checkInError = ''
        index = this.findOrderIndexById(id)
        if (index === -1) {
          this.order = null
          this.checkInError = 'Not in your participants list'
          return null
        }
        this.order = this.orders[index]
        if (this.order.checkedIn) {
          this.order.alreadyChecked = true
          this.checkInError = 'Already checked in'
          return null
        }
      } else {
        index = id
        this.order = this.orders[index]
      }
      this.order.checkedIn = true
      if (this.assignTables && !this.order.table) {
        this.order.table = this.randomTable(this.orders)
        this.$axios.put(`/orders/${this.order._id}?event=${this.eventId}`, {
          table: this.order.table
        })
      }
      this.$axios
        .put(`/orders/${this.order._id}/checking?event=${this.eventId}`, {
          checkedIn: true
        })
        .catch(() => (this.order.checkedIn = false))
    },
    checkOut (id) {
      let index
      if (typeof id === 'string') {
        index = this.findOrderIndexById(id)
        if (index === -1) { return null }
      } else {
        index = id
      }
      this.orders[index].checkedIn = false
      this.$axios
        .put(
          `/orders/${this.orders[index]._id}/checking?event=${this.eventId}`,
          { checkedIn: false }
        )
        .catch(() => (this.orders[index].checkedIn = true))
    },
    onEdit (i) {
      this.order = this.orders[i]
      this.editDialog = true
    },
    saveEdit (v) {
      this.$axios
        .put(`/orders/${this.order._id}?event=${this.eventId}`, {
          paid: v.payment,
          note: v.note
        })
        .then(() => {
          this.order.paid = v.payment
          this.order.note = v.note
          this.editDialog = false
        })
    },
    createCSV (orders) {
      const csvData = orders
        .map((order) => {
          if (!order.user) { return }
          return [
            order.user.first,
            order.user.last,
            order.user.email,
            order.user.phone
          ].join(',')
        })
        .join('\n')
      const blob = new Blob([csvData], { type: 'text/csv' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'tickets_' + this.event.subject + '.csv'
      link.click()
      this.createExportLoading = false
    },
    randomTable (orders) {
      let t = 0
      let l = 0
      let n = Number
      do {
        t++
        n = Math.floor(Math.random() * this.tables)
        l = orders.filter(d => d.table === n + 1).length
      } while (l >= this.partPerTable || t >= this.tables * 10)
      return n + 1
    }
  }
}
</script>

<style></style>
