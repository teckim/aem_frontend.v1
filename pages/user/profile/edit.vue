<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <span class="headline py-2">Edit my profile</span>
      <v-btn
        rounded
        color="success"
        :disabled="!changed || !valid || loading"
        @click="update"
      >
        <span class="pr-4">save</span>
        <v-icon right>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-row>
    <v-card elevation="3" class="mt-8">
      <v-card flat class="d-inline-flex align-center px-4" width="350">
        <v-card-title class="pa-0">
          <v-badge
            overlap
            bordered
            color="error"
            content="!"
            offset-x="18"
            offset-y="18"
            :value="!$auth.user.confirmed"
          >
            <v-avatar
              v-if="$auth.user"
              size="63"
              color="main"
              class="text-uppercase white--text"
            >
              {{ $auth.user.first[0] }}
            </v-avatar>
          </v-badge>
        </v-card-title>
        <v-card-text class="pa-4 text-capitalize text-truncate">
          <v-row v-if="$auth.user" no-gutters align="center">
            <v-col class="body-1 black--text text-truncate" cols="12">
              {{ $auth.user.first + ' ' + $auth.user.last.toUpperCase() }}
            </v-col>
            <v-col class="text-none text-truncate" cols="11">
              {{ $auth.user.email }}
            </v-col>
            <v-col cols="1">
              <v-btn
                small
                icon
                color="primary"
                class="d-inline"
                @click="changeEmailDialog = true"
              >
                <v-icon small>
                  mdi-pencil-outline
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <div>
            {{ role }}
          </div>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card elevation="3" class="mt-6" :loading="loading" :disabled="loading">
      <v-card-text>
        <v-responsive width="500">
          <v-row no-gutters class="title black--text mt-4">
            Personal
          </v-row>
          <v-form ref="editProfileForm" v-model="valid" lazy-validation>
            <div class="pl-3">
              <v-row no-gutters>
                <v-col cols="6" class="pr-2">
                  <v-text-field
                    v-model.trim="user.first"
                    validate-on-blur
                    color="main lighten-2"
                    name="first"
                    label="First name"
                    :rules="vRegFirstName"
                    @blur="user.first = user.first.replace(/\s{2,}/g, ' ')"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model.trim="user.last"
                    validate-on-blur
                    color="main lighten-2"
                    name="last"
                    label="Last name"
                    :rules="vRegLastName"
                    @blur="user.last = user.last.replace(/\s{2,}/g, ' ')"
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="4" class="pr-2">
                  <v-text-field
                    v-model="user.prefix"
                    validate-on-blur
                    color="main lighten-2"
                    name="prefix"
                    prefix="+"
                    hint="country code"
                    persistent-hint
                    :rules="vRegPhonePrefix"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="user.phone"
                    validate-on-blur
                    color="main lighten-2"
                    name="phone"
                    label="Phone number"
                    :prefix="'+' + user.prefix"
                    :rules="vRegPhone"
                  />
                </v-col>
              </v-row>
              <div class="mt-4 caption">
                Gender
              </div>
              <v-radio-group
                v-model="user.gender"
                validate-on-blur
                row
                dense
                color="main lighten-2"
                class="mt-0"
                :rules="vRegGender"
              >
                <v-radio
                  color="main lighten-2"
                  label="Male"
                  value="M"
                />
                <v-radio
                  color="main lighten-2"
                  label="Female"
                  value="F"
                />
              </v-radio-group>
            </div>
            <v-row no-gutters class="title black--text mt-8">
              Details
            </v-row>
            <div class="pl-3">
              <v-menu
                ref="menu"
                v-model="menu"
                offset-y
                transition="scale-transition"
                min-width="290px"
                :close-on-content-click="false"
              >
                <template #activator="{ on }">
                  <v-text-field
                    v-model="bDay"
                    readonly
                    validate-on-blur
                    color="main lighten-2"
                    name="b_day"
                    label="Birthday date"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="user.b_day"
                  color="main"
                  min="1950-01-01"
                  :max="new Date().toISOString().substr(0, 10)"
                  @change="save"
                />
              </v-menu>
              <v-autocomplete
                v-model="user.major"
                validate-on-blur
                color="main lighten-2"
                name="discipline"
                label="Discipline"
                item-color="main"
                :rules="vRegMajor"
                :items="disciplines"
              />
              <div class="mt-4 caption">
                State
              </div>
              <v-radio-group
                v-model="user.student"
                validate-on-blur
                row
                dense
                color="main lighten-2"
                class="mt-0"
              >
                <v-radio
                  color="main lighten-2"
                  label="Student"
                  :value="true"
                  name="state"
                />
                <v-radio
                  color="main lighten-2"
                  label="Professional"
                  :value="false"
                  name="state"
                />
              </v-radio-group>
            </div>
            <v-row
              id="email-subscribtion"
              no-gutters
              class="title black--text mt-8"
            >
              Email subscribtion
            </v-row>
            <div class="pl-3 pt-3">
              <span v-show="user.subscribed">
                If you unsubscrib, you won't receive any updates from us.
              </span>
              <span v-show="!user.subscribed">
                We will do our best to make it more interesting for everyone.
              </span>
              <v-switch
                v-model="user.subscribed"
                color="main"
                class="mt-0"
                :label="user.subscribed ? 'Subscribed' : 'Unsubscribed'"
              />
            </div>
          </v-form>
          <v-row
            id="email-subscribtion"
            no-gutters
            class="title black--text mt-8"
          >
            Delete account
          </v-row>
          <div class="pl-3 pt-3">
            <v-text-field
              v-model="password"
              validate-on-blur
              persistent-hint
              color="main lighten-2"
              name="pass"
              label="Password"
              hint="enter password to delete your account"
              :disabled="loading"
              :type="showPass ? 'text' : 'password'"
              :rules="vLogPassword"
              @keyup.enter.native="removeDialog = true"
            >
              <template #append>
                <v-icon small @click="showPass = !showPass">
                  {{
                    showPass ? 'mdi-eye' : 'mdi-eye-off'
                  }}
                </v-icon>
              </template>
            </v-text-field>
            <v-btn
              color="error"
              :disabled="!password"
              :loading="deleting"
              @click="removeDialog = true"
            >
              <v-icon left>
                mdi-delete
              </v-icon> delete account
            </v-btn>
          </div>
        </v-responsive>
      </v-card-text>
    </v-card>
    <v-dialog
      id="email"
      v-model="changeEmailDialog"
      persistent
      :overlay="false"
      max-width="400px"
      transition="dialog-transition"
    >
      <change-email @close="updated" />
    </v-dialog>
    <v-dialog
      v-model="removeDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <remove
        alert="You will lose all your tickets"
        message="Are you sure you want to delete your account?"
        @cancel="removeDialog = false"
        @confirm="deleteAccount"
      />
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { diff } from 'deep-diff'
import changeEmail from '~/components/user/changeEmail'
import validators from '~/plugins/validator'
import disciplines from '~/plugins/disciplines'
import remove from '~/components/global/remove'

export default {
  components: {
    changeEmail,
    remove
  },
  layout: 'user',
  data: () => ({
    user: {
      first: '',
      last: '',
      phone: '',
      gender: null,
      b_day: null,
      major: '',
      student: null,
      prefix: '',
      subscribed: null
    },
    password: null,
    showPass: false,
    orgUser: {},
    valid: true,
    menu: false,
    loading: false,
    deleting: false,
    changeEmailDialog: false,
    removeDialog: false,
    ...disciplines,
    ...validators
  }),
  head () {
    return { title: 'Edit profile' }
  },
  computed: {
    role () {
      const role = this.$auth.user.role
      if (!role) { return '' }
      return role.slice(0, 6) + ' ' + role.slice(6)
    },
    bDay () {
      return this.user.b_day
        ? moment(this.user.b_day).format('MMM D, YYYY')
        : ''
    },
    changed () {
      return !!diff(this.orgUser, this.user)
    },
    hash () {
      return this.$route.hash
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    hash (val) {
      if (val === '#email') { this.changeEmailDialog = true }
    }
  },
  mounted () {
    this.init(this.$auth.user)
    if (this.hash === '#email') { this.changeEmailDialog = true }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    init (user) {
      this.user = {
        first: user.first,
        last: user.last,
        phone: user.phone.split(')')[1],
        prefix: user.phone.split(')')[0].substr(1),
        gender: user.gender,
        b_day: new Date(user.b_day).toISOString().substr(0, 10),
        major: user.major,
        student: user.student,
        subscribed: user.subscribed
      }
      this.orgUser = { ...this.user }
    },
    update () {
      this.loading = true
      const user = JSON.parse(JSON.stringify(this.user))
      user.phone = '(' + this.user.prefix + ')' + user.phone
      this.$axios
        .put('/users', user)
        .then(() => {
          this.$store.dispatch('snackbar', {
            text: 'Your profile updated successfully',
            color: 'success',
            timeout: 3000
          })
          this.$auth.fetchUser()
        })
        .finally(() => (this.loading = false))
    },
    updated () {
      this.$router.push({ hash: null })
      this.changeEmailDialog = false
    },
    deleteAccount () {
      this.removeDialog = false
      this.deleting = true
      this.$axios
        .post('/users/delete', { password: this.password })
        .then(() => this.$auth.logout())
        .finally(() => (this.deleting = false))
    }
  }
}
</script>

<style></style>
