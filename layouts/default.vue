<template>
  <v-app id="app">
    <!-- <v-system-bar v-if="blocked" app color="white" height="36">
      <div class="mx-auto text-truncate">
        <v-icon class="mr-2" size="24" color="error">mdi-alert-circle</v-icon>
        You are blocked for
        <span class="error--text font-weight-bold" v-text="blocked"></span>, You
        cannot participate in any event.
      </div>
    </v-system-bar> -->
    <v-alert
      dismissible
      border="left"
      colored-border
      type="warning"
      class="alert"
      elevation="4"
      :value="!!blocked"
    >
      <div>
        You are blocked for
        <span class="error--text font-weight-bold" v-text="blocked" />, You
        cannot participate in any event.
      </div>
    </v-alert>
    <snackbar />
    <nav-bar />
    <!-- <home-header text="We don't learn English... We live it." class="header" /> -->
    <!-- <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content> -->
    <div class="content">
      <!-- Provides the application the proper gutter -->
      <nuxt />
    </div>
    <v-footer app absolute>
      <v-card flat tile width="100%" color="transparent" class="text-center">
        <div class="d-flex justify-center py-4">
          <social-media :items="socialItems" color="grey" btn-color="black" />
        </div>
        <!-- <v-card-text class="px-6 pt-4 pb-8">
          AEM (Algeria English meeting), Is the largest Algerian English Meeting
          Organization based on regular meetings to improve English skills using
          a diversity of ways in different amazing places around the country,
          our projects are open to everyone whatever your level of English or
          your age
        </v-card-text> -->

        <!-- <v-divider></v-divider> -->

        <v-card-text class="py-1">
          &copy; 2018 - {{ new Date().getFullYear() }}
          <span class="mx-4"><strong>Algeria English Meeting</strong></span>
          <span>with <span class="error--text">❤️</span> by Hakim</span>
        </v-card-text>
      </v-card>
    </v-footer>
    <v-dialog
      :value="$auth.user && !$auth.user.confirmed"
      :persistent="$route.name === 'events-id'"
      max-width="500px"
      transition="dialog-transition"
    >
      <confirmation />
    </v-dialog>
  </v-app>
</template>

<script>
import moment from 'moment'
import navBar from '~/components/website/navBar'
import snackbar from '~/components/global/snackbar'
import socialMedia from '~/components/global/socialMedia'
import confirmation from '~/components/website/confirmation'

export default {
  components: {
    navBar,
    socialMedia,
    confirmation,
    snackbar
  },
  data: () => ({
    blocked: null,
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
  mounted () {
    if (this.$auth.user) {
      if (this.$auth.user.blocked) {
        if (
          new Date(this.$auth.user.blocked).getTime() > new Date().getTime()
        ) {
          this.blocked = moment(this.$auth.user.blocked).fromNow(true)
        }
      }
    }
  }
}
</script>
<style>
.content {
  padding-bottom: 110px;
  min-height: 100vh;
}
.alert {
  position: absolute;
  z-index: 10;
  top: 10px;
  left: 0;
  right: 0;
  max-width: 500px;
  margin: auto;
}
</style>
