// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
export default {
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
}
