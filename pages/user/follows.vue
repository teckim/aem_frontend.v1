<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <span class="headline py-2">Follows</span>
    </v-row>
    <div class="mt-12">
      <div v-if="offices.length && !loading">
        <v-card v-for="(office, i) in offices" :key="i" outlined>
          <v-card-title primary-title>
            <div>
              <div>
                {{ office.name }}
                <v-btn
                  x-small
                  depressed
                  rounded
                  color="warning"
                  @click="unfollow(office._id)"
                >
                  unfollow
                </v-btn>
              </div>
              <div class="overline">
                {{ office.province }} - {{ office.country }}
              </div>
            </div>
          </v-card-title>
        </v-card>
      </div>
      <v-card v-else-if="!loading" flat class="py-8">
        <v-card-text>
          <div class="text-center">
            <span>
              Sorry, you have no follows yet
            </span>
          </div>
        </v-card-text>
      </v-card>
      <div v-else>
        <v-card
          v-for="index in 5"
          :key="index"
          outlined
          class="px-2 my-2"
          :style="`opacity: ${(5 - index + 1) / 5}`"
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
  </div>
</template>

<script>
export default {
  data: () => ({
    offices: [],
    loading: true
  }),
  mounted () {
    this.getFollows()
  },
  methods: {
    getFollows () {
      this.$axios
        .get('/users/follows')
        .then(({ data }) => (this.offices = data.offices))
        .finally(() => (this.loading = false))
    },
    unfollow (id) {
      this.loading = true
      this.$axios
        .put(`/users/offices/${id}/following?action=unfollow`)
        .then(() => {
          this.$store.dispatch('snackbar', {
            text: 'Unfollowed successfully',
            color: 'success',
            timeout: 3000
          })
        })
        .finally(() => {
          this.getFollows()
          this.$auth.fetchUser()
        })
    },
    head () {
      return {
        title: 'Follows'
      }
    }
  }
}
</script>

<style></style>
