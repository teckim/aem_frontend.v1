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
          <a @click="resendVerification"> resend </a>
          verification or
          <a @click="$router.push('/user/profile/edit#email')"> change </a>
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
import navBar from '~/components/dashboard/navBar'
import snackbar from '~/components/global/snackbar'
export default {
  components: {
    navBar,
    snackbar
  },
  data () {
    return {}
  },
  head () {
    return {
      title: 'Dashboard'
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
          this.$store.dispatch('snackbar', {
            text: 'Email resent successfully!',
            color: 'success',
            timeout: 3000
          })
        }
      })
    }
  }
}
</script>
<style>
.v-btn--plain:hover:before {
  background-color: transparent;
}
.v-btn--plain:before {
  display: none;
}
</style>
