<template>
  <v-card flat class="mx-2">
    <div v-show="!!image" class="text-center">
      <v-btn depressed dark width="150" color="main" @click="showMediaGallery">
        <v-icon left>
          mdi-image-multiple-outline
        </v-icon> change
      </v-btn>
      <v-btn text dark width="150" color="primary" @click="showMediaUpload">
        <v-icon left>
          mdi-cloud-upload-outline
        </v-icon> upload
      </v-btn>
    </div>
    <v-row>
      <v-col v-if="!!image" class="text-center">
        <v-img
          contain
          max-width="500"
          class="mx-auto"
          :src="$axios.defaults.baseURL + '/images/' + image"
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
    <div v-show="!!image">
      <v-btn v-show="edit" depressed dark color="main" @click="update">
        <span>preview</span>
      </v-btn>
      <v-btn v-show="updateMode" text @click="$emit('cancel')">
        <span>cancel</span>
      </v-btn>
      <v-btn
        v-show="!updateMode"
        depressed
        :text="edit"
        dark
        color="main"
        @click="submit"
      >
        <span>next</span>
        <v-icon right>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </div>
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
  </v-card>
</template>

<script>
import mediaGallery from '~/components/global/mediaGallery'
export default {
  components: {
    mediaGallery
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    updateMode: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    mediaGallery: false,
    uploadMode: false,
    image: null
  }),
  watch: {
    data (v) {
      if (v.image) {
        this.image = v.image.name
      }
    }
  },
  mounted () {
    if (this.data) {
      this.image = this.data.image.name
    }
  },
  methods: {
    onSelected (image) {
      this.image = image
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
    submit () {
      if (this.validate()) {
        const data = {
          image: { name: this.image }
        }
        this.$emit('submit', data)
      }
    },
    update () {
      if (this.validate()) {
        const data = {
          image: { name: this.image }
        }
        this.$emit('update', data)
      }
    },
    validate () {
      return !!this.image
    }
  }
}
</script>

<style></style>
