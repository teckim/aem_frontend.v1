<template>
  <div>
    <v-card v-if="!items.length && !loading" flat class="py-8">
      <v-card-text>
        <div class="text-center">
          <span>
            No office to show, Please
            <a>retry</a>
          </span>
        </div>
      </v-card-text>
    </v-card>
    <div>
      <v-card
        v-for="(office, i) in items"
        :key="i"
        v-outside-click="onClickOutside"
        outlined
        class="my-2 office-card"
        :ripple="false"
        @click.stop="actionBtns = i"
      >
        <v-row no-gutters>
          <v-col class="py-4 pl-4">
            <div class="d-inline-flex align-center">
              <span class="title mr-2">
                {{ office.name }}
              </span>
            </div>
            <div class="body-2 text--secondary">
              {{ office.country + ' - ' + office.province }}
            </div>
          </v-col>
          <div
            v-show="actionBtns === i"
            class="office-action-buttons fill-height"
          >
            <v-spacer @click="details = i" />
            <v-btn
              tile
              depressed
              color="primary"
              height="100%"
              width="80"
              @click="$emit('edit', i)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              tile
              depressed
              color="error"
              height="100%"
              width="80"
              @click="$emit('delete', office._id)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-row>
        <v-slide-x-reverse-transition hide-on-leave>
          <div v-show="details === i">
            <v-divider />
            <v-card
              v-if="office.members.length"
              flat
              tile
              class="body-2 px-4 py-3"
            >
              <table>
                <tr class="text--secondary">
                  <th>ID</th>
                  <th>Full name</th>
                  <th>email</th>
                </tr>

                <tr v-for="member in office.members" :key="member._id">
                  <td>
                    {{ member._id }}
                  </td>
                  <td>
                    <nuxt-link :to="`/root/users/${member._id}`">
                      {{ member.first + ' ' + member.last }}
                    </nuxt-link>
                  </td>
                  <td>
                    {{ member.email }}
                  </td>
                </tr>
              </table>
            </v-card>
            <v-card v-else flat tile class="body-2 px-4 py-3">
              No members
            </v-card>
          </div>
        </v-slide-x-reverse-transition>
      </v-card>
    </div>
    <div v-show="loading">
      <v-card v-for="index in 5" :key="index" outlined class="px-2 my-2">
        <v-responsive max-width="200">
          <v-skeleton-loader
            ref="skeleton"
            type="list-item-two-line"
            class="mx-auto"
          />
        </v-responsive>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    actionBtns: null,
    id: '',
    details: null
  }),
  methods: {
    onClickOutside (event) {
      this.actionBtns = null
      this.details = null
    }
  }
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f5f5f5;
}
.office-card {
  transition: all 200ms;
  border-radius: 0;
  position: relative;
}
.office-card .row {
  position: relative;
}
.office-card:hover {
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}
/* .office-card:hover .office-action-buttons {
  display: inline-flex;
} */
.office-action-buttons {
  position: absolute;
  overflow: hidden;
  right: 0;
  width: 100%;
  display: inline-flex;
}
.v-toolbar__content {
  padding: 0px !important;
}
</style>
