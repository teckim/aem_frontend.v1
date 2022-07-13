<template>
  <span>
    <v-navigation-drawer
      v-model="drawer"
      bottom
      :expand-on-hover="!$vuetify.breakpoint.smAndDown"
      mobile-break-point="960"
      clipped
      app
    >
      <v-list dense flat>
        <v-list-item two-line class="px-2" to="/user/profile/edit">
          <v-list-item-avatar
            v-if="$auth.user"
            size="40"
            color="main"
            class="text-uppercase white--text"
          >
            {{ $auth.user.first[0] }}
          </v-list-item-avatar>
          <v-list-item-content class="pl-2 text-capitalize">
            <v-list-item-title v-if="$auth.user">
              {{ $auth.user.first + ' ' + $auth.user.last.toUpperCase() }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ role }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <template v-for="(item, i) in items">
          <v-list-group
            v-if="item.child"
            :key="i"
            color="main"
            :group="item.group"
          >
            <template #activator>
              <v-list-item-action>
                <v-icon size="20">{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-title v-text="item.title" />
            </template>
            <v-list-item
              v-for="(child, n) in item.child"
              :key="n"
              :to="child.to"
              active-class="main--text text--lighten-2"
              router
            >
              <v-list-item-icon>
                <v-icon size="16">{{ child.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="child.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="i" :to="item.to" router>
            <v-list-item-action>
              <v-icon size="20">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed flat app clipped-left>
      <!-- class="d-md-block d-none" -->
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn rounded small text color="main" to="/user">
        <v-icon size="18" left>mdi-account</v-icon>
        user panel
      </v-btn>
      <v-btn
        rounded
        small
        text
        color="main"
        class="mr-1"
        @click="logout"
      >
        <v-icon size="18" left>mdi-logout</v-icon>
        logout
      </v-btn>
    </v-app-bar>
  </span>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [
        {
          icon: 'mdi-office-building',
          title: 'Offices',
          group: '/root/offices/*',
          child: [
            {
              icon: 'mdi-plus',
              title: 'Create',
              to: '/root/offices/create'
            },
            {
              icon: 'mdi-cog',
              title: 'Manage',
              to: '/root/offices/manage'
            },
            {
              icon: 'mdi-chart-arc',
              title: 'Activities',
              to: '/root/offices/activity'
            }
          ]
        },
        {
          icon: 'mdi-atom',
          title: 'Projects',
          group: 'root/projects/*',
          child: [
            {
              icon: 'mdi-plus',
              title: 'Create',
              to: '/root/projects/create'
            },
            {
              icon: 'mdi-cog',
              title: 'Manage',
              to: '/root/projects/manage'
            }
          ]
        },
        {
          icon: 'mdi-handshake',
          title: 'Sponsors',
          group: 'root/sponsors/*',
          child: [
            {
              icon: 'mdi-plus',
              title: 'Create',
              to: '/root/sponsors/create'
            },
            {
              icon: 'mdi-cog',
              title: 'Manage',
              to: '/root/sponsors/manage'
            }
          ]
        },
        {
          icon: 'mdi-account-multiple-outline',
          title: 'Users',
          to: '/root/users'
        }
      ]
    }
  },
  computed: {
    role () {
      const role = this.$auth.user.role
      if (!role) { return '' }
      return role.slice(0, 6) + ' ' + role.slice(6)
    }
  },
  methods: {
    logout () {
      this.$auth.logout('local')
    }
  }
}
</script>

<style scoped>
.v-list-group {
  transition: 0.5s padding ease;
}
.v-list-group--active {
  padding-bottom: 12px;
  padding-top: 12px;
}
.v-list-item .v-icon {
  margin: auto;
}
</style>
