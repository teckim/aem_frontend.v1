<template>
  <v-row class="login-container" justify="center" no-gutters>
    <v-col md="5" cols="12">
      <div class="login-homeLink">
        <v-btn tile text to="/" class="main--text"
          ><v-icon left>mdi-chevron-left</v-icon> home</v-btn
        >
      </div>
      <v-card flat height="100%" class="d-flex flex-column justify-center">
        <div>
          <!-- <div class="py-10">
            <v-img
              class="mx-auto"
              width="180"
              :src="require('@/static/logos/aem.png')"
              alt
            ></v-img>
          </div> -->
          <v-card class="mx-auto" flat>
            <register-form :submit-form="registerUser" />
          </v-card>
        </div>
      </v-card>
    </v-col>
    <v-col align-center class="login__left-side main" md="7" cols="12">
      <div class="login__left-side-contianer">
        <v-img
          gradient="to top right, rgba(238, 139, 93, 0.9) 20%, rgba(238, 139, 93, 0.5)"
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
                  <br />
                  your English gets better and better every day.
                  <br /><br />
                  Already have an account?
                </p>
                <v-btn
                  depressed
                  large
                  rounded
                  to="/login"
                  width="150"
                  color="white"
                  class="main--text"
                  >Log in <v-icon small right>mdi-arrow-right</v-icon></v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-img>
      </div>
      <div class="logo">
        <v-btn tile text to="/" class="white--text px-6" height="auto"
          ><v-img
            class="mx-auto"
            width="7rem"
            :src="require('@/static/logos/aem-logo-white.png')"
            alt
          ></v-img
        ></v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import registerForm from '@/components/global/registerForm'

export default {
  layout: 'split',
  components: {
    registerForm
  },
  methods: {
    registerUser(user) {
      this.$auth.loginWith('local', {
        data: user
      })
      // eslint-disable-next-line no-console
      console.log(this.$auth)
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
}
.login__left-side {
  display: flex;
  align-items: center;
  color: #fff;
  background: linear-gradient(to top right, #ee8b5d 20%, #ee8b5d);
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
  right: 0;
}
</style>
