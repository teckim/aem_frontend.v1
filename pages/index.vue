<template>
  <div>
    <home-header text="We don't learn English... We live it." class="header" />
    <section-title text="Latest Events" />
    <div>
      <v-container>
        <events-slider />
      </v-container>
    </div>
    <div class="grey lighten-3" style="position: relative">
      <!-- <touch class="right grey lighten-3 top" />
      <touch class="right white bottom" /> -->
      <section-title text="How It Works" style="position: relative" />
      <v-container>
        <guide />
      </v-container>
    </div>
    <section-title id="projects" text="What do we do?" />
    <div style="position: relative">
      <!-- <touch class="left white top" />
      <touch class="left white bottom" /> -->
      <v-container>
        <projects />
      </v-container>
    </div>
    <!-- <div class="grey lighten-3">
      <section-title text="official sponsors" />
    </div> -->
    <div class="grey lighten-3" style="position: relative">
      <!-- <touch class="right grey lighten-3 top" />
      <touch class="right bottom grey lighten-3" /> -->
      <section-title style="position: relative" text="official sponsors" />
      <v-container class="sponsors">
        <sponsors name slogan :items="sponsors" />
      </v-container>
    </div>
    <section-title text="Some numbers" />
    <div>
      <v-container>
        <statistics />
      </v-container>
    </div>
    <!-- <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <div class="text-center"></div>
        <v-card>
          <v-card-title class="headline">
            Welcome to the Vuetify + Nuxt.js template
          </v-card-title>
          <v-card-text>
            <p>
              Vuetify is a progressive Material Design component framework for
              Vue.js. It was designed to empower developers to create amazing
              applications.
            </p>
            <p>
              For more information on Vuetify, check out the
              <a href="https://vuetifyjs.com" target="_blank"> documentation </a
              >.
            </p>
            <p>
              If you have questions, please join the official
              <a
                href="https://chat.vuetifyjs.com/"
                target="_blank"
                title="chat"
              >
                discord </a
              >.
            </p>
            <p>
              Find a bug? Report it on the github
              <a
                href="https://github.com/vuetifyjs/vuetify/issues"
                target="_blank"
                title="contribute"
              >
                issue board </a
              >.
            </p>
            <p>
              Thank you for developing with Vuetify and I look forward to
              bringing more exciting features in the future.
            </p>
            <div class="text-xs-right">
              <em><small>&mdash; John Leider</small></em>
            </div>
            <hr class="my-3" />
            <a href="https://nuxtjs.org/" target="_blank">
              Nuxt Documentation
            </a>
            <br />
            <a href="https://github.com/nuxt/nuxt.js" target="_blank">
              Nuxt GitHub
            </a>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" nuxt to="/inspire">
              Continue
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout> -->
  </div>
</template>

<script>
import homeHeader from '~/components/website/header'
// import touch from '~/components/website/touch'
import sectionTitle from '~/components/website/sectionTitle'
import eventsSlider from '~/components/website/eventsSlider'
import guide from '~/components/website/guide'
import projects from '~/components/website/projects'
import sponsors from '~/components/website/sponsors'
import statistics from '~/components/website/statistics'

export default {
  components: {
    homeHeader,
    // touch,
    sectionTitle,
    eventsSlider,
    guide,
    projects,
    sponsors,
    statistics
  },
  data: () => ({
    sponsors: null
  }),
  head () {
    return {
      title: 'Home'
    }
  },
  mounted () {
    this.getSponsors()
  },
  methods: {
    getSponsors () {
      this.$axios
        .get('/sponsors', { params: { type: 'official' } })
        .then(({ data }) => {
          this.sponsors = data.sponsors
        })
    }
  }
}
</script>

<style scoped>
.sponsors {
  min-height: 260px;
}
</style>
