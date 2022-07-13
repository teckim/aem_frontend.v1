<template>
  <div>
    <v-alert
      text
      dismissible
      border="left"
      type="warning"
      :value="!!bDays.length"
    >
      <div>You have some birthdays today,</div>
      <span v-if="!!bDays.length" class="black--text body-2">
        is birthday {{ items.length ? items[0].user.isBirthday : null }}
        <div v-for="user in bDays" :key="user._id">
          {{ order.user.first + ' ' + order.user.last }}
        </div>
      </span>
    </v-alert>
    <v-card v-if="!items.length && !loading" flat class="py-8">
      <v-card-text>
        <div class="text-center">
          <span>
            No tickets yet to show, Please
            <a @click="$emit('retry')">retry</a>
            <br>Or
            <a @click="$router.push('/dashboard/events/manage')">
              go back
            </a>
          </span>
        </div>
      </v-card-text>
    </v-card>
    <div>
      <v-card
        v-for="(order, i) in items"
        :key="order._id"
        v-outside-click="onClickOutside"
        outlined
        class="my-2 pl-2 order-card"
        :ripple="false"
        @click.stop="actionBtns = i"
      >
        <div
          :class="`${order.checkedIn ? 'success' : 'grey'} order-card--checked`"
        />
        <div v-if="!!order.user">
          <v-row no-gutters>
            <v-col class="py-4 pl-4">
              <v-badge dot left color="warning" :value="!!order.note">
                <div class="d-inline-flex align-center">
                  <span
                    class="d-inline-block text-truncate title mr-2"
                    style="max-width: 200px"
                  >
                    {{ order.user.first + ' ' + order.user.last }}
                  </span>
                  <div>
                    <v-chip
                      v-if="order.paid && !!price"
                      outlined
                      small
                      :color="order.paid === price ? 'success' : 'grey'"
                    >
                      <v-icon small left>
                        {{
                          order.paid === price
                            ? 'mdi-check-circle'
                            : 'mdi-alert-circle'
                        }}
                      </v-icon>
                      {{ order.paid === price ? 'Paid' : 'Partly paid' }}
                    </v-chip>
                    <v-chip v-if="order.table" outlined small color="main">
                      table {{ order.table }}
                    </v-chip>
                  </div>
                </div>
              </v-badge>
              <!-- <div
                v-if="['root', 'officeAdmin'].includes(role)"
                class="text-truncate body-2 text--secondary"
              >
                {{ order.user.email }}
              </div> -->
            </v-col>
            <div
              v-show="actionBtns === i"
              class="order-action-buttons fill-height"
            >
              <v-btn
                v-show="!order.checkedIn"
                tile
                depressed
                color="success"
                class="mr-auto"
                height="100%"
                width="80"
                @click="$emit('checkin', i)"
              >
                <v-icon>mdi-account-arrow-left-outline</v-icon>
              </v-btn>
              <v-btn
                v-show="order.checkedIn"
                tile
                depressed
                color="error"
                height="100%"
                width="80"
                @click="$emit('checkout', i)"
              >
                <v-icon>mdi-account-arrow-right-outline</v-icon>
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
                  @click="showDetails(order._id)"
                />
              </v-spacer>
              <v-divider vertical />
              <v-btn
                color="white"
                height="100%"
                width="60"
                tile
                depressed
                @click="$emit('edit', i)"
              >
                <v-icon color="primary">
                  mdi-circle-edit-outline
                </v-icon>
              </v-btn>
            </div>
          </v-row>
          <v-slide-x-reverse-transition hide-on-leave>
            <div v-show="details === order._id">
              <v-divider />
              <v-card
                v-if="!!order.user && ['root', 'officeAdmin'].includes(role)"
                flat
                tile
                class="body-2 px-4 py-3"
              >
                <v-alert
                  v-if="order.note"
                  text
                  tile
                  dense
                  type="warning"
                  :value="true"
                >
                  {{ order.note }}
                </v-alert>
                <table>
                  <tbody>
                    <tr>
                      <td class="pr-4 text--secondary">
                        ticket ID
                      </td>
                      <td>
                        <div>
                          {{ order._id }}
                        </div>
                      </td>
                    </tr>
                    <tr v-show="!!order.table">
                      <td class="pr-4 text--secondary">
                        table
                      </td>
                      <td>
                        <div class="main--text" v-text="order.table" />
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 text--secondary">
                        status
                      </td>
                      <td>
                        <div>
                          {{
                            order.user.confirmed ? 'confirmed' : 'unconfirmed'
                          }}
                          <v-icon
                            v-if="order.user.confirmed"
                            small
                            color="success"
                            class="pl-4"
                          >
                            mdi-check-circle
                          </v-icon>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 text--secondary">
                        decipline
                      </td>
                      <td>
                        <div>
                          {{ order.user.major || 'None' }}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 text--secondary">
                        joined
                      </td>
                      <td>
                        <div>
                          {{ moment(order.user.createdOn).from() }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="mt-2">
                  <v-btn
                    fab
                    x-small
                    color="success"
                    :href="`mailto:${order.user.email}`"
                  >
                    <v-icon small>
                      mdi-email
                    </v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    x-small
                    color="primary"
                    :href="`tel:${phoneNum(order.user.phone)}`"
                  >
                    <v-icon small>
                      mdi-phone
                    </v-icon>
                  </v-btn>
                </div>
              </v-card>
            </div>
          </v-slide-x-reverse-transition>
        </div>
        <div v-else class="pl-4 py-4">
          <div class="title">
            User deleted
          </div>
        </div>
      </v-card>
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
        class="px-2 my-2"
        :style="`opacity: ${(limit - index + 1) / limit}`"
      >
        <v-responsive max-width="200">
          <v-skeleton-loader
            ref="skeleton"
            type="list-item-two-line"
            class="mx-auto"
          />
        </v-responsive>
      </v-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    event: {
      type: Object,
      default: null
    },
    bDays: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    },
    role: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 5
    }
  },
  data: () => ({
    moment,
    removeDialog: false,
    actionBtns: null,
    id: '',
    details: ''
  }),
  computed: {
    price () {
      if (!this.event) { return 0 }
      return this.event.price
    }
  },
  methods: {
    phoneNum (num) {
      num = num.replace('(', '+')
      num = num.replace(')', ' ')
      return num
    },
    formatPhoneNb (n) {
      if (!n) { return '' }
      let result = n
      result = result.replace('(', '+')
      result = result.replace(')', ' ')
      return result
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

<style scoped>
.order-card {
  transition: all 200ms;
  border-radius: 0;
  position: relative;
}
.order-card .row {
  position: relative;
}
.order-card .td-icon {
  width: 80px;
  vertical-align: baseline;
  text-align: center;
}
.order-card:hover {
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}
/* .order-card:hover .order-action-buttons {
  display: inline-flex;
} */
.order-action-buttons {
  position: absolute;
  overflow: hidden;
  right: 0;
  width: 100%;
  background-color: #fff;
  display: inline-flex;
}
.order-card--checked {
  position: absolute;
  width: 8px;
  height: 100%;
  top: 0;
  left: 0;
  border-top-right-radius: unset !important;
  border-bottom-right-radius: unset !important;
  border-bottom-left-radius: inherit !important;
}
.v-toolbar__content {
  padding: 0px !important;
}
</style>
