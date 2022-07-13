<template>
  <v-card>
    <v-card-title primary-title>
      Share {{ type }}
    </v-card-title>
    <v-card-text class="text-center">
      <v-row justify="space-around" class="py-8 mx-12">
        <v-btn icon width="48" height="48" @click="copyToClipBoard">
          <v-icon size="36">
            mdi-content-copy
          </v-icon>
        </v-btn>
        <v-btn icon width="48" height="48" color="primary" @click="shareToFB">
          <v-icon size="36">
            mdi-facebook
          </v-icon>
        </v-btn>
        <v-btn
          icon
          width="48"
          height="48"
          color="primary lighten-1"
          @click="shareToMessenger"
        >
          <v-icon size="36">
            mdi-facebook-messenger
          </v-icon>
        </v-btn>
      </v-row>
    </v-card-text>
    <!-- <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text>cancel</v-btn>
      <v-btn depressed dark color="main">continue</v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'Event'
    },
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    shareToFB () {
      this.$fb.sdk.ui(
        {
          method: 'share',
          href: `https://aemeeting.org/events/${this.id}`
        },
        function (response) {}
      )
    },
    shareToMessenger () {
      this.$fb.sdk.ui(
        {
          method: 'send',
          link: `https://aemeeting.org/events/${this.id}`
        },
        function (response) {}
      )
    },
    copyToClipBoard () {
      const textArea = document.createElement('input')
      textArea.value = `https://aemeeting.org/events/${this.id}`
      document.body.appendChild(textArea)
      textArea.focus()
      document.execCommand('SelectAll')
      try {
        const successful = document.execCommand('copy')
        if (successful) {
          this.$store.dispatch('snackbar', {
            text: 'Event link copied to clipboard',
            color: 'success',
            timeout: 3000
          })
        } else {
          this.$store.dispatch('snackbar', {
            text: 'cannot copy link to clipboard',
            color: 'error',
            timeout: 3000
          })
        }
      } catch (err) {
        this.$store.dispatch('snackbar', {
          text: 'cannot copy link to clipboard',
          color: 'error',
          timeout: 3000
        })
      }
      document.body.removeChild(textArea)
    }
  }
}
</script>

<style scoped>
input {
  position: fixed;
  top: 0;
  left: 0;
  width: 2em;
  height: 2em;
  padding: 0;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
}
</style>
