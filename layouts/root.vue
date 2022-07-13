<template>
  <v-app>
    <snackbar />
    <nav-bar />
    <v-content>
      <v-container>
        <nuxt class="centent mt-4" />
      </v-container>
    </v-content>
    <!-- <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import navBar from '~/components/root/navBar'
import snackbar from '~/components/global/snackbar'
export default {
  components: {
    navBar,
    snackbar
  },
  data () {
    return {}
  },
  head () {
    return {
      title: 'Root'
    }
  }
}
</script>
<style>
.v-btn--plain:hover:before {
  background-color: transparent;
}
.v-btn--plain:before {
  display: none;
}
</style>
