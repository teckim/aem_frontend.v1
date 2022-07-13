<template>
  <v-card class="py-8 px-4">
    <div class="text-center">
      <div>
        Please check your email inbox/spam to verify your account.
      </div>
      <div class="my-2 grey--text">
        Or
      </div>
      <v-btn outlined rounded color="main" to="/user/profile/edit#email">
        <v-icon left>
          mdi-pencil-outline
        </v-icon> change email
      </v-btn>
      <v-btn
        depressed
        rounded
        :loading="resending"
        :disabled="!!count"
        color="main"
        class="white--text"
        @click="resendVerification()"
      >
        <v-icon left color="white">
          mdi-repeat
        </v-icon> resned
        <span v-show="!!count" v-text="count" />
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    count: 0,
    resending: false
  }),
  methods: {
    resendVerification () {
      this.resending = true
      this.$axios
        .get('/users/send-verification')
        .then((res) => {
          if (res.status === 208) {
            this.$store.dispatch('snackbar', {
              text: 'Account already activated',
              color: 'warning',
              timeout: 3000
            })
          } else {
            this.countDown()
            this.$store.dispatch('snackbar', {
              text: 'Email resent successfully!',
              color: 'success',
              timeout: 3000
            })
          }
        })
        .finally(() => (this.resending = false))
    },
    countDown () {
      this.count = 60
      const vm = this
      const interval = setInterval(function () {
        if (vm.count > 0) {
          vm.count--
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
