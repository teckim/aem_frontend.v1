export default function ({ $axios, store, redirect }) {
  $axios.onError((error) => {
    switch (error.response.status) {
      case 400:
        store.dispatch('snackbar', {
          text: error.response.data.message || 'Bad request',
          color: 'error',
          timeout: 3000
        })
        break
      case 401:
        store.dispatch('snackbar', {
          text: error.response.data.message || 'Unauthorized',
          color: 'error',
          timeout: 3000
        })
        redirect('/login')
        break
      case 403:
        store.dispatch('snackbar', {
          text: error.response.data.message || 'Access denied',
          color: 'error',
          timeout: 3000
        })
        break
      case 404:
        store.dispatch('snackbar', {
          text: error.response.data.message || 'Route not found',
          color: 'error',
          timeout: 3000
        })
        break
      case 500:
        store.dispatch('snackbar', {
          text:
            error.response.data.message ||
            'Internal server error, please try again',
          color: 'error',
          timeout: 4000
        })
        break
      default:
        store.dispatch('snackbar', {
          text: 'Error occured, please try again',
          color: 'error',
          timeout: 3000
        })
        break
    }
  })
}
