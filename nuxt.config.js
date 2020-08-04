// import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 5000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    titleTemplate: '%s | ' + 'Algeria English Meeting',
    title: 'Algeria English Meeting',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'title', name: 'title', content: 'Algeria English Meeting' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description
      },
      // GOOGLE / Search engin
      {
        hid: 'google-name',
        itemprop: 'name',
        content: 'Algeria English Meeting'
      },
      {
        hid: 'google-description',
        itemprop: 'description',
        content: process.env.npm_package_description
      },
      {
        hid: 'google-image',
        itemprop: 'image',
        content: 'https://i.ibb.co/2yPh9sW/aem.png'
      },
      // Facebook
      { property: 'og:url', content: 'https://www.aemeeting.org' },
      { property: 'og:type', content: 'website' },
      {
        hid: 'fb-title',
        property: 'og:title',
        content: 'Algeria English Meeting'
      },
      {
        hid: 'fb-description',
        property: 'og:description',
        content: process.env.npm_package_description
      },
      {
        hid: 'fb-image',
        property: 'og:image',
        content: 'https://i.ibb.co/2yPh9sW/aem.png'
      },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        hid: 'tw-title',
        name: 'twitter:title',
        content: 'Algeria English Meeting'
      },
      {
        hid: 'tw-description',
        name: 'twitter:decription',
        content: process.env.npm_package_description
      },
      {
        hid: 'tw-image',
        name: 'twitter:image',
        content: 'https://i.ibb.co/2yPh9sW/aem.png'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/style/main.css' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Quicksand:300,400,500,600,700&display=swap&subset=latin-ext,vietnamese'
      }
    ]
    // script: [
    //   // { src: '/js/fb-sdk.js' }
    //   // {
    //   //   async: true,
    //   //   defer: true,
    //   //   src: 'https://connect.facebook.net/en_US/sdk.js'
    //   // }
    // ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.js',
    { src: '~plugins/clipper.js', ssr: false },
    { src: '~plugins/directives.js', ssr: false },
    { src: '~plugins/fb-sdk.js', ssr: false },
    { src: '~plugins/ga.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://api.aemeeting.org/api'
    // baseURL: 'http://localhost:8081/api'
    // baseURL: 'https://6e8d504ba33f.ngrok.io/api'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  auth: {
    // Options
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: false
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'users/login',
            method: 'post',
            propertyName: 'token'
          },
          user: { url: '/users/user', method: 'get', propertyName: 'user' },
          logout: false
        },
        // tokenRequired: true,
        tokenType: '',
        autoFetchUser: true
      },
      facebook: {
        client_id: '2087388874632817',
        authorization_endpoint: 'https://www.facebook.com/v6.0/dialog/oauth',
        userinfo_endpoint:
          'https://graph.facebook.com/v6.0/me?fields=id%2Clast_name%2Cfirst_name%2Cemail%2Cbirthday',
        scope: ['public_profile', 'email', 'user_gender', 'user_birthday']
      }
    }
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: false
    },
    treeShake: true,
    theme: {
      dark: false,
      options: {
        customProperties: true
      },
      themes: {
        light: {
          primary: '#2196f3',
          secondary: '#9c27b0',
          accent: '#e91e63',
          error: '#ff5722',
          warning: '#ff9800',
          info: '#00bcd4',
          success: '#8bc34a',
          main: '#ee8b5d',
          minor: '#161a45'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
