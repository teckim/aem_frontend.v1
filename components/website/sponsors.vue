<template>
  <v-carousel
    ref="slider"
    :height="height"
    interval="3000"
    cycle
    hide-delimiters
    show-arrows-on-hover
    :show-arrows="(items || []).length > 1"
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-card
        tile
        flat
        light
        class="transparent"
        width="100%"
        height="100%"
      >
        <v-row justify="center" align="center" class="flex-colmn fill-height">
          <a
            target="_blank"
            :href="item.link"
            class="text-center black--text sponsor"
          >
            <img
              v-show="logo"
              class="sponsor--image"
              :src="$axios.defaults.baseURL + '/images/' + item.image"
              :height="height - 50"
              alt=""
            >
            <div v-show="name" class="title">{{ item.name }}</div>
            <div v-show="slogan">{{ item.slogan }}</div>
          </a>
        </v-row>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: null
    },
    height: {
      type: Number,
      default: 300
    },
    items: {
      type: Array,
      default: null
    },
    logo: {
      type: Boolean,
      default: true
    },
    slogan: {
      type: Boolean,
      default: false
    },
    name: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.sponsor {
  text-decoration: none;
}
.sponsor--image {
  max-height: 200px;
}
</style>
