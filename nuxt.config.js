// import colors from 'vuetify/es5/util/colors'
const meta = {
  description:
    'A non-profit organization that brings English learners together through fun activities.',
  image: 'https://i.ibb.co/tcRBdXj/aem-logo-fb.png'
}
export default {
  // server: {
  //   port: 5000, // default: 3000
  //   host: '0.0.0.0' // default: localhost
  // },
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
        content: meta.description
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
        content: meta.description
      },
      {
        hid: 'google-image',
        itemprop: 'image',
        content: meta.image
      },
      // Facebook
      { hid: 'url', property: 'og:url', content: 'https://aemeeting.org' },
      { property: 'og:type', content: 'website' },
      {
        hid: 'fb-title',
        property: 'og:title',
        content: 'Algeria English Meeting'
      },
      {
        hid: 'fb-description',
        property: 'og:description',
        content: meta.description
      },
      {
        hid: 'fb-image',
        property: 'og:image',
        content: meta.image
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
        content: meta.description
      },
      {
        hid: 'tw-image',
        name: 'twitter:image',
        content: meta.image
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
    ],
    script: [
      { src: '/script/fb-pixel.js' }
      // {
      //   async: true,
      //   defer: true,
      //   src: 'https://connect.facebook.net/en_US/sdk.js'
      // }
    ],
    noscript: [
      {
        innerHTML:
          'img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1002337300222187&ev=PageView&noscript=1"/>'
      }
    ]
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
    '@nuxtjs/auth-next'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: 'https://api.aemeeting.org/api'
    // baseURL: 'http://localhost:8081/api'
    baseURL: 'http://api.aem.test/api'
    // baseURL: 'https://6e8d504ba33f.ngrok.io/api'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: false
    },
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: 'auth',
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          refresh: { url: '/refresh', method: 'post' },
          user: { url: '/me', method: 'get', propertyName: 'user' }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          property: 'access_token',
          maxAge: 20160 * 60,
          tokenRequired: true
        }
      }
    }
  },
  vuetify: {
    optionsPath: '~/vuetify.options.js',
    customVariables: ['~/assets/variables.scss'],
    treeShake: true
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {}
  }
}
