<template>
  <v-card>
    <v-card-title primary-title>
      Add location
    </v-card-title>
    <v-card-text>
      <v-form ref="addLocationForm">
        <v-col class="pa-0 pt-2">
          <v-text-field
            v-model.trim="location.name"
            validate-on-blur
            autofocus
            color="main lighten-2"
            name="name"
            label="Name"
            :rules="[(v) => !!v || 'location required']"
          />
        </v-col>
        <v-col class="pa-0">
          <v-text-field
            v-model.trim="location.address"
            validate-on-blur
            color="main lighten-2"
            class="body-2"
            name="address"
            label="Address"
            :rules="[(v) => !!v || 'address required']"
          />
        </v-col>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn text @click="$emit('close')">
        Cancel
      </v-btn>
      <v-btn depressed dark color="main" width="100" @click="saveLocation">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    location: {
      name: '',
      address: ''
    }
  }),
  methods: {
    saveLocation () {
      if (this.$refs.addLocationForm.validate()) {
        this.$emit('save', this.location)
        this.$emit('close')
      }
    }
  }
}
</script>

<style></style>
