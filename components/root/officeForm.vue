<template>
  <v-form ref="form">
    <div class="form">
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            v-model.trim="office.name"
            name="office-name"
            label="office name"
            type="text"
            color="main"
            counter="30"
            validate-on-blur
            :rules="[
              (v) => !!v || 'Office name is required',
              (v) => (v || '').length <= 30 || 'max characters 30'
            ]"
            required
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-autocomplete
            v-model="office.admin"
            name="admin"
            label="office admin (email)"
            color="main"
            :items="users"
            :loading="loading"
            :search-input.sync="qr"
            validate-on-blur
            :rules="[(v) => !!v || 'Admin is required']"
            clearable
            no-filter
            item-text="email"
            item-value="_id"
            required
          >
            <template #item="{ item }">
              <v-list-item-content>
                <v-list-item-title v-text="item.email" />
                <v-list-item-subtitle v-text="item.role" />
              </v-list-item-content>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="5">
          <v-text-field
            v-model.trim="office.country"
            name="country"
            label="country"
            color="main"
            counter="32"
            :rules="[
              (v) => !!v || 'Country is required',
              (v) => (v || '').length <= 32 || 'max characters 32'
            ]"
            required
            @change="getCurrency()"
          />
        </v-col>
        <v-col cols="10" sm="5">
          <v-text-field
            v-model.trim="office.province"
            name="province"
            label="province"
            type="text"
            color="main"
            counter="20"
            validate-on-blur
            :rules="[
              (v) => !!v || 'Province is required',
              (v) => (v || '').length <= 20 || 'max characters 20'
            ]"
            required
          />
        </v-col>
        <v-col cols="2" sm="2">
          <v-text-field
            v-model.trim="office.currency"
            name="currency"
            label="currency"
            hint="USD, DZD, TL,..."
            type="text"
            color="main"
            validate-on-blur
            :rules="[
              (v) => !!v || 'Currency is required',
              (v) => (v || '').length <= 3 || 'max characters 3'
            ]"
            required
            @change="
              office.currency
                ? (office.currency = office.currency.toUpperCase())
                : ''
            "
          />
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    office: {
      name: '',
      province: '',
      country: '',
      admin: '',
      currency: ''
    },
    users: [],
    timer: null,
    qr: '',
    loading: false
  }),
  watch: {
    qr (val) {
      if (val) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.getOfficeAdmin(val)
        }, 1000)
      }
    },
    data (v) {
      if (v) {
        Object.assign(this.office, v)
        this.users = v.admins
      }
    }
  },
  mounted () {
    if (this.data) {
      Object.assign(this.office, this.data)
      this.users = this.data.admins
    }
  },
  methods: {
    validate () {
      return this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    getOfficeAdmin (email) {
      this.loading = true
      this.$axios
        .get(`/users/${email}`)
        .then(({ data }) => {
          if (data.user) { this.users = [data.user] }
        })
        .finally(() => (this.loading = false))
    },
    getCurrency () {
      if (this.office.country) {
        const url = `https://restcountries.eu/rest/v2/name/${this.office.country}`
        fetch(url)
          .then(result => result.json())
          .then((countries) => {
            if (countries[0]) { this.office.currency = countries[0].currencies[0].code } else { this.office.currency = '' }
          })
      }
    }
  }
}
</script>

<style scoped>
.form {
  max-width: 650px;
}
</style>
