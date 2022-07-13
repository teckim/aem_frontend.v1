<template>
  <span id="navbar">
    <v-app-bar
      color="white"
      :clipped-left="clipped"
      height="64"
      app
      elevate-on-scroll
    >
      <a href="/"><img
        height="64"
        :src="require('@/static/logos/aem.png')"
        alt
      ></a>
      <div class="d-flex align-center nav">
        <nav class="mx-auto d-none d-md-flex">
          <v-tabs
            v-model="tabs"
            centered
            slider-size="3"
            active-class="font-weight-bold text--primary"
            height="64"
          >
            <v-tabs-slider color="main" />
            <v-tab
              v-for="(item, i) in items"
              :key="i"
              class="navLink body-2 font-weight-medium px-8 v-tab--plain"
              nuxt
              :ripple="false"
              :to="item.to"
            >
              <div v-text="item.title" />
            </v-tab>
          </v-tabs>
          <!-- <ul class="list d-inline-flex">
            <li v-for="(item, i) in items" :key="i" class="list_item px-5 py-1">
              <nuxt-link
                class="navLink body-2 font-weight-medium"

                active-class="navLink--active"
                :to="item.to"
              >
                <div v-text="item.title"></div>
              </nuxt-link>
            </li>
          </ul> -->
        </nav>
        <nav class="d-none d-md-flex">
          <ul v-if="!$auth.loggedIn" class="list d-inline-flex">
            <li class="list_item px-2 py-1">
              <nuxt-link
                class="navLink caption font-weight-medium"
                active-class="navLink--active"
                to="/register"
              >
                Sign up
              </nuxt-link>
            </li>
            <div class="py-1">
              <v-divider vertical />
            </div>
            <li class="list_item px-2 py-1">
              <nuxt-link
                class="navLink caption font-weight-medium"
                active-class="navLink--active"
                to="/login"
              >
                Log in
              </nuxt-link>
            </li>
          </ul>
          <div v-else-if="$auth.user" class="d-inline-flex">
            <v-menu open-on-hover bottom>
              <template #activator="{ on }">
                <v-btn small text color="primary" v-on="on">
                  <v-icon left>mdi-account</v-icon>
                  <div class="text-truncate" style="max-width: 100px">
                    {{ $auth.user.first + ' ' + $auth.user.last }}
                  </div>
                </v-btn>
              </template>

              <v-list dense flat>
                <v-list-item
                  v-for="(item, index) in menuItems"
                  :key="index"
                  :to="item.to"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                <v-divider class="mx-4" />
                <v-list-item v-if="$auth.user.role !== 'user'" to="/dashboard">
                  <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>
                <v-divider class="mx-4" />
                <v-list-item link @click="logout">
                  <v-list-item-title class="main--text">LOGOUT</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </nav>
      </div>
      <v-btn
        class="ml-auto d-md-none d-flex"
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      width="296"
      mobile-break-point="396"
      bottom
      temporary
      fixed
    >
      <div class="d-flex flex-column justify-space-between fill-height">
        <v-list flat class="pt-10">
          <v-list-item-group>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              class="navLink font-weight-medium"
              active-class="navLink--active"
              :to="item.to"
              router
            >
              <v-list-item-content class="text-center">
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-divider class="mx-8 my-5" />
          <template v-if="$auth.loggedIn">
            <v-list-item
              v-for="(item, index) in menuItems"
              :key="index"
              :to="item.to"
            >
              <v-list-item-content class="text-center">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$auth.user.role !== 'user'" to="/dashboard">
              <v-list-item-content class="text-center">
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content class="text-center">
                <v-list-item-title
                  class="primary--text"
                  @click="logout"
                >Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-else>
            <div class="d-flex flex-column align-center">
              <v-btn text width="150" to="/login" class="my-1">
                Login
              </v-btn>
              <v-btn text width="150" to="/register" class="my-1">
                Sign Up
              </v-btn>
            </div>
          </template>
        </v-list>
        <div class="d-flex justify-center py-5">
          <social-media :items="socialItems" color="grey" btn-color="black" />
        </div>
      </div>
    </v-navigation-drawer>
  </span>
</template>

<script>
import socialMedia from '~/components/global/socialMedia'
export default {
  components: {
    socialMedia
  },
  data: () => ({
    tabs: null,
    clipped: false,
    drawer: false,
    fixed: false,
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: 'Vuetify.js',
    items: [
      {
        title: 'HOME',
        to: '/'
      },
      {
        title: 'EVENTS',
        to: '/events'
      },
      {
        title: 'JOIN US',
        to: '/join'
      },
      {
        title: 'ABOUT US',
        to: '/about-us'
      }
      // {
      //   icon: 'mdi-chart-bubble',
      //   title: 'CONTACT US',
      //   to: '/contact'
      // }
    ],
    socialItems: [
      { icon: 'mdi-facebook', link: 'https://fb.com/aemeeting' },
      { icon: 'mdi-instagram', link: 'https://instagram.com/aemeeting' },
      { icon: 'mdi-twitter', link: 'https://twitter.com/aemeeting' },
      {
        icon: 'mdi-youtube',
        link: 'https://www.youtube.com/channel/UCinasdsWhC1PexLjLybeBqw'
      }
    ],
    menuItems: [
      { title: 'My tickets', to: '/user/tickets' },
      { title: 'Profile', to: '/user/profile/edit' },
      { title: 'Panel', to: '/user' }
    ]
  }),
  methods: {
    logout () {
      this.$auth.logout('local')
    }
  }
}
</script>

<style scoped>
.list {
  padding-left: 0;
  list-style: none;
}
.navLink {
  text-decoration: none;
  color: #000;
}
.navLink--active {
  color: var(--v-main-base);
  background-color: none !important;
}
.nav {
  width: 100%;
}
.v-tab--plain:hover:before {
  background-color: transparent;
}
.v-tab--plain:before {
  display: none;
}
</style>
