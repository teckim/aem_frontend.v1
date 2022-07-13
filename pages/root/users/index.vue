<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <div class="py-2">
        <div class="headline">
          Manage users
        </div>
        <div
          class="subtitle text--secondary"
          v-text="totalDocs + ' users'"
        />
      </div>
      <!-- <v-btn rounded color="main white--text">
        <span class="pr-4">scan</span>
        <v-icon right>mdi-qrcode-scan</v-icon>
      </v-btn> -->
    </v-row>
    <v-row no-gutters>
      <v-card flat class="mt-8 mb-4" width="100%">
        <div>
          <v-text-field
            v-model="search"
            name="query"
            label="Query"
          />
        </div>
        <users-list
          :items="users"
          :loading="loadingUsers"
          :total="totalDocs"
          @loadMore="page.number++"
          @retry="getUsers"
          @delete="deleteUser"
          @edit="editUser"
        />
      </v-card>
    </v-row>
    <!-- <v-dialog
      v-model="edit"
      scrollable
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          Edit user
        </v-card-title>
        <v-card-text>
          <user-form ref="userForm" :data="user" />
        </v-card-text>
        <v-card-text>
          <table v-if="user">
            <tbody>
              <tr v-for="(admin, i) in user.admins" :key="i">
                <td class="pr-4">{{ admin.role }}</td>
                <td class="black--text">
                  {{ admin.first }} <br />
                  {{ admin.email }}
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="edit = false">
            Cancel
          </v-btn>
          <v-btn depressed dark color="main" width="100" @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import usersList from '~/components/root/usersList'
export default {
  components: {
    usersList
  },
  data: () => ({
    users: [],
    user: null,
    edit: false,
    loadingUsers: true,
    search: null,
    timer: null,
    totalDocs: 0,
    page: {
      number: 1,
      limit: 12
    }
  }),
  computed: {
    query () {
      const q = {}
      if (this.search) {
        q.filter = this.search
      }
      // if (this.) {
      //   q.project = this.project
      // }
      return q
    }
  },
  watch: {
    query (v) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.init()
        this.getUsers(v)
      }, 1000)
    },
    'page.number' () {
      this.getUsers(this.query)
    }
  },
  mounted () {
    this.getUsers(this.query)
  },
  methods: {
    init () {
      this.page.limit = 12
      this.page.number = 1
      this.users = []
    },
    // search(query) {
    //   if (query.office) this.office = query.office._id
    //   else this.office = null
    //   this.project = query.project
    // },
    getUsers (query) {
      this.loadingUsers = true
      this.$axios
        .get('/users', {
          params: { ...query, page: this.page }
        })
        .then(({ data }) => {
          this.users.push(...data.users.docs)
          this.totalDocs = data.users.totalDocs
        })
        .finally(() => (this.loadingUsers = false))
    },
    deleteUser (id) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.$axios.delete(`/users/${id}`).then(() => {
          this.$store.dispatch('snackbar', {
            text: 'User deleted successfully',
            color: 'success',
            timeout: 3000
          })
          this.getUsers()
        })
      }
    },
    save () {
      if (!this.$refs.userForm.validate()) { return }
      this.saving = true
      const user = JSON.parse(JSON.stringify(this.$refs.userForm.user))
      delete user.admins
      this.$axios
        .put(`/users/${this.user._id}`, user)
        .then(({ data }) => {
          this.$store.dispatch('snackbar', {
            text: 'User saved successfully',
            color: 'success',
            timeout: 3000
          })
          this.$refs.userForm.reset()
          this.edit = false
          this.getUsers()
        })
        .finally(() => {
          this.saving = false
        })
    },
    editUser (i) {
      this.user = this.users[i]
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
