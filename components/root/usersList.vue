<template>
  <div>
    <v-card v-if="!items.length && !loading" flat class="py-8">
      <v-card-text>
        <div class="text-center">
          <span>
            No users to show, Please
            <a>retry</a>
          </span>
        </div>
      </v-card-text>
    </v-card>
    <div v-outside-click="onClickOutside">
      <v-card
        v-for="(user, i) in items"
        :key="i"
        outlined
        class="my-2 user-card"
        :ripple="false"
        :to="'/root/users/' + user._id"
      >
        <v-row no-gutters>
          <v-col class="py-4 pl-4">
            <div class="d-inline-flex align-center">
              <span class="title mr-2">
                {{ user.first + ' ' + user.last }}
              </span>
            </div>
            <div class="text-truncate body-2 text--secondary">
              {{ user.email }}
            </div>
          </v-col>
          <div
            v-show="actionBtns === i"
            class="user-action-buttons fill-height"
          >
            <v-btn
              tile
              depressed
              color="success"
              height="100%"
              width="80"
              @click="$emit('accept', user.email)"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn
              tile
              depressed
              color="error"
              height="100%"
              width="80"
              @click="$emit('delete', user._id)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
              tile
              depressed
              color="white"
              height="100%"
              width="100%"
              class="v-btn--plain"
              :ripple="false"
              @click="showDetails(i)"
            />
          </div>
        </v-row>
        <v-slide-x-reverse-transition hide-on-leave>
          <div v-show="details === i">
            <v-divider />
            <v-card flat tile class="body-2 px-4 py-3">
              <table>
                <tbody>
                  <tr>
                    <td class="pr-4 text--secondary">
                      ID
                    </td>
                    <td>
                      {{ user._id }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      full name
                    </td>
                    <td class="main--text">
                      {{ user.first + ' ' + user.last }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      email
                    </td>
                    <td>
                      {{ user.email }}
                      <v-btn
                        v-if="user.confirmed"
                        text
                        rounded
                        x-small
                        color="success"
                        :href="`mailto:${user.email}`"
                      >
                        send
                        <v-icon small right>
                          mdi-send-circle-outline
                        </v-icon>
                      </v-btn>
                      <v-icon v-else small>
                        mdi-alert-circle-outline
                      </v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      phone
                    </td>
                    <td>
                      {{ phoneNum(user.phone) }}
                      <v-btn
                        text
                        rounded
                        x-small
                        color="success"
                        :href="`tel:${phoneNum(user.phone)}`"
                      >
                        call
                        <v-icon small right>
                          mdi-phone-outline
                        </v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      positon
                    </td>
                    <td>
                      {{ user.position }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      decipline
                    </td>
                    <td>
                      {{ user.major || 'None' }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      checked in tickets
                    </td>
                    <td>
                      {{ user.checkedTicketsCount }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      unchecked in tickets
                    </td>
                    <td>
                      {{ user.uncheckedTicketsCount }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      requested
                    </td>
                    <td>
                      {{ moment(user.createdOn).from() }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-card>
          </div>
        </v-slide-x-reverse-transition>
      </v-card>
      <div v-show="!loading && !!items.length" class="text-center py-5">
        <v-btn
          rounded
          text
          color="primary"
          :disabled="items.length >= total"
          @click="$emit('loadMore')"
        >
          <v-icon left>
            mdi-chevron-down
          </v-icon>
          load more
        </v-btn>
      </div>
    </div>
    <div v-show="loading">
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
    loading: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 5
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    moment,
    shareDialog: false,
    removeDialog: false,
    actionBtns: null,
    id: '',
    details: ''
  }),
  methods: {
    phoneNum (num) {
      num = num.replace('(', '+')
      num = num.replace(')', ' ')
      return num
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
td {
  padding-bottom: 5px;
}
.user-card {
  transition: all 200ms;
  border-radius: 0;
  position: relative;
}
.user-card .row {
  position: relative;
}
.user-card:hover {
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}
/* .user-card:hover .user-action-buttons {
  display: inline-flex;
} */
.user-action-buttons {
  position: absolute;
  overflow: hidden;
  right: 0;
  width: 100%;
  background-color: #fff;
  display: inline-flex;
}
.v-toolbar__content {
  padding: 0px !important;
}
</style>
