<template>
  <v-card
    flat
    height="80vh"
    min-height="363"
    class="d-flex flex-column justify-center py-12"
  >
    <v-stepper v-model="step" alt-labels class="elevation-0">
      <v-stepper-items class="my-12">
        <v-stepper-content class="justify-center" step="1">
          <div class="d-flex justify-center my-4">
            <v-progress-circular
              :size="70"
              :width="5"
              color="main"
              indeterminate
            />
          </div>
          <div class="text-center">
            One moment please...
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="text-center">
            <v-icon
              size="100"
              class="my-5"
              color="grey lighten-1"
            >
              mdi-emoticon-sad-outline
            </v-icon><br>
            No subscribed email was found
          </div>
        </v-stepper-content>
        <v-stepper-content step="3" class="text-center">
          <check />
          <div class="success--text">
            Succefully unsubscribed, {{ user && user.email }}
          </div>
          <div class="body-2 grey--text pb-8">
            Unsubscribed by mistake
          </div>
          <v-btn outlined rounded dark color="main" @click="subscribe">
            subscribe again
          </v-btn>
        </v-stepper-content>
        <v-stepper-content step="4" class="text-center">
          <check />
          <div class="success--text">
            Succefully subscribed, {{ user && user.email }}
          </div>
          <div class="body-2 grey--text pb-8">
            Happy to have you back {{ user && user.first }} 😄
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import check from '~/components/global/check'

export default {
  components: {
    check
  },
  data: () => ({
    loading: false,
    user: null,
    eid: null,
    id: null,
    step: 1,
    resending: false
  }),
  head () {
    return {
      title: 'Unsubscribe'
    }
  },
  mounted () {
    this.eid = this.$route.query.eid
    this.id = this.$route.query.id
    if (!this.eid || !this.id) { this.step = 2 } else { this.unsubscribe() }
  },
  methods: {
    unsubscribe () {
      this.$axios
        .put('users/subscription', {
          eid: this.eid,
          id: this.id,
          action: 'unsubscribe'
        })
        .then(({ data }) => {
          this.step = 3
          this.user = data
        })
        .catch(() => {
          this.step = 2
        })
    },
    subscribe () {
      this.$axios
        .put('users/subscription', {
          eid: this.eid,
          id: this.id,
          action: 'subscribe'
        })
        .then(({ data }) => {
          this.step = 4
          this.user = data
        })
    }
  }
}
</script>
