<template>
  <div>
    <v-card v-if="!items.length && !loading" flat class="py-8">
      <v-card-text>
        <div class="text-center">
          <span>
            No members to show, Please
            <a>retry</a>
          </span>
        </div>
      </v-card-text>
    </v-card>
    <div>
      <v-card
        v-for="(member, i) in items"
        :key="i"
        v-outside-click="onClickOutside"
        outlined
        class="my-2 member-card"
        :ripple="false"
        @click.stop="actionBtns = i"
      >
        <div v-if="!!member">
          <v-row no-gutters>
            <v-col class="py-4 pl-4">
              <div class="d-inline-flex align-center">
                <span class="title mr-2">
                  {{ member.first + ' ' + member.last }}
                </span>
              </div>
              <div class="body-2 text--secondary">
                {{ role(member.role) }}
              </div>
            </v-col>
            <div
              v-show="actionBtns === i"
              class="member-action-buttons fill-height"
            >
              <v-btn
                v-if="member.role !== 'officeAdmin'"
                tile
                depressed
                color="error"
                height="100%"
                width="80"
                @click="$emit('delete', member._id)"
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
                        {{ member._id }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 text--secondary">
                        full name
                      </td>
                      <td class="main--text">
                        {{ member.first + ' ' + member.last }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 text--secondary">
                        email
                      </td>
                      <td>
                        {{ member.email }}
                        <v-btn
                          v-if="member.confirmed"
                          text
                          rounded
                          x-small
                          color="success"
                          :href="`mailto:${member.email}`"
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
                        {{ phoneNum(member.phone) }}
                        <v-btn
                          text
                          rounded
                          x-small
                          color="success"
                          :href="`tel:${phoneNum(member.phone)}`"
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
                        {{ member.position }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 text--secondary">
                        decipline
                      </td>
                      <td>
                        {{ member.major || 'None' }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 text--secondary">
                        joined
                      </td>
                      <td>
                        {{ moment(member.createdOn).from() }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </v-card>
            </div>
          </v-slide-x-reverse-transition>
        </div>
        <div v-else class="pl-4 py-4">
          <div class="title">
            Account deleted
          </div>
        </div>
      </v-card>
      <div v-show="!loading && !!items.length" class="text-center py-5">
        <v-btn rounded text color="primary" @click="$emit('loadMore')">
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
    }
  },
  data: () => ({
    moment,
    actionBtns: null,
    id: '',
    details: ''
  }),
  methods: {
    role (role) {
      if (!role) { return '' }
      return role.slice(0, 6) + ' ' + role.slice(6)
    },
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
.member-card {
  transition: all 200ms;
  border-radius: 0;
  position: relative;
}
.member-card .row {
  position: relative;
}
.member-card:hover {
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}
/* .member-card:hover .member-action-buttons {
  display: inline-flex;
} */
.member-action-buttons {
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
