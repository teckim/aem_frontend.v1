<template>
  <v-form ref="form">
    <div class="form">
      <v-row dense>
        <v-col cols="6">
          <v-text-field
            v-model.trim="project.title"
            name="title"
            label="title"
            type="text"
            color="main"
            counter="30"
            validate-on-blur
            :rules="[
              (v) => !!v || 'Project title is required',
              (v) => (v || '').length <= 30 || 'max characters 30'
            ]"
            required
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-textarea
            v-model.trim="project.description"
            name="description"
            label="description"
            type="text"
            color="main"
            counter="500"
            validate-on-blur
            :rules="[
              (v) => !!v || 'Project description is required',
              (v) => (v || '').length <= 500 || 'max characters 500'
            ]"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="!!project.image.name" class="text-center">
          <v-btn depressed dark color="main" @click="showMediaGallery">
            <span>change image</span>
          </v-btn>
          <v-img
            contain
            max-width="500"
            class="mx-auto mt-4"
            :src="$axios.defaults.baseURL + '/images/' + project.image.name"
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
    project: {
      title: '',
      description: '',
      image: {
        name: null
      }
    },
    mediaGallery: false,
    uploadMode: false
  }),
  watch: {
    data (v) {
      if (v) {
        Object.assign(this.project, v)
        // this.project.image.name = v.image.name
      }
    }
  },
  mounted () {
    if (this.data) {
      Object.assign(this.project, this.data)
      // this.project.image.name = this.data.image.name
    }
  },
  methods: {
    onSelected (image) {
      this.project.image.name = image
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
      if (!this.project.image.name) { return false }
      return this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
      this.project.image.name = null
    }
  }
}
</script>

<style scoped>
.form {
  max-width: 650px;
}
</style>
