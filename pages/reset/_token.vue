<template>
  <div>
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
                  Please give us a second to verify your token
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
                  but don't worry we can resend you another one.
                  <div class="mt-5">
                    <v-btn
                      dark
                      depressed
                      rounded
                      color="main"
                      @click="forgetPassDialog = true"
                    >
                      <v-icon left>
                        mdi-repeat
                      </v-icon> resned
                    </v-btn>
                  </div>
                </div>
              </v-stepper-content>
              <v-stepper-content step="3" class="text-center">
                <v-responsive max-width="360" class="mx-auto">
                  <h3 class="pb-2">
                    Enter new password
                  </h3>
                  <v-form ref="resetPasswordForm">
                    <v-text-field
                      v-model="newPassword"
                      validate-on-blur
                      color="main lighten-2"
                      name="passConf"
                      label="New password"
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
                      v-model="confNewPassword"
                      validate-on-blur
                      color="main lighten-2"
                      name="passConf"
                      label="Confirm new password"
                      :type="showPass ? 'text' : 'password'"
                      :rules="vRegConfPassword"
                    >
                      <template #append>
                        <v-icon small @click="showPass = !showPass">
                          {{
                            showPass ? 'mdi-eye' : 'mdi-eye-off'
                          }}
                        </v-icon>
                      </template>
                    </v-text-field>
                  </v-form>
                  <v-btn
                    depressed
                    rounded
                    dark
                    color="main"
                    width="100"
                    class="mt-4"
                    :loading="reseting"
                    @click="resetPassword"
                  >
                    <v-icon left>
                      mdi-check
                    </v-icon> reset
                  </v-btn>
                </v-responsive>
              </v-stepper-content>
              <v-stepper-content step="4" class="text-center">
                <check />
                <div class="success--text pb-2">
                  GREAT! Password updated
                </div>
                <span class="body-2 grey--text">Loging you in...</span>
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
                  <h1>WELCOME BACK!</h1>
                  <p class="body-2 grey--text text--lighten-4">
                    We will help you reset your password,
                    <br>
                    so you can continue enjoying being part of AEM Family.
                    <br><br>
                    Do you want to check what we have?
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
        </div>
      </v-col>
    </v-row>
    <v-dialog
      v-model="forgetPassDialog"
      :overlay="false"
      max-width="400px"
      transition="dialog-transition"
    >
      <forget-pass @close="forgetPassDialog = false" />
    </v-dialog>
  </div>
</template>

<script>
import validators from '~/plugins/validator'
import socialMedia from '~/components/global/socialMedia'
import check from '~/components/global/check'
import forgetPass from '~/components/website/forgetPass'

export default {
  components: {
    socialMedia,
    check,
    forgetPass
  },
  layout: 'blank',
  data: () => ({
    confNewPassword: '',
    newPassword: '',
    showPass: false,
    loading: false,
    step: 1,
    reseting: false,
    forgetPassDialog: false,
    ...validators,
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
      title: 'Reset password'
    }
  },
  mounted () {
    if (!this.$route.params.token || this.$auth.loggedIn) { this.$router.push('/') } else { this.verifyToken(this.$route.params.token) }
    this.vRegConfPassword.push(
      v => v === this.newPassword || "passwords doesn't match"
    )
  },
  methods: {
    verifyToken (token) {
      this.loading = true
      const data = {
        token,
        type: 'reset-password'
      }
      this.$axios
        .post('/users/token', data)
        .then(() => {
          this.step = 3
        })
        .catch((err) => {
          if (err.response.status === 400) { this.step = 2 }
        })
        .finally(() => (this.loading = false))
    },
    resetPassword () {
      if (this.$refs.resetPasswordForm.validate()) {
        this.reseting = true
        const data = {
          password: this.newPassword,
          token: this.$route.params.token
        }
        this.$axios
          .put('/users/password/reset', data)
          .then(({ data }) => {
            this.step = 4
            setTimeout(async () => {
              try {
                await this.$auth.loginWith('local', {
                  data: {
                    user: { email: data.email, password: this.newPassword }
                  }
                })
                this.$router.push('/')
              } catch {
                this.$router.push('/login')
              } finally {
                this.loading = false
              }
            }, 2000)
          })
          .finally(() => (this.reseting = false))
      }
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
