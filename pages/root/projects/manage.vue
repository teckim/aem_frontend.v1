<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <div class="py-2">
        <div class="headline">
          Manage projects
        </div>
        <div
          v-if="projects && projects.length"
          class="subtitle text--secondary"
          v-text="projects.length + ' projects'"
        />
      </div>
      <!-- <v-btn rounded color="main white--text">
        <span class="pr-4">scan</span>
        <v-icon right>mdi-qrcode-scan</v-icon>
      </v-btn> -->
    </v-row>
    <v-row no-gutters>
      <v-card flat class="mt-8 mb-4" width="100%">
        <projects-list
          :items="projects"
          :loading="loadingProject"
          @retry="getProject"
          @delete="deleteProject"
          @edit="editProject"
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
          Edit project
        </v-card-title>
        <v-card-text>
          <project-form ref="projectForm" :data="project" />
        </v-card-text>
        <!-- <v-card-text>
          <table v-if="project">
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
import projectsList from '~/components/root/projectsList'
import projectForm from '~/components/root/projectForm'
export default {
  components: {
    projectsList,
    projectForm
  },
  data: () => ({
    projects: [],
    project: null,
    edit: false,
    saving: false,
    loadingProject: true
  }),
  mounted () {
    this.getProject()
  },
  methods: {
    getProject () {
      this.loadingProject = true
      this.$axios
        .get('/projects')
        .then(({ data }) => {
          this.projects = data.projects
        })
        .finally(() => (this.loadingProject = false))
    },
    deleteProject (id) {
      if (confirm('Are you sure you want to delete this project?')) {
        this.$axios.delete(`/projects/${id}`).then(() => {
          this.$store.dispatch('snackbar', {
            text: 'Project deleted successfully',
            color: 'success',
            timeout: 3000
          })
          this.getProject()
        })
      }
    },
    save () {
      if (!this.$refs.projectForm.validate()) { return }
      this.saving = true
      const project = JSON.parse(JSON.stringify(this.$refs.projectForm.project))
      this.$axios
        .put(`/projects/${this.project._id}`, project)
        .then(({ data }) => {
          this.$store.dispatch('snackbar', {
            text: 'Project saved successfully',
            color: 'success',
            timeout: 3000
          })
          this.$refs.projectForm.reset()
          this.edit = false
          this.getProject()
        })
        .finally(() => {
          this.saving = false
        })
    },
    editProject (i) {
      this.project = this.projects[i]
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
