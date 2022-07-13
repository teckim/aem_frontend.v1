<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <div v-if="user" class="py-2">
        <div class="headline" v-text="user.first + ' ' + user.last" />
        <div class="subtitle text--secondary">
          {{ user.email }}
          <v-icon :color="user.confirmed ? 'success' : 'warning'" small>
            {{
              user.confirmed
                ? 'mdi-check-circle-outline'
                : 'mdi-alert-circle-outline'
            }}
          </v-icon>
        </div>
      </div>
      <!-- <v-btn rounded color="main white--text">
        <span class="pr-4">scan</span>
        <v-icon right>mdi-qrcode-scan</v-icon>
      </v-btn> -->
    </v-row>
    <div v-if="user">
      <v-card flat tile class="body-2 py-3">
        <div class="title">
          General
        </div>
        <table class="ml-4">
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
              role
            </td>
            <td>
              {{ user.role }}
            </td>
          </tr>
          <tr v-if="user.office">
            <td class="pr-4 text--secondary">
              office
            </td>
            <td>
              <div>{{ user.office.name }}</div>
              <div>
                {{ user.office.province + ' - ' + user.office.country }}
              </div>
            </td>
          </tr>
          <tr>
            <td class="pr-4 text--secondary">
              full name
            </td>
            <td class="main--text">
              {{ user.first + ', ' + user.last }}
            </td>
          </tr>
          <tr>
            <td class="pr-4 text--secondary">
              gender
            </td>
            <td>
              {{ user.gender === 'M' ? 'male' : 'female' }}
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
              state
            </td>
            <td>
              {{ user.student ? 'Student' : 'Professional' }}
            </td>
          </tr>
          <tr>
            <td
              :class="`${isBlocked ? 'error--text' : 'text--secondary'} pr-4`"
            >
              blocked
            </td>
            <td>
              <div v-if="!user.blocked">
                Never
              </div>
              <div v-else>
                <div v-text="moment(user.blocked).format('LLL')" />
                <div v-text="moment(user.blocked).fromNow()" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="pr-4 text--secondary">
              since
            </td>
            <td>
              {{ moment(user.createdOn).format('LLL') }}
            </td>
          </tr>
        </table>
      </v-card>
      <v-divider />
      <v-card flat tile class="body-2 py-3">
        <div class="title">
          contact
        </div>
        <table class="ml-4">
          <tr>
            <td class="pr-4 text--secondary">
              email
            </td>
            <td>
              {{ user.email }}
              <v-icon v-if="!user.confirmed" small>
                mdi-alert-circle-outline
              </v-icon>
              <v-btn
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
        </table>
      </v-card>
      <v-divider />
      <v-card flat tile class="body-2 py-3">
        <div class="title">
          Details
        </div>
        <table class="ml-4">
          <tr>
            <td class="pr-4 text--secondary">
              birth date
            </td>
            <td>
              {{ moment(user.b_day).format('LL') }}
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
              following
            </td>
            <td>
              <div v-for="office in user.followOffice" :key="office._id">
                <div>{{ office.name }}</div>
                <div>{{ office.province + ' - ' + office.country }}</div>
              </div>
            </td>
          </tr>
        </table>
      </v-card>
      <v-divider />
      <div v-if="isBlocked">
        This user is already blocked, will be unblocked
        <span class="main--text" v-text="moment(user.blocked).fromNow()" />
      </div>
      <div class="mt-4">
        <v-menu
          v-model="blockDateMenu"
          transition="scale-transition"
          min-width="290px"
          offset-y
          :close-on-content-click="false"
          :nudge-right="40"
        >
          <template #activator="{ on }">
            <v-text-field
              :value="blockDateFormatted"
              name="block-date"
              label="Block user until"
              color="main ligthen-2"
              class="d-inline-block"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="blockDate"
            color="main ligthen-2"
            @input="blockDateMenu = false"
          />
        </v-menu>
        <v-btn
          rounded
          color="error"
          :disabled="
            (user.blocked || '').substr(0, 10) == blockDate || !blockDate
          "
          :loading="blocking"
          @click="block"
        >
          block
        </v-btn>
        <v-btn
          v-if="isBlocked"
          rounded
          color="success"
          :loading="blocking"
          @click="unblock"
        >
          unblock
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data: () => ({
    moment,
    user: null,
    blockDateMenu: false,
    blockDate: null,
    blocking: false,
    loading: true
  }),
  computed: {
    blockDateFormatted () {
      if (this.blockDate) { return this.moment(this.blockDate).format('LL') }
      return null
    },
    isBlocked () {
      if (new Date(this.user.blocked).getTime() >= new Date().getTime()) { return true }
      return false
    }
  },
  mounted () {
    this.getUser(this.$route.params.id)
  },
  methods: {
    getUser (id) {
      this.loading = this.$axios
        .get(`/users/user/${id}`)
        .then(({ data }) => {
          this.user = data.user
          this.blockDate = this.user.blocked
            ? this.user.blocked.substr(0, 10)
            : null
        })
        .finally(() => (this.loading = false))
    },
    block () {
      this.blocking = true
      this.$axios
        .put('/users/blocking', { id: this.user._id, date: this.blockDate })
        .then(() => {
          this.$store.dispatch('snackbar', {
            text: 'User blocked successfully',
            color: 'success',
            timeout: 3000
          })
          this.user.blocked = this.blockDate
        })
        .finally(() => (this.blocking = false))
    },
    unblock () {
      this.blocking = true
      this.$axios
        .put('/users/blocking', {
          id: this.user._id,
          date: new Date().toISOString()
        })
        .then(() => {
          this.$store.dispatch('snackbar', {
            text: 'User unblocked successfully',
            color: 'success',
            timeout: 3000
          })
          this.user.blocked = this.blockDate
        })
        .finally(() => (this.blocking = false))
    },
    phoneNum (num) {
      num = num.replace('(', '+')
      num = num.replace(')', ' ')
      return num
    }
  }
}
</script>

<style scoped>
tr > td {
  padding-bottom: 5px;
}
td {
  vertical-align: baseline;
}
</style>
