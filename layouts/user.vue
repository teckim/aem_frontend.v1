<template>
  <v-app>
    <snackbar />
    <nav-bar />
    <v-content>
      <v-container>
        <v-alert
          :value="$auth.user && !$auth.user.confirmed"
          dense
          tile
          text
          border="left"
          type="warning"
          class="body-2"
        >
          Please check your email for verification to recieve our latest
          updates. you can
          <a v-show="!count" @click="resendVerification">
            resend
          </a>
          <span v-show="!!count" class="text--disabled">
            resend in {{ count }}
          </span>
          verification or
          <nuxt-link to="/user/profile/edit#email">
            change
          </nuxt-link>
          email
        </v-alert>
        <nuxt class="centent mt-4" />
      </v-container>
    </v-content>
    <!-- <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import navBar from '~/components/user/navBar'
import snackbar from '~/components/global/snackbar'
export default {
  components: {
    navBar,
    snackbar
  },
  data: () => ({
    count: 0
  }),
  head () {
    return {
      title: 'User panel'
    }
  },
  methods: {
    resendVerification () {
      this.$axios.get('/users/send-verification').then((res) => {
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
<style scoped></style>
