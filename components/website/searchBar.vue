<template>
  <div class="mt-8">
    <!-- <span class="font-weight-medium headline">Where?</span> -->
    <div style="max-width:450px" class="mb-1">
      <v-autocomplete
        v-model="office"
        no-filter
        hide-details
        clearable
        return-object
        height="55"
        name="search"
        item-text="province"
        item-value="_id"
        class="headline pt-0 align-center"
        color="main"
        placeholder="All places"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
      >
        <template #prepend>
          <span class="font-weight-medium">In</span>
        </template>
        <template #append>
          <span />
        </template>
        <template #no-data>
          <v-list-item class="text-center">
            <v-list-item-title v-show="isLoading">
              Just a second...
            </v-list-item-title>
            <v-list-item-title v-show="!!search && !isLoading">
              Sorry we found nothing <br>
              that matches
              <strong>{{ search }}</strong>
            </v-list-item-title>
            <v-list-item-title v-show="!search && !isLoading">
              Enter a place to get you it's events
            </v-list-item-title>
          </v-list-item>
        </template>
        <template #item="{ item }">
          <v-list-item-content>
            <v-list-item-title
              v-text="item && item.province + ' - ' + item.country"
            />
            <v-list-item-subtitle
              v-text="item && item.name"
            />
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </div>
    <div class="projects">
      <!-- <v-tabs v-model="projectId" background-color="transparent" color="black">
        <v-tabs-slider color="primary"></v-tabs-slider>
        <v-tab link :ripple="false" :value="0" class="v-tab--plain">
          All
        </v-tab>
        <v-tab
          v-for="(project, i) in projects"
          :key="i"
          link
          :ripple="false"
          :value="project._id"
          class="v-tab--plain"
        >
          {{ project.title }}
        </v-tab>
      </v-tabs> -->
      <v-btn-toggle
        v-model="projectId"
        mandatory
        tile
        borderless
        color="primary"
        class="ml-n3"
      >
        <v-btn
          text
          link
          class="v-btn--plain"
          color="black"
          :ripple="false"
          :value="0"
        >
          <div :class="projectId === 0 ? 'active-btn' : ''">
            <span class="pb-2 text-capitalize">All</span>
          </div>
        </v-btn>
        <template v-if="projects">
          <v-btn
            v-for="(project, i) in projects"
            :key="i"
            text
            class="v-btn--plain"
            color="black"
            :ripple="false"
            :value="project._id"
          >
            <div :class="projectId === project._id ? 'active-btn' : ''">
              <span class="pb-2 text-capitalize">{{
                project.title.toLowerCase()
              }}</span>
            </div>
          </v-btn>
        </template>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   search: {
  //     type: Function,
  //     default: () => null
  //   }
  // },
  data: () => ({
    office: null,
    search: null,
    items: [],
    projects: null,
    projectId: 0,
    isLoading: false,
    timer: null
  }),
  computed: {
    query () {
      const q = {
        office: this.office,
        project: this.projectId
      }
      return q
    },
    urlQuery () {
      const q = {
        o: this.office ? this.office._id : null,
        p: this.projectId
      }
      if (!q.o) { delete q.o }
      if (!q.p) { delete q.p }
      return q
    }
  },
  watch: {
    query (v) {
      this.$emit('search', v)
    },
    urlQuery (v) {
      if (!v) { return }
      this.$router.push({ query: v })
    },
    '$route.query' () {
      this.init()
    },
    office (v) {
      if (!v) { localStorage.removeItem('office') } else {
        localStorage.office = JSON.stringify({
          _id: v._id,
          name: v.name,
          location: v.location,
          province: v.province
        })
      }
    },
    projectId (v) {
      if (!v) { localStorage.removeItem('project') } else { localStorage.project = v }
    },
    search (v) {
      if (!v) {
        this.items = []
        this.office = null
        return
      }
      if (this.office) { return null }
      this.isLoading = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$axios
          .get('/offices', { params: { s: v } })
          .then(({ data }) => {
            this.items = data.offices
          })
          .finally(() => (this.isLoading = false))
      }, 500)
    }
  },
  mounted () {
    this.getProjects()
    // if (this.$route.query) {
    //   this.getUrlQr(this.$route.query)
    // } else if (localStorage.office) {
    //   const office = JSON.parse(localStorage.office)
    //   this.items = [office]
    //   this.office = office
    // }
  },
  methods: {
    init () {
      if (this.$route.query) {
        this.getUrlQr(this.$route.query)
      }
      if (localStorage.office && !this.office) {
        const office = JSON.parse(localStorage.office)
        this.items = [office]
        this.office = office
      }
      if (localStorage.project && !this.projectId) {
        this.projectId = localStorage.project
      }
      if (!this.projectId && !this.office) {
        this.$emit('search', this.query)
      }
    },
    getProjects () {
      this.$axios.get('/projects').then(({ data }) => {
        this.projects = data.projects
        this.init()
      })
    },
    getOffice (id) {
      this.$axios
        .get(`/offices/${id}`)
        .then(({ data }) => {
          if (data.office) {
            this.items = [data.office]
            this.office = data.office
          }
        })
        .finally(() => (this.isLoading = false))
    },
    resetFilters () {
      this.office = null
      this.projectId = 0
    },
    getUrlQr (q) {
      if (q.o) {
        this.getOffice(q.o)
      }
      if (q.p && this.projects.some(p => p._id === q.p)) {
        this.projectId = q.p
      }
    }
  }
}
</script>

<style scoped>
.projects {
  overflow-x: scroll;
}
.active-btn {
  /* color: var(--v-primary-base); */
  border-bottom: 2px var(--v-primary-base) solid;
}
</style>
