<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-autocomplete
          v-model="sponsor"
          :items="sponsors"
          color="main"
          label="Sponsors"
          item-text="name"
          item-value="_id"
          return-object
        />
      </v-col>
    </v-row>
    <div v-if="selectedSponsors">
      <v-card
        v-for="(sponsor, i) in selectedSponsors"
        :key="i"
        outlined
        class="d-inline-block mr-4"
      >
        <v-row no-gutters align="center">
          <div class="ma-2">
            <div v-text="sponsor.name" />
            <a :href="sponsor.link" v-text="sponsor.link" />
          </div>
          <div class="ma-2">
            <v-btn icon color="error" @click="selectedSponsors.splice(i, 1)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    sponsors: [],
    sponsor: null,
    selectedSponsors: []
  }),
  watch: {
    sponsor (v) {
      if (v) {
        if (this.selectedSponsors.some(el => el._id === v._id)) { return }
        this.selectedSponsors.push(v)
        this.sponsor = ''
      }
    },
    selectedSponsors (v) {
      this.$emit(
        'selected',
        v.map(i => i._id)
      )
    }
  },
  mounted () {
    this.getSponsors()
    if (this.data && this.data.sponsors) { this.selectedSponsors = this.data.sponsors }
  },
  methods: {
    getSponsors () {
      this.$axios.get('/sponsors').then(({ data }) => {
        this.sponsors = data.sponsors
      })
    }
  }
}
</script>
