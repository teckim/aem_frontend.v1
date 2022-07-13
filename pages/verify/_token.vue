<template>
  <v-row class="verify-container" justify="center" no-gutters>
    <v-col md="5" cols="12">
      <div class="verify-homeLink">
        <v-btn
          tile
          text
          to="/"
          class="main--text"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon> home
        </v-btn>
      </div>
      <v-card
        flat
        min-height="363"
        height="100%"
        class="d-flex flex-column justify-center py-12"
      >
        <v-stepper v-model="step" alt-labels class="elevation-0">
          <v-stepper-items class="my-12">
            <v-stepper-content step="1">
              <div class="text-center">
                One moment please...
              </div>
            </v-stepper-content>
            <v-stepper-content step="2">
              <div class="text-center">
                <v-icon
                  size="100"
                  class="my-5"
                  color="grey lighten-1"
                >
                  mdi-emoticon-sad-outline
                </v-icon><br>
                Seems like your token is
                <span class="error--text">EXPIRED!,</span><br>
                but don't worry we can resend you another one, or you can change
                your email.
                <div class="mt-5">
                  <v-btn
                    outlined
                    rounded
                    color="main"
                    to="/user/profile/edit#email"
                  >
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
              </div>
            </v-stepper-content>
            <v-stepper-content step="3" class="text-center">
              <check />
              <div class="success--text">
                GREAT! Account verified
              </div>
              <div class="body-2 grey--text pb-8">
                Happy English ^^
              </div>
              <v-btn outlined rounded dark color="main" to="/events">
                check events <v-icon right>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-col>
    <v-col align-center class="verify__left-side main" md="7" cols="12">
      <div class="verify__left-side-contianer">
        <v-img
          gradient="to top right, rgba(238, 139, 93, 0.9) 20%, rgba(238, 139, 93, 0.5)"
          height="100%"
          :src="require('~/assets/images/homeHeader.jpg')"
        >
          <v-row align="center" class="fill-height">
            <v-col>
              <div class="px-6 py-12">
                <h1>{{ $auth.user.first.toUpperCase() }}, WELCOME AGAIN.</h1>
                <p class="body-2 grey--text text--lighten-4">
                  Thank you for coming this far, after you succeed verifying you
                  email,
                  <br>
                  we will be able to stay in touch with you, and letting you
                  updated.
                  <br><br>
                  Do you want to check our events?
                </p>
                <div class="d-flex align-center">
                  <v-btn
                    depressed
                    large
                    rounded
                    :to="'/events'"
                    color="white"
                    class="main--text mr-2"
                  >
                    get started!
                    <v-icon small right>
                      mdi-arrow-right
                    </v-icon>
                  </v-btn>
                  <social-media :items="socialItems" />
                </div>
              </div>
              <div class="logo">
                <v-btn
                  tile
                  text
                  to="/"
                  class="white--text px-6"
                  height="auto"
                >
                  <v-img
                    class="mx-auto"
                    width="7rem"
                    :src="require('@/static/logos/aem-logo-white.png')"
                    alt
                  />
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-img>
        <!-- <h1>ALGERIA ENGLISH MEETING.</h1>
        <p class="body-2 grey--text text--lighten-4">
          Welcome to the family where we live English, Enjoy your time while
          <br />
          your English gets better and better every day.
          <br /><br />
          Don't you have an account yet?
        </p>
        <v-btn
          depressed
          rounded
          to="/register"
          width="150"
          color="white"
          class="main--text"
          >sign up <v-icon small right>mdi-arrow-right</v-icon></v-btn
        > -->
      </div>
    </v-col>
  </v-row>
</template>

<script>
import socialMedia from '~/components/global/socialMedia'
import check from '~/components/global/check'

export default {
  components: {
    socialMedia,
    check
  },
  layout: 'blank',
  middleware: 'auth-redirect',
  data: () => ({
    loading: false,
    step: 1,
    count: 0,
    resending: false,
    socialItems: [
      { icon: 'mdi-facebook', link: 'https://fb.com/aemeeting' },
      { icon: 'mdi-instagram', link: 'https://instagram.com/aemeeting' },
      { icon: 'mdi-twitter', link: 'https://twitter.com/aemeeting' },
      {
        icon: 'mdi-youtube',
        link: 'https://www.youtube.com/channel/UCinasdsWhC1PexLjLybeBqw'
      }
    ]
  }),
  head () {
    return {
      title: 'Verify account'
    }
  },
  mounted () {
    if (!this.$route.params.token) { this.$router.push('/') } else { this.verifyAccount(this.$route.params.token) }
  },
  methods: {
    verifyAccount (token) {
      this.loading = true
      this.$axios
        .put(`/users/verify?token=${token}`)
        .then((res) => {
          this.step = 3
          if (res.status === 200) { this.$auth.fetchUser() } else if (res.status === 208) {
            this.$store.dispatch('snackbar', {
              text: 'Account already activated',
              color: 'warning',
              timeout: 3000
            })
          }
        })
        .catch((err) => {
          if (err.response.status === 400) { this.step = 2 }
        })
        .finally(() => (this.loading = false))
    },
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
            this.step = 3
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

<style scoped>
.verify-container {
  height: 100vh;
}
.verify__left-side {
  /* height: 100vh; */
  display: flex;
  align-items: center;
  color: #fff;
  background: linear-gradient(to top right, #ee8b5d 20%, #ee8b5d);
}
.verify__left-side-contianer {
  overflow: hidden;
  height: 100%;
}
.verify-homeLink {
  position: absolute;
  z-index: 1;
}
.logo {
  position: absolute;
  z-index: 1;
  top: 0;
}
</style>
