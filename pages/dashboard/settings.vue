<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <span class="headline py-2">Settings</span>
      <v-btn rounded dark color="main" :loading="saving" @click="save">
        <span class="pr-4">save</span>
        <v-icon right>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-row>
    <v-card :loading="loading" flat class="mt-12">
      <settings ref="settings" :data="settings" />
    </v-card>
  </div>
</template>

<script>
import settings from '~/components/dashboard/settingsForm'
export default {
  components: {
    settings
  },
  data: () => ({
    loading: true,
    saving: false,
    settings: null
  }),
  computed: {
    office () {
      return this.$auth.user.office
    }
  },
  mounted () {
    this.getOffice()
  },
  methods: {
    getOffice () {
      this.$axios
        .get(`/offices/${this.office._id}`)
        .then(({ data }) => (this.settings = data.office))
        .finally(() => (this.loading = false))
    },
    save () {
      this.saving = true
      const data = this.$refs.settings.office
      this.$axios
        .put(`/offices/settings/${this.office._id}`, { ...data })
        .then(() => {
          this.$store.dispatch('snackbar', {
            text: 'Settings saved successfully',
            color: 'success',
            timeout: 3000
          })
        })
        .finally(() => (this.saving = false))
    }
  }
}
</script>

<style></style>
