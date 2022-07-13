<template>
  <div>
    <v-carousel
      ref="slider"
      height="auto"
      class="elevation-5"
      interval="10000"
      cycle
      hide-delimiters
      show-arrows-on-hover
    >
      <v-carousel-item v-for="item in items" :key="item._id">
        <v-card tile flat light width="100%">
          <v-row no-gutters align="center">
            <v-col cols="12" md="5">
              <div>
                <v-card-title primary-title class="flex-column align-start">
                  <div class="display-1">
                    {{ item.title }}
                  </div>
                </v-card-title>
                <v-card-text>
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <div class="body-1" v-html="item.description" />
                </v-card-text>
              </div>
            </v-col>
            <v-col cols="12" md="7">
              <v-img
                :aspect-ratio="4 / 3"
                :src="
                  item.image &&
                    $axios.defaults.baseURL + '/images/' + item.image.name
                "
                class="text-center align-center event--data"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
  <!-- <v-row justify="center">
    <v-col v-for="item in items" :key="item.title" cols="12" sm="4">
      <div class="title text-center" v-text="item.title"></div>
      <v-divider class="grey title-unerline mb-4"></v-divider>
      <div class="subtitle text-secondary" v-html="item.description"></div>
    </v-col>
  </v-row> -->
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: 'COFFEE MEETUP',
        description:
          '<p>it is a meetup that takes coffees as place, and our purpose is to gather people who want to socialize and have fun with other people while improving their English and public speaking skills and that thanks to different funny activities and games that will be proposed</p>',
        image: {
          name: '3f51c993d90498cd40c33f352b521109',
          type: 'image/png'
        },
        createdBy: '5e0124e31cf16107102239fe',
        createdOn: '2020-01-29T11:34:06.465Z'
      },
      {
        title: 'HANGOUT',
        description:
          '<p>Outdoor activities in open air where we <strong>Hangout, </strong>have fun, socialize and practice <strong>English.</strong></p>',
        image: {
          name: '0e12946a2f87e274d3fa91d83e727226',
          type: 'image/png'
        },
        createdBy: '5e0124e31cf16107102239fe',
        createdOn: '2020-02-02T08:44:39.978Z'
      },
      {
        title: 'E-MEETUP',
        description:
          '<p>Meet ups, just from the comfort of your home.</p><p>Online meetings where we socialize, exchange ideas, learn english and have fun of course.</p>',
        image: {
          name: '7026227358adadc96bfbb2403bf99bac',
          type: 'image/png'
        },
        createdBy: '5e0124e31cf16107102239fe',
        createdOn: '2020-04-01T18:42:51.750Z'
      }
    ]
  }),
  mounted () {
    this.getProjects()
  },
  methods: {
    getProjects () {
      this.$axios.get('/projects').then(({ data }) => {
        this.items = data.projects
      })
    }
  }
}
</script>

<style scoped>
.title-unerline {
  max-width: 28px;
  min-height: 4px;
  margin: auto;
}
</style>
