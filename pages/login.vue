<template>
  <v-row class="login-container" justify="center" no-gutters>
    <v-col md="5" cols="12" order-md="1" order="2">
      <div class="login-homeLink">
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
        height="100%"
        class="d-flex flex-column justify-center pt-12"
      >
        <div>
          <v-card class="mx-auto" width="350" flat>
            <login-form :loading="loading" :submit-form="loginUser" />
          </v-card>
        </div>
      </v-card>
    </v-col>
    <v-col
      align-center
      class="login__left-side"
      md="7"
      cols="12"
      order-md="2"
      order="1"
    >
      <div class="login__left-side-contianer">
        <v-img
          gradient="to top right, rgba(22, 26, 69, 0.8), rgba(22, 26, 69, 0.5)"
          height="100%"
          :src="require('~/assets/images/homeHeader.jpg')"
        >
          <v-row align="center" class="fill-height">
            <v-col>
              <div class="px-6 py-12">
                <h1>ALGERIA ENGLISH MEETING.</h1>
                <p class="body-2 grey--text text--lighten-4">
                  Welcome to the family where we live English, Enjoy your time
                  while
                  <br>
                  your English gets better and better every day.
                  <br><br>
                  Don't you have an account yet?
                </p>
                <div class="d-flex align-center">
                  <v-btn
                    depressed
                    large
                    rounded
                    :to="`/register${to ? '?to=' + to : ''}`"
                    width="150"
                    color="white"
                    class="main--text mr-2"
                  >
                    sign up <v-icon small right>
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
import loginForm from '@/components/global/loginForm'
import socialMedia from '~/components/global/socialMedia'

export default {
  components: {
    loginForm,
    socialMedia
  },
  layout: 'blank',
  data: () => ({
    loading: false,
    socialItems: [
      { icon: 'mdi-facebook', link: 'https://fb.com/aemeeting' },
      { icon: 'mdi-instagram', link: 'https://instagram.com/aemeeting' },
      { icon: 'mdi-twitter', link: 'https://twitter.com/aemeeting' },
      {
        icon: 'mdi-youtube',
        link: 'https://www.youtube.com/channel/UCinasdsWhC1PexLjLybeBqw'
      }
    ],
    from: null
  }),
  head () {
    return {
      title: 'Login'
    }
  },
  computed: {
    to () {
      return this.$route.query.to || ''
    }
  },
  mounted () {
    if (this.$auth.loggedIn && !this.$route.query) { this.$router.push('/') }
    if (this.$route.query.s === 'denied') {
      this.$store.dispatch('snackbar', {
        text: 'Access denied, Only admins, Please log in to continue',
        color: 'error',
        timeout: 5000
      })
    } else if (this.$route.query.s === 'unauth') {
      this.$store.dispatch('snackbar', {
        text: 'Unauthorized, Please log in to continue',
        color: 'error',
        timeout: 5000
      })
    } else if (this.$route.query.s === 'root') {
      this.$store.dispatch('snackbar', {
        text: 'Access denied, Only root',
        color: 'error',
        timeout: 5000
      })
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   // if (from) this.$router.push({ query: { to: from.fullPath } })
  //   // if (from) this.$router.push({ query: { to: from.fullPath } })
  //   next((vm) => {
  //     if (!['login', 'register'].includes(from.name) && !vm.$route.query)
  //       vm.$router.push({ query: { to: from.fullPath } })
  //   })
  // },
  methods: {
    async loginUser (user) {
      this.loading = true
      try {
        await this.$auth.loginWith('laravelJWT', {
          data: user
        })
        if (this.to) { this.$router.push(this.to) } else if (localStorage.getItem('path')) { this.$router.push(localStorage.getItem('path')) } else if (this.$auth.user.role === 'user') { this.$router.push('/user') } else { this.$router.push('/dashboard') }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
}
.login__left-side {
  /* height: 100vh; */
  display: flex;
  align-items: center;
  color: #fff;
  background: linear-gradient(
    to top right,
    rgba(22, 26, 69, 0.8),
    rgba(22, 26, 69, 0.5)
  );
}
.login__left-side-contianer {
  overflow: hidden;
  height: 100%;
}
.login-homeLink {
  position: absolute;
  z-index: 1;
}
.logo {
  position: absolute;
  z-index: 1;
  top: 0;
}
</style>
