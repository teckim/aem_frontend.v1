<template>
  <v-card>
    <v-card-title primary-title class="flex-column align-start">
      <div>
        Add member
      </div>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-col class="pa-0 pt-2">
          <v-text-field
            v-model.trim="emailInput"
            validate-on-blur
            color="main lighten-2"
            class="body-2"
            name="email"
            label="Email"
            :rules="vRegEmail"
          />
          <v-select
            v-model="role"
            validate-on-blur
            color="main lighten-2"
            class="body-2"
            name="role"
            label="Role"
            :items="roles"
            :rules="[(v) => !!v || 'Role is required']"
          />
        </v-col>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn text @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-btn
        depressed
        dark
        color="main"
        width="100"
        :loading="loading"
        @click="save"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import validators from '~/plugins/validator'
export default {
  props: {
    email: {
      type: String,
      default: null
    }
  },
  data: () => ({
    loading: false,
    emailInput: null,
    role: 'user',
    roles: ['officeMember', 'user'],
    vRegEmail: validators.vRegEmail
  }),
  watch: {
    email (v) {
      if (v) {
        this.emailInput = v
      }
    }
  },
  mounted () {
    if (this.email) { this.emailInput = this.email }
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        this.loading = true
        const data = {
          email: this.emailInput,
          role: this.role
        }
        this.$axios
          .post('/members', data)
          .then(() => {
            this.$store.dispatch('snackbar', {
              text: 'Member added successfylly',
              color: 'success',
              timeout: 3000
            })
            this.$emit('refresh')
          })
          .finally(() => (this.loading = false))
      }
    }
  }
}
</script>

<style></style>
