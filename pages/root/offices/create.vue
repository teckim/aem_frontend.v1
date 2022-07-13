<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <span class="headline py-2">Create office</span>
      <v-btn rounded dark color="main" :loading="saving" @click="save">
        <span class="pr-4">save</span>
        <v-icon right>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-row>
    <v-card flat class="mt-12">
      <office-form ref="officeForm" />
    </v-card>
  </div>
</template>

<script>
import officeForm from '~/components/root/officeForm'
export default {
  components: {
    officeForm
  },
  data: () => ({
    saving: false
  }),
  methods: {
    save () {
      if (!this.$refs.officeForm.validate()) { return }
      this.saving = true
      const office = JSON.parse(JSON.stringify(this.$refs.officeForm.office))
      this.$axios
        .post('/offices', office)
        .then(({ data }) => {
          this.$store.dispatch('snackbar', {
            text: 'Office saved successfully',
            color: 'success',
            timeout: 3000
          })
          this.$refs.officeForm.reset()
        })
        .finally(() => {
          this.saving = false
        })
    }
  }
}
</script>

<style></style>
