<template>
  <v-card flat class="py-12">
    <v-stepper v-model="step" alt-labels class="elevation-0">
      <v-stepper-header v-show="step !== 4" class="elevation-0">
        <v-stepper-step
          :color="step > 1 ? 'success' : 'main'"
          :complete="step > 1"
          step="1"
        >
          <span :class="step === 1 ? 'body-1' : 'body-2'">Account</span><small
            v-show="step === 1"
            class="main--text"
          >required</small>
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :color="step > 2 ? 'success' : 'main'"
          :complete="step > 2"
          step="2"
        >
          <span :class="step === 2 ? 'body-1' : 'body-2'">Personal</span><small
            v-show="step === 2"
            class="main--text"
          >required</small>
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :color="step > 3 ? 'success' : 'main'"
          :complete="step > 3"
          step="3"
        >
          <span :class="step === 3 ? 'body-1' : 'body-2'">Additional</span>
        </v-stepper-step>
      </v-stepper-header>
      <div v-show="step < 4" class="px-6">
        <v-card flat class="mx-auto" width="350">
          <v-card-title class="px-0 pb-0">
            <div class="main--text font-weight-black login-title">
              SIGN UP FOR AEM
            </div>
          </v-card-title>
          <v-card-text class="px-0">
            <div class="grey--text">
              Please complete the steps
            </div>
          </v-card-text>
        </v-card>
      </div>
      <v-stepper-items>
        <v-stepper-content class="pa-0" step="1">
          <v-form ref="accountForm">
            <v-card flat class="mx-auto pt-3 text-center" width="350">
              <v-text-field
                v-model.trim="user.email"
                validate-on-blur
                color="main lighten-2"
                class="body-2"
                name="email"
                label="Email"
                :rules="vRegEmail"
                :error-messages="emailErr"
              />
              <v-text-field
                v-model="user.password"
                validate-on-blur
                color="main lighten-2"
                name="pass"
                label="Password"
                :type="showPass ? 'text' : 'password'"
                :rules="vRegPassword"
              >
                <template #append>
                  <v-icon small @click="showPass = !showPass">
                    {{
                      showPass ? 'mdi-eye' : 'mdi-eye-off'
                    }}
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field
                v-model="passConf"
                validate-on-blur
                color="main lighten-2"
                name="passConf"
                label="Confirm password"
                :type="showPass ? 'text' : 'password'"
                :rules="vRegConfPassword"
                :error-messages="passConfErr"
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
                depressed
                large
                dark
                rounded
                class="mt-8"
                color="main"
                min-width="150"
                :loading="loadingBtn"
                @click="nextStep(2)"
              >
                next <v-icon small right>
                  mdi-arrow-right
                </v-icon>
              </v-btn>
            </v-card>
          </v-form>
        </v-stepper-content>

        <v-stepper-content class="pa-0" step="2">
          <v-form ref="personalForm">
            <v-card flat class="mx-auto pt-3" width="350">
              <v-row no-gutters>
                <v-col cols="6" class="pr-2">
                  <v-text-field
                    v-model.trim="user.first"
                    validate-on-blur
                    autofocus
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
                    v-model="prefix"
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
                    :prefix="'+' + prefix"
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
              <div class="mt-8">
                <v-btn
                  depressed
                  large
                  dark
                  rounded
                  text
                  color="main"
                  @click="step = 1"
                >
                  <v-icon small left>
                    mdi-arrow-left
                  </v-icon>back
                </v-btn>
                <v-btn
                  depressed
                  large
                  dark
                  rounded
                  color="main"
                  class="float-right"
                  min-width="150"
                  @click="nextStep(3)"
                >
                  next <v-icon small right>
                    mdi-arrow-right
                  </v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-form>
        </v-stepper-content>

        <v-stepper-content class="pa-0" step="3">
          <v-form ref="additionalForm">
            <v-card flat class="mx-auto pt-3" width="350">
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
              <v-radio-group
                v-model="user.student"
                validate-on-blur
                row
                dense
                color="main lighten-2"
              >
                <v-radio
                  color="main lighten-2"
                  label="Student"
                  :value="true"
                  name="gender"
                />
                <v-radio
                  color="main lighten-2"
                  label="Professional"
                  :value="false"
                  name="gender"
                />
              </v-radio-group>
              <v-btn
                depressed
                large
                dark
                rounded
                text
                color="main"
                @click="step = 2"
              >
                <v-icon small left>
                  mdi-arrow-left
                </v-icon>back
              </v-btn>
              <v-btn
                depressed
                large
                dark
                rounded
                color="main"
                class="float-right"
                min-width="150"
                :loading="loadingBtn"
                @click="nextStep(4)"
              >
                sing up <v-icon small right>
                  mdi-check-all
                </v-icon>
              </v-btn>
            </v-card>
          </v-form>
        </v-stepper-content>
        <v-stepper-content class="pa-0" step="4">
          <v-card
            flat
            class="mx-auto d-flex flex-column justify-center align-center text-center"
            width="350"
            min-height="350"
          >
            <check />
            <h3 class="success--text pb-2">
              GREAT! Account created
            </h3>
            <span class="body-2 grey--text">THANK YOU! we've sent you a verification email that is valid for
              24H, <br>
              please check your email inbox/spam to activate your account.</span>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import moment from 'moment'
import check from '~/components/global/check'
import validators from '~/plugins/validator'
import disciplines from '~/plugins/disciplines'

export default {
  components: {
    check
  },
  props: {
    submitForm: {
      type: Function,
      default: null
    }
  },
  data: () => ({
    user: {
      email: '',
      password: '',
      first: '',
      last: '',
      phone: '',
      gender: null,
      b_day: null,
      major: '',
      student: null
    },
    passConf: '',
    prefix: '213',
    date: null,
    menu: false,
    showPass: false,
    loadingBtn: false,
    saving: false,
    step: 1,
    passConfErr: '',
    emailErr: '',
    ...disciplines,
    ...validators
  }),
  computed: {
    bDay () {
      return this.user.b_day
        ? moment(this.user.b_day).format('MMM D, YYYY')
        : ''
    },
    to () {
      return this.$route.query.to || ''
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    async nextStep (s) {
      switch (s) {
        case 2:
          this.passConfErr = ''
          this.emailErr = ''
          if (this.$refs.accountForm.validate()) {
            if (this.user.password !== this.passConf) {
              this.passConfErr = "passwords doesn't match"
            } else {
              this.loadingBtn = true
              const res = await this.$axios.get(
                `/users/${this.user.email}?type=count`
              )
              this.loadingBtn = false
              if (res.data.exists) {
                this.emailErr = 'email alredy in use'
              } else { this.step++ }
            }
          }
          break
        case 3:
          if (this.$refs.personalForm.validate()) { setTimeout(() => this.step++) }
          break
        case 4:
          if (this.$refs.additionalForm.validate()) {
            this.register()
          }
          break
      }
    },
    register () {
      this.loadingBtn = true
      const user = JSON.parse(JSON.stringify(this.user))
      user.phone = '(' + this.prefix + ')' + user.phone
      this.$axios
        .post('/users', user)
        .then((res) => {
          this.step++
          this.$auth.loginWith('local', {
            data: { user: { email: user.email, password: user.password } }
          })
          setTimeout(() => {
            this.$router.push(this.to || '/')
          }, 6000)
        })
        .finally(() => (this.loadingBtn = false))
    }
  }
}
</script>

<style scoped>
.or {
  position: relative;
  top: -15px;
  padding: 0 10px;
  background: #fff;
}

.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  border-radius: 20px;
  /* display:inline-block; */
}
.list-item:first-child {
  margin: 0;
}
.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.button {
  margin: auto;
}
</style>
