/* eslint-disable no-undef */
import Vue from 'vue'

const vueFB = {}
vueFB.install = function install (Vue, options) {
  ;(function (d, s, id) {
    let js = d.getElementsByTagName(s)[0]
    const fjs = js
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = 'https://connect.facebook.net/en_US/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')

  window.fbAsyncInit = function onSDKInit () {
    FB.init(options)
    // FB.AppEvents.logPageView()
    Vue.FB = FB
    window.dispatchEvent(new Event('fb-sdk-ready'))
    vueFB.sdk = FB // do not forget this line
  }
  Vue.FB = undefined
}

Vue.use(vueFB, {
  appId: '2087388874632817',
  autoLogAppEvents: true,
  xfbml: true,
  version: 'v7.0'
})
// and this line
export default ({ app }, inject) => {
  inject('fb', vueFB)
}
