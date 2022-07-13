<template>
  <v-card flat class="mx-2">
    <v-alert
      v-show="updateMode"
      dense
      text
      border="left"
      type="warning"
      :value="true"
    >
      If changed, users will be emailed with the date changement
    </v-alert>
    <v-form ref="timingForm">
      <v-row>
        <v-col cols="12" md="4" sm="8">
          <v-menu
            v-model="startDateMenu"
            transition="scale-transition"
            min-width="290px"
            offset-y
            :close-on-content-click="false"
            :nudge-right="40"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="startDateFormated"
                name="start-date"
                label="Starting date"
                color="main ligthen-2"
                prepend-icon="mdi-calendar-arrow-right"
                readonly
                :rules="vStartDate"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="startDate"
              color="main ligthen-2"
              @input="startDateMenu = false"
              @change="endDate = startDate"
            />
          </v-menu>
        </v-col>
        <v-col cols="12" md="2" sm="4">
          <v-menu
            ref="startTimeMenu"
            v-model="startTimeMenu"
            transition="scale-transition"
            min-width="290px"
            offset-y
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="startTime"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="startTime"
                name="start-time"
                label="Starting time"
                color="main ligthen-2"
                prepend-icon="mdi-clock-in"
                readonly
                validate-on-blur
                :rules="vStartTime"
                v-on="on"
              />
            </template>
            <v-time-picker
              v-model="startTime"
              color="main ligthen-2"
              format="24hr"
              @click:minute="$refs.startTimeMenu.save(startTime)"
            />
          </v-menu>
        </v-col>
        <v-col cols="12" md="4" sm="8">
          <v-menu
            v-model="endDateMenu"
            transition="scale-transition"
            min-width="290px"
            offset-y
            :close-on-content-click="false"
            :nudge-right="40"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="endDateFormated"
                name="end-date"
                label="Ending date"
                color="main ligthen-2"
                prepend-icon="mdi-calendar-arrow-left"
                readonly
                :rules="vEndDate"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="endDate"
              color="main ligthen-2"
              @input="endDateMenu = false"
            />
          </v-menu>
        </v-col>
        <v-col cols="12" md="2" sm="4">
          <v-menu
            ref="endTimeMenu"
            v-model="endTimeMenu"
            transition="scale-transition"
            min-width="290px"
            offset-y
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="endTime"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="endTime"
                name="end-time"
                label="ending time"
                color="main ligthen-2"
                prepend-icon="mdi-clock-out"
                readonly
                validate-on-blur
                :rules="vEndTime"
                v-on="on"
              />
            </template>
            <v-time-picker
              v-model="endTime"
              color="main ligthen-2"
              format="24hr"
              @click:minute="$refs.endTimeMenu.save(endTime)"
            />
          </v-menu>
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
  </v-card>
</template>

<script>
import moment from 'moment'
import { timing } from '~/plugins/eventValidators'
export default {
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
    startDateMenu: false,
    endDateMenu: false,
    startTimeMenu: false,
    endTimeMenu: false,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    loading: false,
    ...timing
  }),
  computed: {
    startDateFormated () {
      return this.formatDate(this.startDate)
    },
    endDateFormated () {
      return this.formatDate(this.endDate)
    }
  },
  watch: {
    data (v) {
      if (v) {
        const startDate = moment(v.startsOn).format()
        const endDate = moment(v.endsOn).format()
        this.startDate = startDate.substr(0, 10)
        this.endDate = endDate.substr(0, 10)
        this.startTime = startDate.substr(11, 5)
        this.endTime = endDate.substr(11, 5)
      }
    }
  },
  mounted () {
    if (this.data) {
      const startDate = moment(this.data.startsOn).format()
      const endDate = moment(this.data.endsOn).format()
      this.startDate = startDate.substr(0, 10)
      this.endDate = endDate.substr(0, 10)
      this.startTime = startDate.substr(11, 5)
      this.endTime = endDate.substr(11, 5)
    }
  },
  methods: {
    formatDate (date) {
      return date ? moment(date).format('dddd, MMM D, YYYY') : ''
    },
    submit () {
      if (this.validate()) {
        const data = {
          startsOn: new Date(
            this.startDate.toString() + 'T' + this.startTime.toString()
          ),
          endsOn: new Date(
            this.endDate.toString() + 'T' + this.endTime.toString()
          )
        }
        data.startsOn = data.startsOn.toISOString()
        data.endsOn = data.endsOn.toISOString()
        this.$emit('submit', data)
      }
    },
    update () {
      if (this.validate()) {
        const data = {
          startsOn: new Date(
            this.startDate.toString() + 'T' + this.startTime.toString()
          ),
          endsOn: new Date(
            this.endDate.toString() + 'T' + this.endTime.toString()
          )
        }
        data.startsOn = data.startsOn.toISOString()
        data.endsOn = data.endsOn.toISOString()
        this.$emit('update', data)
      }
    },
    validate () {
      let valid = false
      if (this.$refs.timingForm.validate()) {
        const data = {
          startsOn: new Date(
            this.startDate.toString() + 'T' + this.startTime.toString()
          ),
          endsOn: new Date(
            this.endDate.toString() + 'T' + this.endTime.toString()
          )
        }
        if (data.startsOn.getTime() < new Date().getTime()) {
          this.showError('Start Date cannot be before current Date')
        } else if (data.startsOn.getTime() > data.endsOn.getTime()) {
          this.showError('Start Date cannot be after End Date')
        } else if (data.endsOn.getTime() - data.startsOn.getTime() < 1800000) {
          this.showError('The Event must be at least 30 min')
        } else {
          valid = true
        }
      }
      return valid
    },
    showError (msg) {
      this.$store.dispatch('snackbar', {
        text: msg,
        color: 'error',
        timeout: 3000
      })
    }
  }
}
</script>

<style></style>
