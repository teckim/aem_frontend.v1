<template>
  <div>
    <!-- <v-card-text>
      <div class="py-1">
        <v-btn depressed class="my-2 px-0" color="#DB4437" large block dark>
          <img width="40" :src="require('@/assets/icons/google1.png')" />
          <v-col class="text-none text-left">
            <div>Continue with Google</div>
          </v-col>
        </v-btn>
        <v-btn
          depressed
          class="my-2 px-0"
          color="#1877F2"
          large
          block
          dark
          @click="loginWithFacebook"
        >
          <img width="40" :src="require('@/assets/icons/facebook.png')" />
          <v-col class="text-none text-left">
            Continue with
            <span class="font-weight-medium">Facebook</span>
          </v-col>
        </v-btn>
      </div>
    </v-card-text>
    <v-card-text class="py-0">
      <div
        class="text-grey text-center subtitle-1 font-weight-thin"
        style="height:0"
      >
        <v-divider></v-divider>
        <span class="or">Or</span>
      </div>
    </v-card-text> -->
    <v-card-title class="py-0">
      <div class="main--text font-weight-black login-title">
        LOG IN TO AEM
      </div>
    </v-card-title>
    <v-card-text>
      <div class="grey--text">
        Please login to continue
      </div>
    </v-card-text>
    <v-card-text>
      <v-form ref="loginForm">
        <v-text-field
          v-model.trim="email"
          validate-on-blur
          color="main lighten-2"
          name="email"
          label="Email"
          :disabled="loading"
          :rules="vLogEmail"
          @keyup.enter.native="!!email && $refs.passField.focus()"
        />
        <v-text-field
          ref="passField"
          v-model="pass"
          validate-on-blur
          color="main lighten-2"
          name="pass"
          label="Password"
          :disabled="loading"
          :type="showPass ? 'text' : 'password'"
          :rules="vLogPassword"
          @keyup.enter.native="login()"
        >
          <template #append>
            <v-icon small @click="showPass = !showPass">
              {{
                showPass ? 'mdi-eye' : 'mdi-eye-off'
              }}
            </v-icon>
          </template>
        </v-text-field>
        <div class="d-flex justify-space-between align-center mt-5">
          <div>
            <v-btn
              depressed
              large
              dark
              rounded
              color="main"
              min-width="150"
              :loading="loading"
              @click="login()"
            >
              <v-icon left>
                mdi-chevron-right
              </v-icon>Log In
            </v-btn>
          </div>
          <div>
            <a color="primary" @click="forgetPassDialog = true">
              Forgot password?
            </a>
          </div>
        </div>
      </v-form>
    </v-card-text>
    <v-dialog
      v-model="forgetPassDialog"
      :overlay="false"
      max-width="400px"
      transition="dialog-transition"
    >
      <forget-pass @close="forgetPassDialog = false" />
    </v-dialog>
  </div>
</template>

<script>
import validators from '~/plugins/validator'
import forgetPass from '~/components/website/forgetPass'

export default {
  components: {
    forgetPass
  },
  props: {
    submitForm: {
      type: Function,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    email: '',
    pass: '',
    showPass: false,
    forgetPassDialog: false,
    vLogEmail: validators.vLogEmail,
    vLogPassword: validators.vLogPassword
  }),
  methods: {
    login () {
      if (this.$refs.loginForm.validate()) {
        const user = {
          email: this.email,
          password: this.pass
        }
        this.submitForm(user)
      }
    }
  }
}
</script>

<style scoped>
.or {
  position: relative;
  top: -15px;
  padding: 0 10px;
  background: #fff;
}

.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  border-radius: 20px;
  /* display:inline-block; */
}
.list-item:first-child {
  margin: 0;
}
.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.button {
  margin: auto;
}
</style>
