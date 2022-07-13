<template>
  <div>
    <v-card v-if="!items.length && !loading" flat class="py-8">
      <v-card-text>
        <div class="text-center">
          <span>
            No sponsor to show, Please
            <a>retry</a>
          </span>
        </div>
      </v-card-text>
    </v-card>
    <div>
      <v-card
        v-for="(sponsor, i) in items"
        :key="i"
        v-outside-click="onClickOutside"
        outlined
        class="my-2 sponsor-card"
        :ripple="false"
        @click.stop="actionBtns = i"
      >
        <v-row no-gutters>
          <v-col class="py-4 pl-4">
            <div>
              <span class="title mr-2">
                {{ sponsor.name }}
              </span>
            </div>
            <div class="body-2 text--secondary">
              {{ sponsor.type }} sponsor
            </div>
          </v-col>
          <div
            v-show="actionBtns === i"
            class="sponsor-action-buttons fill-height"
          >
            <v-spacer />
            <v-btn
              tile
              depressed
              color="primary"
              height="100%"
              width="80"
              @click="$emit('edit', i)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              tile
              depressed
              color="error"
              height="100%"
              width="80"
              @click="$emit('delete', sponsor._id)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-row>
        <!-- <v-slide-x-reverse-transition hide-on-leave>
          <div v-show="details === i">
            <v-divider></v-divider>
            <v-card flat tile class="body-2 px-4 py-3">
              <table>
                <tbody>
                  <tr>
                    <td class="pr-4 text--secondary">
                      ID
                    </td>
                    <td>
                      {{ office._id }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      full name
                    </td>
                    <td class="main--text">
                      {{ office.user.first + ' ' + office.user.last }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      email
                    </td>
                    <td>
                      {{ office.user.email }}
                      <v-btn
                        v-if="office.user.confirmed"
                        text
                        rounded
                        x-small
                        color="success"
                        :href="`mailto:${office.user.email}`"
                      >
                        send
                        <v-icon small right>mdi-send-circle-outline</v-icon>
                      </v-btn>
                      <v-icon v-else small>mdi-alert-circle-outline</v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      phone
                    </td>
                    <td>
                      {{ phoneNum(office.user.phone) }}
                      <v-btn
                        text
                        rounded
                        x-small
                        color="success"
                        :href="`tel:${phoneNum(office.user.phone)}`"
                      >
                        call
                        <v-icon small right>mdi-phone-outline</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      positon
                    </td>
                    <td>
                      {{ office.position }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      decipline
                    </td>
                    <td>
                      {{ office.user.major || 'None' }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      checked in tickets
                    </td>
                    <td>
                      {{ office.user.checkedTicketsCount }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      unchecked in tickets
                    </td>
                    <td>
                      {{ office.user.uncheckedTicketsCount }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-4 text--secondary">
                      requested
                    </td>
                    <td>
                      {{ moment(office.createdOn).from() }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-card>
          </div>
        </v-slide-x-reverse-transition> -->
      </v-card>
    </div>
    <div v-show="loading">
      <v-card v-for="index in 5" :key="index" outlined class="px-2 my-2">
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
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    actionBtns: null,
    id: ''
  }),
  methods: {
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
.sponsor-card {
  transition: all 200ms;
  border-radius: 0;
  position: relative;
}
.sponsor-card .row {
  position: relative;
}
.sponsor-card:hover {
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}
/* .sponsor-card:hover .sponsor-action-buttons {
  display: inline-flex;
} */
.sponsor-action-buttons {
  position: absolute;
  overflow: hidden;
  right: 0;
  width: 100%;
  display: inline-flex;
}
.v-toolbar__content {
  padding: 0px !important;
}
</style>
