<template>
  <v-app dark>
    <v-row align="center" class="fill-height mt-12">
      <div v-if="error.statusCode === 404" class="mt-6 mx-auto text-center">
        <v-img
          max-width="500"
          :src="require('~/assets/images/404.png')"
        />
        <h1>Page Not found</h1>
      </div>
      <div v-else class="mt-6 mx-auto text-center">
        <v-img
          max-width="500"
          :src="require('~/assets/images/500.png')"
        />
        <h1>An error occurred, Please try agian</h1>
      </div>
    </v-row>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
