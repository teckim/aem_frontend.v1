<template>
  <div>
    <v-slide-x-transition hide-on-leave>
      <div v-if="!success" key="1">
        <v-card :loading="loading">
          <v-card-title primary-title>
            Change email
          </v-card-title>
          <v-card-subtitle>{{ $auth.user.email }}</v-card-subtitle>
          <v-card-text>
            <v-form ref="updateEmailForm">
              <v-col class="pa-0 pt-2">
                <v-text-field
                  v-model="pass"
                  validate-on-blur
                  autofocus
                  color="main lighten-2"
                  name="pass"
                  label="Password"
                  :type="showPass ? 'text' : 'password'"
                  :rules="vRegPassword"
                  @click:append="showPass = !showPass"
                >
                  <template #append>
                    <v-icon small @click="showPass = !showPass">
                      {{
                        showPass ? 'mdi-eye' : 'mdi-eye-off'
                      }}
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col class="pa-0">
                <v-text-field
                  v-model.trim="email"
                  validate-on-blur
                  color="main lighten-2"
                  class="body-2"
                  name="email"
                  label="New email"
                  :rules="vRegEmail"
                />
              </v-col>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="$emit('close')">
              Cancel
            </v-btn>
            <v-btn depressed dark color="main" width="100" @click="saveEmail">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-else key="2">
        <v-card :loading="loading">
          <div class="text-center py-5 px-1">
            <check />
            <h3 class="success--text pb-2">
              Email updated
            </h3>
            <span class="body-2 grey--text">We've sent you a verification email that is valid for 24H,
              <br>
              please check your email inbox/spam to reactivate your
              account.</span><br>
            <v-btn
              rounded
              small
              outlined
              color="success"
              class="mt-2"
              @click="$emit('close')"
            >
              done
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-slide-x-transition>
  </div>
</template>

<script>
import check from '~/components/global/check'
import validators from '~/plugins/validator'

export default {
  components: {
    check
  },
  data: () => ({
    loading: false,
    success: false,
    showPass: false,
    pass: '',
    email: '',
    ...validators
  }),
  methods: {
    saveEmail () {
      if (this.$refs.updateEmailForm.validate()) {
        this.loading = true
        this.$axios
          .put('/users/email', {
            password: this.pass,
            email: this.email
          })
          .then(() => {
            this.success = true
            this.$auth.fetchUser()
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style></style>
