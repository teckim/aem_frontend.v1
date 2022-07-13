<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <span class="headline py-2">Security</span>
      <v-btn rounded color="success" :disabled="!password || !valid || loading">
        <span class="pr-4" @click="updatePassword()">save</span>
        <v-icon right>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-row>
    <v-card elevation="3" class="mt-6" :loading="loading" :disabled="loading">
      <v-card-text>
        <v-responsive width="360">
          <v-row
            no-gutters
            class="title black--text mt-4"
          >
            Change password
          </v-row>
          <v-form ref="updatePasswordForm" v-model="valid">
            <div class="pl-3">
              <v-text-field
                v-model="password"
                color="main lighten-2"
                name="pass"
                label="Current password"
                :type="showPass ? 'text' : 'password'"
                :rules="vLogPassword"
              >
                <template #append>
                  <v-icon small @click="showPass = !showPass">
                    {{
                      showPass ? 'mdi-eye' : 'mdi-eye-off'
                    }}
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field
                v-model="newPassword"
                color="main lighten-2"
                name="passConf"
                label="New password"
                :type="showPass ? 'text' : 'password'"
                :rules="vRegPassword"
              >
                <template #append>
                  <v-icon small @click="showPass = !showPass">
                    {{
                      showPass ? 'mdi-eye' : 'mdi-eye-off'
                    }}
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field
                v-model="confNewPassword"
                color="main lighten-2"
                name="passConf"
                label="Confirm new password"
                :type="showPass ? 'text' : 'password'"
                :rules="vRegConfPassword"
              >
                <template #append>
                  <v-icon small @click="showPass = !showPass">
                    {{
                      showPass ? 'mdi-eye' : 'mdi-eye-off'
                    }}
                  </v-icon>
                </template>
              </v-text-field>
            </div>
          </v-form>
        </v-responsive>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import validators from '~/plugins/validator'
export default {
  data: () => ({
    password: '',
    confNewPassword: '',
    newPassword: '',
    showPass: false,
    loading: false,
    valid: false,
    ...validators
  }),
  head () {
    return {
      title: 'Security'
    }
  },
  mounted () {
    this.vRegConfPassword.push(
      v => v === this.newPassword || "passwords doesn't match"
    )
    this.vRegPassword.push(v => v !== this.password || 'same old password')
  },
  methods: {
    updatePassword () {
      if (this.$refs.updatePasswordForm.validate()) {
        this.loading = true
        this.$axios
          .put('/users/password', {
            password: this.password,
            newPassword: this.newPassword
          })
          .then(() => {
            this.$store.dispatch('snackbar', {
              text: 'Password updated successfully',
              color: 'success',
              timeout: 3000
            })
            this.$refs.updatePasswordForm.reset()
          })
          .finally(() => (this.loading = false))
      }
    }
  }
}
</script>

<style></style>
