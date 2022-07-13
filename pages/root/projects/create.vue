<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <span class="headline py-2">Create project</span>
      <v-btn rounded dark color="main" :loading="saving" @click="save">
        <span class="pr-4">save</span>
        <v-icon right>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-row>
    <v-card flat class="mt-12">
      <project-form ref="projectForm" />
    </v-card>
  </div>
</template>

<script>
import projectForm from '~/components/root/projectForm'
export default {
  components: {
    projectForm
  },
  data: () => ({
    saving: false
  }),
  methods: {
    save () {
      if (!this.$refs.projectForm.validate()) { return }
      this.saving = true
      const project = JSON.parse(JSON.stringify(this.$refs.projectForm.project))
      this.$axios
        .post('/projects', project)
        .then(({ data }) => {
          this.$store.dispatch('snackbar', {
            text: 'Project saved successfully',
            color: 'success',
            timeout: 3000
          })
          this.$refs.projectForm.reset()
        })
        .finally(() => {
          this.saving = false
        })
    }
  }
}
</script>

<style></style>
