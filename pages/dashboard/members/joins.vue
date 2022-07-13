<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <div class="py-2">
        <div class="headline">
          Manage join requests
        </div>
        <div
          v-if="joins && joins.length"
          class="subtitle text--secondary"
          v-text="joins.length + ' requests'"
        />
      </div>
      <!-- <v-btn rounded color="main white--text">
        <span class="pr-4">scan</span>
        <v-icon right>mdi-qrcode-scan</v-icon>
      </v-btn> -->
    </v-row>
    <v-row no-gutters>
      <v-card flat class="mt-8 mb-4" width="100%">
        <joins-list
          :items="joins"
          :limit="query.limit"
          :loading="loadingJoins"
          @accept="accept"
          @delete="remove"
          @loadMore="query.page++"
          @retry="getJoins"
        />
      </v-card>
    </v-row>
    <v-dialog v-model="addDialog" width="512px" transition="dialog-transition">
      <add-member
        :email="email"
        @cancel="addDialog = false"
        @refresh="
          addDialog = false
          getJoins(true)
        "
      />
    </v-dialog>
  </div>
</template>

<script>
import joinsList from '~/components/dashboard/joinsList'
import addMember from '~/components/dashboard/addMember'
export default {
  components: {
    joinsList,
    addMember
  },
  data: () => ({
    joins: [],
    loadingJoins: true,
    addDialog: false,
    email: null,
    query: {
      page: 1,
      limit: 10
    }
  }),
  computed: {
    pageNum () {
      return this.query.page
    }
  },
  watch: {
    pageNum (v) {
      this.getJoins()
    }
  },
  mounted () {
    this.getJoins()
  },
  methods: {
    getJoins (re = false) {
      if (re) {
        this.joins = []
        this.query.page = 1
      }
      this.loadingJoins = true
      this.$axios
        .get('/joins', {
          params: { ...this.query }
        })
        .then(({ data }) => {
          this.joins.push(...data.joins)
        })
        .finally(() => (this.loadingJoins = false))
    },
    accept (email) {
      this.email = email
      this.addDialog = true
    },
    remove (id) {
      this.$axios.delete(`/joins/${id}`).then(() => {
        this.$store.dispatch('snackbar', {
          text: 'Join request deleted successfully',
          color: 'success',
          timeout: 5000
        })
        this.getJoins(true)
      })
    }
  }
}
</script>

<style></style>
