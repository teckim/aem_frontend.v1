<template>
  <div class="mb-12 header">
    <v-parallax :src="src" style="height:85vh;" class="px-0">
      <div class="header__hero-container">
        <v-container class="fill-height">
          <v-row class="px-8" align="center">
            <v-col>
              <v-responsive max-width="700px">
                <div class="mb-2">
                  <h1>
                    <span
                      class="display-2 font-weight-bold text-uppercase"
                      v-text="text"
                    />
                  </h1>
                </div>
                <p class="grey--text text--lighten-3 mb-12">
                  Put the language behind, and dive with us. <br>
                  You will find your self improving your English magically.
                </p>
                <div>
                  <v-btn
                    depressed
                    rounded
                    dark
                    x-large
                    color="main"
                    to="/events"
                  >
                    <v-icon left>
                      mdi-chevron-right
                    </v-icon>
                    get started!
                  </v-btn>
                  <social-media
                    :items="socialItems"
                    btn-color="black"
                    :opacity="0.8"
                  />
                </div>
              </v-responsive>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <!-- <div class="header-touch"></div> -->
    </v-parallax>
  </div>
</template>

<script>
import socialMedia from '~/components/global/socialMedia'

export default {
  name: 'Header',
  components: {
    socialMedia
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: require('~/assets/images/homeHeader.jpg')
    }
  },
  data: () => ({
    socialItems: [
      { icon: 'mdi-facebook', link: 'https://fb.com/aemeeting' },
      { icon: 'mdi-instagram', link: 'https://instagram.com/aemeeting' },
      { icon: 'mdi-twitter', link: 'https://twitter.com/aemeeting' },
      {
        icon: 'mdi-youtube',
        link: 'https://www.youtube.com/channel/UCinasdsWhC1PexLjLybeBqw'
      }
    ]
  })
}
</script>

<style scoped>
/* .v-btn__content {
  font-weight: 600;
} */
.header__hero-container {
  background: linear-gradient(
    to top right,
    rgba(22, 26, 69, 0.8),
    rgba(22, 26, 69, 0.5)
  );
  /* rgba(5, 11, 31, 0.8), rgba(5, 11, 31, 0.8) */
  height: 100%;
}
.header-touch {
  bottom: -50px;
  position: absolute;
  width: 100%;
  left: 0;
  background: #fff;
  height: 200px;
  -ms-transform: skewY(-2deg); /* IE 9 */
  -webkit-transform: skewY(-2deg); /* Safari prior 9.0 */
  transform: skewY(-2deg);
}
</style>
