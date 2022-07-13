<template>
  <v-card flat class="mx-2">
    <v-form ref="generalForm">
      <v-row>
        <v-col cols="12" md="3" sm="3">
          <v-autocomplete
            v-model="event.project"
            name="project"
            label="Project"
            color="main lighten-2"
            item-text="title"
            item-value="_id"
            validate-on-blur
            return-object
            :items="projects"
            :rules="vProject"
            :disabled="updateMode"
          />
        </v-col>
        <v-col cols="12" md="3" sm="3">
          <v-text-field
            v-model.trim="event.subject"
            name="subject"
            label="Subject"
            color="main ligthen-2"
            validate-on-blur
            :rules="vSubject"
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" class="d-inline-flex align-center">
          <v-autocomplete
            v-model="event.location"
            name="location"
            label="Location"
            color="main ligthen-2"
            item-text="address"
            item-value="name"
            validate-on-blur
            clearable
            no-filter
            return-object
            :items="locations"
            :loading="gettingLocations"
            :rules="vLocation"
          >
            <template #no-data>
              <v-list-item>
                <v-list-item-title>
                  Search for a
                  <strong>Location</strong>
                </v-list-item-title>
              </v-list-item>
            </template>
            <template #selection="{ attr, on, item }">
              <span v-text="item.address" />
            </template>
            <template #item="{ item }">
              <v-list-item-content>
                <v-list-item-title v-text="item.name" />
                <v-list-item-subtitle
                  v-text="item.address"
                />
              </v-list-item-content>
            </template>
          </v-autocomplete>
          <v-btn icon color="main" @click="addLocationDialog = true">
            <v-icon>mdi-map-marker-plus-outline</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="event.about"
            name="about"
            label="About the event (optional)"
            color="main ligthen-2"
            counter="500"
            outlined
            validate-on-blur
            :rules="vAbout"
          />
        </v-col>
      </v-row>
    </v-form>
    <v-btn v-show="edit" depressed dark color="main" @click="update">
      <span>preview</span>
    </v-btn>
    <v-btn v-show="updateMode" text @click="$emit('cancel')">
      <span>cancel</span>
    </v-btn>
    <v-btn
      v-show="!updateMode"
      depressed
      :text="edit"
      dark
      color="main"
      :loading="loading"
      @click="submit"
    >
      <span>next</span>
      <v-icon right>
        mdi-arrow-right
      </v-icon>
    </v-btn>
    <v-dialog
      v-model="addLocationDialog"
      :overlay="false"
      max-width="400px"
      transition="dialog-transition"
    >
      <add-location @save="saveLocation" @close="addLocationDialog = false" />
    </v-dialog>
  </v-card>
</template>

<script>
import { general } from '~/plugins/eventValidators'
import addLocation from '~/components/dashboard/addLocation'
export default {
  components: {
    addLocation
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    updateMode: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    event: {
      project: null,
      subject: null,
      location: null,
      about: null
    },
    projects: [
      {
        _id: '5e316dae39d09d0ae45bf4c4',
        title: 'COFFEE MEETUP'
      },
      {
        _id: '5e368bf7853855437a8ca97e',
        title: 'HANGOUT'
      },
      {
        _id: '5e84e0ab28d25c5f6966bae7',
        title: 'E-MEETUP'
      }
    ],
    locations: [
      {
        address: 'Online',
        name: 'Zoom application'
      }
    ],
    gettingLocations: false,
    addLocationDialog: false,
    loading: false,
    ...general
  }),
  watch: {
    data (v) {
      if (v) {
        this.event.subject = v.subject
        this.event.about = v.about
        this.event.project = v.project
        this.event.location = v.location
      }
    }
  },
  mounted () {
    if (this.data) {
      this.event.subject = this.data.subject
      this.event.about = this.data.about
      this.event.project = this.data.project
      this.event.location = this.data.location
    }
  },
  methods: {
    saveLocation (v) {
      this.locations.push(v)
      this.event.location = v
    },
    submit () {
      if (this.validate()) {
        this.$emit('submit', this.event)
      }
    },
    update () {
      if (this.validate()) {
        this.$emit('update', this.event)
      }
    },
    validate () {
      return this.$refs.generalForm.validate()
    }
  }
}
</script>

<style></style>
