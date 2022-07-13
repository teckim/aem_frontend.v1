<template>
  <v-card>
    <v-card-title primary-title>
      Delete event
    </v-card-title>
    <v-card-text>
      <v-alert
        v-show="!!alert"
        dense
        text
        type="warning"
        :value="true"
        v-text="alert"
      />
      <div v-text="message" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn depressed dark color="main" @click="$emit('confirm')">
        confirm
      </v-btn>
      <v-btn text @click="$emit('cancel')">
        cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Are you sure?'
    },
    alert: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style></style>
