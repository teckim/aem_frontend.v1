<template>
  <v-card flat class="mx-2">
    <v-form ref="ticketsForm">
      <v-row>
        <v-col>
          <v-switch
            v-model="paid"
            dense
            hide-details
            color="main"
            :disabled="updateMode"
            :label="paid ? 'Paid' : 'Free'"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" sm="4">
          <v-text-field
            v-model.number="event.price"
            type="number"
            name="price"
            label="Price"
            color="main ligthen-2"
            validate-on-blur
            :disabled="!paid || updateMode"
            :suffix="$auth.user.office.currency"
            :rules="[(v) => !!v || !paid || 'price required']"
          />
        </v-col>
        <v-col cols="4" sm="2">
          <v-text-field
            v-model.number="event.ticketsNumber"
            type="number"
            name="tickets-number"
            label="Tickets"
            color="main ligthen-2"
            validate-on-blur
            :rules="vTickets"
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
    <v-btn v-show="!updateMode" depressed dark color="main" @click="submit">
      <span>next</span>
      <v-icon right>
        mdi-arrow-right
      </v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import { tickets } from '~/plugins/eventValidators'
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
    event: {
      price: 0,
      ticketsNumber: 50
    },
    paid: false,
    ...tickets
  }),
  watch: {
    data (v) {
      if (v) {
        this.event.price = v.price
        this.event.ticketsNumber = v.ticketsNumber
      }
    }
  },
  mounted () {
    if (this.data) {
      this.event.price = this.data.price
      this.event.ticketsNumber = this.data.ticketsNumber
    }
  },
  methods: {
    saveLocation (v) {
      this.locations.push(v)
      this.event.location = v
    },
    submit () {
      if (!this.paid) { this.event.price = 0 }
      if (this.$refs.ticketsForm.validate()) {
        this.$emit('submit', this.event)
      }
    },
    update () {
      if (!this.paid) { this.event.price = 0 }
      if (this.$refs.ticketsForm.validate()) {
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
