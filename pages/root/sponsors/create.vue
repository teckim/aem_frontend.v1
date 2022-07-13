<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <span class="headline py-2">Create sponsor</span>
      <v-btn rounded dark color="main" :loading="saving" @click="save">
        <span class="pr-4">save</span>
        <v-icon right>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-row>
    <v-card flat class="mt-12">
      <sponsor-form ref="sponsorForm" />
    </v-card>
  </div>
</template>

<script>
import sponsorForm from '~/components/root/sponsorForm'
export default {
  components: {
    sponsorForm
  },
  data: () => ({
    saving: false
  }),
  methods: {
    save () {
      if (!this.$refs.sponsorForm.validate()) { return }
      this.saving = true
      const sponsor = JSON.parse(JSON.stringify(this.$refs.sponsorForm.sponsor))
      this.$axios
        .post('/sponsors', sponsor)
        .then(({ data }) => {
          this.$store.dispatch('snackbar', {
            text: 'Sponsor saved successfully',
            color: 'success',
            timeout: 3000
          })
          this.$refs.sponsorForm.reset()
        })
        .finally(() => {
          this.saving = false
        })
    }
  }
}
</script>

<style></style>
