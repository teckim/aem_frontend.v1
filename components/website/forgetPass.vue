<template>
  <div>
    <v-slide-x-transition hide-on-leave>
      <div v-if="!success" key="1">
        <v-card :loading="loading">
          <v-card-title primary-title>
            Forget password
          </v-card-title>
          <v-card-subtitle>send reset password email</v-card-subtitle>
          <v-card-text>
            <v-form ref="forgetPassForm">
              <v-col class="pa-0">
                <v-text-field
                  v-model.trim="email"
                  validate-on-blur
                  color="main lighten-2"
                  class="body-2"
                  name="email"
                  label="Email"
                  :rules="vLogEmail"
                />
              </v-col>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="$emit('close')">
              Cancel
            </v-btn>
            <v-btn
              depressed
              dark
              color="main"
              width="100"
              @click="sendResetPassEmail"
            >
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-else key="2">
        <v-card :loading="loading">
          <div class="text-center py-5 px-1">
            <check />
            <h3 class="success--text pb-2">
              Email sent!
            </h3>
            <span class="body-2 grey--text">We've sent you a reset password email that is valid for 1H,
              <br>
              please check your email inbox/spam to reset your password.</span><br>
            <v-btn
              v-show="email"
              text
              color="primary"
              :disabled="!!count"
              @click="sendResetPassEmail"
            >
              resend again... <span v-show="!!count" v-text="count" />
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-slide-x-transition>
  </div>
</template>

<script>
import check from '~/components/global/check'
import validators from '~/plugins/validator'

export default {
  components: {
    check
  },
  data: () => ({
    loading: false,
    success: false,
    email: '',
    count: 0,
    ...validators
  }),
  methods: {
    sendResetPassEmail () {
      if (this.$refs.forgetPassForm.validate()) {
        this.loading = true
        this.$axios
          .get(`/users/send-reset-pass?email=${this.email}`)
          .then(() => {
            this.success = true
            this.countDown()
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    countDown () {
      this.count = 1
      const vm = this
      const interval = setInterval(function () {
        if (vm.count < 60) {
          vm.count++
        } else {
          clearInterval(interval)
          vm.count = 0
        }
      }, 1000)
    }
  }
}
</script>

<style></style>
