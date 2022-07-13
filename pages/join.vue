<template>
  <div>
    <div class="py-8 my-8 grey lighten-3">
      <!-- <touch class="right bottom white" /> -->
      <v-container class="mt-12">
        <v-card flat class="mx-auto transparent text-center">
          <h1>JOIN US</h1>
          <div class="text--secondary">
            Choose a team and join
          </div>
        </v-card>
      </v-container>
    </div>
    <div style="position: relative">
      <touch class="left bottom grey lighten-3" />
    </div>
    <div>
      <v-container>
        <div v-if="(offices || []).length">
          <v-card
            v-for="(office, i) in offices"
            :key="i"
            link
            min-width="200"
            class="ma-2 d-inline-block"
            @click="select(i)"
          >
            <v-card-title>
              <div>
                <div v-text="office.name" />
                <div
                  class="overline"
                  v-text="office.province + '' + office.country"
                />
              </div>
            </v-card-title>
          </v-card>
        </div>
        <div v-show="loading">
          <div>
            <v-card
              v-for="i in 5"
              :key="i"
              width="200"
              class="ma-2 d-inline-block"
            >
              <v-responsive max-width="200">
                <v-skeleton-loader
                  ref="skeleton"
                  type="list-item-two-line"
                  class="mx-auto"
                />
              </v-responsive>
            </v-card>
          </div>
        </div>
      </v-container>
    </div>
    <v-dialog
      v-model="joinDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card v-if="!!office">
        <v-card-title> Join {{ office.name }} </v-card-title>
        <v-card-text>
          Please choose a position that suits you
          <v-form ref="joinForm">
            <v-select
              v-model="position"
              clearable
              label="positions"
              :items="office.tasks"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            depressed
            color="success"
            width="100"
            :loading="saving"
            :disabled="!position"
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import touch from '~/components/website/touch'
export default {
  components: {
    touch
  },
  data: () => ({
    offices: null,
    office: null,
    position: null,
    loading: true,
    saving: false,
    joinDialog: false
  }),
  watch: {
    office (v) {
      if (v) {
        this.joinDialog = true
      }
    },
    joinDialog (v) {
      if (!v) { this.office = null }
    }
  },
  mounted () {
    this.getOffices()
  },
  methods: {
    getOffices () {
      this.$axios
        .get('/offices?vacant=true')
        .then(({ data }) => (this.offices = data.offices))
        .finally(() => (this.loading = false))
    },
    select (i) {
      this.office = this.offices[i]
    },
    save () {
      this.saving = true
      this.$axios
        .post('/joins', { position: this.position, office: this.office._id })
        .then(() => {
          this.$store.dispatch('snackbar', {
            text: 'Requested successfully',
            color: 'success',
            timeout: 5000
          })
          this.$router.push('/')
        })
        .finally(() => (this.saving = false))
    },
    head () {
      return {
        title: 'Join a team'
      }
    }
  }
}
</script>

<style></style>
