<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <div class="py-2">
        <div class="headline">
          Manage offices
        </div>
        <div
          v-if="offices && offices.length"
          class="subtitle text--secondary"
          v-text="offices.length + ' offices'"
        />
      </div>
      <!-- <v-btn rounded color="main white--text">
        <span class="pr-4">scan</span>
        <v-icon right>mdi-qrcode-scan</v-icon>
      </v-btn> -->
    </v-row>
    <v-row no-gutters>
      <v-card flat class="mt-8 mb-4" width="100%">
        <offices-list
          :items="offices"
          :loading="loadingOffices"
          @retry="getOffices"
          @delete="deleteOffice"
          @edit="editOffice"
        />
      </v-card>
    </v-row>
    <v-dialog
      v-model="edit"
      scrollable
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          Edit office
        </v-card-title>
        <v-card-text>
          <office-form ref="officeForm" :data="office" />
        </v-card-text>
        <!-- <v-card-text>
          <table v-if="office">
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
          <v-btn depressed dark color="main" width="100" @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import officesList from '~/components/root/officesList'
import officeForm from '~/components/root/officeForm'
export default {
  components: {
    officesList,
    officeForm
  },
  data: () => ({
    offices: [],
    office: null,
    edit: false,
    loadingOffices: true
  }),
  mounted () {
    this.getOffices()
  },
  methods: {
    getOffices () {
      this.loadingOffices = true
      this.$axios
        .get('/offices?role=root')
        .then(({ data }) => {
          this.offices = data.offices
        })
        .finally(() => (this.loadingOffices = false))
    },
    deleteOffice (id) {
      if (confirm('Are you sure you want to delete this office?')) {
        this.$axios.delete(`/offices/${id}`).then(() => {
          this.$store.dispatch('snackbar', {
            text: 'Office deleted successfully',
            color: 'success',
            timeout: 3000
          })
          this.getOffices()
        })
      }
    },
    save () {
      if (!this.$refs.officeForm.validate()) { return }
      this.saving = true
      const office = JSON.parse(JSON.stringify(this.$refs.officeForm.office))
      delete office.admins
      this.$axios
        .put(`/offices/${this.office._id}`, office)
        .then(({ data }) => {
          this.$store.dispatch('snackbar', {
            text: 'Office saved successfully',
            color: 'success',
            timeout: 3000
          })
          this.$refs.officeForm.reset()
          this.edit = false
          this.getOffices()
        })
        .finally(() => {
          this.saving = false
        })
    },
    editOffice (i) {
      this.office = this.offices[i]
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
