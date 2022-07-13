<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <div class="py-2">
        <div class="headline">
          Manage sponsors
        </div>
        <div
          v-if="sponsors && sponsors.length"
          class="subtitle text--secondary"
          v-text="sponsors.length + ' sponsors'"
        />
      </div>
      <!-- <v-btn rounded color="main white--text">
        <span class="pr-4">scan</span>
        <v-icon right>mdi-qrcode-scan</v-icon>
      </v-btn> -->
    </v-row>
    <v-row no-gutters>
      <v-card flat class="mt-8 mb-4" width="100%">
        <sponsors-list
          :items="sponsors"
          :loading="loadingSponsor"
          @retry="getSponsors"
          @delete="deleteSponsor"
          @edit="editSponsor"
        />
      </v-card>
    </v-row>
    <v-dialog
      v-model="edit"
      scrollable
      :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          Edit sponsor
        </v-card-title>
        <v-card-text>
          <sponsor-form ref="sponsorForm" :data="sponsor" />
        </v-card-text>
        <!-- <v-card-text>
          <table v-if="sponsor">
            <tbody>
              <tr v-for="(admin, i) in office.admins" :key="i">
                <td class="pr-4">{{ admin.role }}</td>
                <td class="black--text">
                  {{ admin.first }} <br />
                  {{ admin.email }}
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-text> -->
        <v-card-actions class="justify-end">
          <v-btn text @click="edit = false">
            Cancel
          </v-btn>
          <v-btn
            depressed
            dark
            color="main"
            width="100"
            :loading="saving"
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
import sponsorsList from '~/components/root/sponsorsList'
import sponsorForm from '~/components/root/sponsorForm'
export default {
  components: {
    sponsorsList,
    sponsorForm
  },
  data: () => ({
    sponsors: [],
    sponsor: null,
    edit: false,
    saving: false,
    loadingSponsor: true
  }),
  mounted () {
    this.getSponsors()
  },
  methods: {
    getSponsors () {
      this.loadingSponsor = true
      this.$axios
        .get('/sponsors')
        .then(({ data }) => {
          this.sponsors = data.sponsors
        })
        .finally(() => (this.loadingSponsor = false))
    },
    deleteSponsor (id) {
      if (confirm('Are you sure you want to delete this sponsor?')) {
        this.$axios.delete(`/sponsors/${id}`).then(() => {
          this.$store.dispatch('snackbar', {
            text: 'Sponsor deleted successfully',
            color: 'success',
            timeout: 3000
          })
          this.getSponsors()
        })
      }
    },
    save () {
      if (!this.$refs.sponsorForm.validate()) { return }
      this.saving = true
      const sponsor = JSON.parse(JSON.stringify(this.$refs.sponsorForm.sponsor))
      this.$axios
        .put(`/sponsors/${this.sponsor._id}`, sponsor)
        .then(({ data }) => {
          this.$store.dispatch('snackbar', {
            text: 'Sponsor saved successfully',
            color: 'success',
            timeout: 3000
          })
          this.$refs.sponsorForm.reset()
          this.edit = false
          this.getSponsors()
        })
        .finally(() => {
          this.saving = false
        })
    },
    editSponsor (i) {
      this.sponsor = this.sponsors[i]
      this.edit = true
    }
  }
}
</script>

<style scoped>
td {
  vertical-align: baseline;
}
tr {
  height: 50px;
}
</style>
