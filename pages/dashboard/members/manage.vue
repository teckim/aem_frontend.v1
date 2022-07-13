<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <div class="py-2">
        <div class="headline">
          Manage members
        </div>
        <div
          v-if="members && members.length"
          class="subtitle text--secondary"
          v-text="members.length + ' members'"
        />
      </div>
      <!-- <v-btn rounded color="main white--text">
        <span class="pr-4">scan</span>
        <v-icon right>mdi-qrcode-scan</v-icon>
      </v-btn> -->
    </v-row>
    <v-row no-gutters>
      <v-card flat class="mt-8 mb-4" width="100%">
        <members-list
          :items="members"
          :limit="query.limit"
          :loading="loadingMembers"
          @loadMore="query.page++"
          @retry="getMembers"
          @delete="deleteMember"
        />
      </v-card>
    </v-row>
  </div>
</template>

<script>
import membersList from '~/components/dashboard/membersList'
export default {
  components: {
    membersList
  },
  data: () => ({
    members: [],
    loadingMembers: true,
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
      this.getMembers()
    }
  },
  mounted () {
    this.getMembers()
  },
  methods: {
    getMembers (re = false) {
      if (re) {
        this.members = []
        this.query.page = 1
      }
      this.loadingMembers = true
      this.$axios
        .get('/members', {
          params: { ...this.query }
        })
        .then(({ data }) => {
          this.members.push(...data.members)
        })
        .finally(() => (this.loadingMembers = false))
    },
    deleteMember (id) {
      this.$axios.delete(`/members/${id}`).then(() => {
        this.$store.dispatch('snackbar', {
          text: 'Member deleted successfully',
          color: 'success',
          timeout: 3000
        })
        this.getMembers(true)
      })
    }
  }
}
</script>

<style></style>
