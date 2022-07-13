<template>
  <v-card>
    <v-card-title primary-title class="flex-column align-start">
      <div>
        Edit ticket
        <v-chip
          v-if="order.paid && !!price"
          small
          class="mx-2"
          :color="order.paid === price ? 'success' : 'grey'"
          text-color="white"
        >
          <v-icon small left>
            {{ order.paid === price ? 'mdi-check-circle' : 'mdi-alert-circle' }}
          </v-icon>
          {{ order.paid === price ? 'Paid' : 'Partly paid' }}
        </v-chip>
      </div>
      <div v-if="order" class="body-2">
        payment and note for {{ order.user.first + ' ' + order.user.last }}'s
        ticket
      </div>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-col class="pa-0 pt-2">
          <v-text-field
            v-model="payment"
            validate-on-blur
            type="number"
            color="main lighten-2"
            name="payment"
            label="Paid"
            :disabled="!price"
            :rules="[
              (v) => v >= 0 || 'Positive only',
              (v) => v <= price || 'Pyament must be less or equal to ' + price
            ]"
          />
          <v-text-field
            v-model.trim="note"
            validate-on-blur
            color="main lighten-2"
            name="note"
            label="note"
            :rules="[(v) => (v || '').length <= 30 || '30 characters max']"
          />
        </v-col>
      </v-form>
      <div v-if="!!price">
        <div>
          Ticket price: <span class="text--primary">{{ price }}</span>
          <span class="overline">{{ $auth.user.office.currency }}</span>
        </div>
        <div>
          Paid: <span class="text--primary">{{ order.paid || 0 }}</span>
          <span class="overline">{{ $auth.user.office.currency }}</span>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn text @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-btn depressed dark color="main" width="100" @click="save">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      default: 0
    },
    order: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    payment: 0,
    note: null
  }),
  watch: {
    order (v) {
      if (v) {
        this.payment = v.paid ?? 0
        this.note = v.note
      }
    }
  },
  mounted () {
    this.payment = this.order.paid || 0
    this.note = this.order.note
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        this.$emit('save', { payment: this.payment, note: this.note })
        this.$emit('cancel')
      }
    }
  }
}
</script>

<style></style>
