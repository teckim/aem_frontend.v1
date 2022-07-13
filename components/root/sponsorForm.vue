<template>
  <v-form ref="form">
    <div class="form">
      <v-row dense>
        <v-col cols="4">
          <v-text-field
            v-model.trim="sponsor.name"
            name="name"
            label="name"
            type="text"
            color="main"
            validate-on-blur
            :rules="[(v) => !!v || 'Sponsor name is required']"
            required
          />
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model.trim="sponsor.slogan"
            name="slogan"
            label="slogan"
            type="text"
            color="main"
            required
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            v-model.trim="sponsor.link"
            name="link"
            label="link"
            type="text"
            color="main"
            placeholder="https://"
            validate-on-blur
            :rules="[(v) => !!v || 'Link is required']"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="sponsor.type"
            :items="types"
            name="type"
            label="type"
            color="main"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-switch v-model="sponsor.active" label="Active" />
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="!!sponsor.image" class="text-center">
          <v-btn depressed dark color="main" @click="showMediaGallery">
            <span>change image</span>
          </v-btn>
          <v-img
            contain
            max-width="500"
            class="mx-auto mt-4"
            :src="$axios.defaults.baseURL + '/images/' + sponsor.image"
          />
        </v-col>
        <v-col v-else>
          <v-responsive min-height="200" class="align-center text-center">
            <h4>Select image from gallery or upload new one</h4>
            <v-btn
              depressed
              dark
              width="150"
              color="main"
              class="my-4"
              @click="showMediaGallery"
            >
              <v-icon left>
                mdi-image-multiple-outline
              </v-icon> gallery
            </v-btn>
            <v-btn
              text
              dark
              width="150"
              color="primary"
              class="my-4"
              @click="showMediaUpload"
            >
              <v-icon left>
                mdi-cloud-upload-outline
              </v-icon> upload
            </v-btn>
          </v-responsive>
        </v-col>
      </v-row>
      <!-- <div v-show="!!project.image">
        <v-btn v-show="edit" depressed dark color="main" @click="update">
          <span>preview</span>
        </v-btn>
        <v-btn v-show="updateMode" text @click="$emit('cancel')">
          <span>cancel</span>
        </v-btn>
      </div> -->
      <v-dialog
        v-model="mediaGallery"
        max-width="1200px"
        transition="dialog-transition"
      >
        <media-gallery
          v-if="mediaGallery"
          :upload-mode="uploadMode"
          @selected="onSelected"
          @cancel="mediaGallery = false"
        />
      </v-dialog>
    </div>
  </v-form>
</template>

<script>
import mediaGallery from '~/components/global/mediaGallery'
export default {
  components: {
    mediaGallery
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    sponsor: {
      name: '',
      slogan: '',
      link: '',
      type: 'silver',
      active: false,
      image: ''
    },
    types: ['official', 'platinum', 'golden', 'silver'],
    mediaGallery: false,
    uploadMode: false
  }),
  watch: {
    data (v) {
      if (v) {
        Object.assign(this.sponsor, v)
      }
    }
  },
  mounted () {
    if (this.data) {
      Object.assign(this.sponsor, this.data)
    }
  },
  methods: {
    onSelected (image) {
      this.sponsor.image = image
      this.mediaGallery = false
    },
    showMediaUpload () {
      this.mediaGallery = true
      this.uploadMode = true
    },
    showMediaGallery () {
      this.mediaGallery = true
      this.uploadMode = false
    },
    validate () {
      if (!this.sponsor.image) {
        this.$refs.form.validate()
        this.$store.dispatch('snackbar', {
          text: 'Image is required',
          color: 'error',
          timeout: 3000
        })
        return false
      }
      return this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
      this.sponsor.image = null
    }
  }
}
</script>

<style scoped>
.form {
  max-width: 650px;
}
</style>
