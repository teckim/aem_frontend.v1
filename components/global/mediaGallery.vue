<template>
  <div class="white">
    <v-slide-x-transition hide-on-leave>
      <div v-if="showGallery" key="1">
        <v-card>
          <v-row no-gutters align="center" class="pr-4">
            <div>
              <v-card-title>
                Media gallery
              </v-card-title>
              <v-card-subtitle
                v-text="!images ? 'No image' : `${images.length} Images`"
              />
            </div>
            <v-spacer />
            <v-btn
              depressed
              rounded
              dark
              small
              color="primary"
              :icon="!$vuetify.breakpoint.smAndUp"
              @click="showGallery = false"
            >
              <v-icon
                :left="$vuetify.breakpoint.smAndUp"
                small
              >
                mdi-plus
              </v-icon>
              <span v-show="$vuetify.breakpoint.smAndUp" class="text-none">
                Add Media
              </span>
            </v-btn>
          </v-row>
          <v-card-text>
            <!-- <v-system-bar lights-out>
              1 image selected
            </v-system-bar> -->
            <v-responsive
              min-height="360"
              :class="images ? '' : 'align-center'"
            >
              <v-row
                v-show="images"
                dense
                no-gutters
                class="flex-column-reverse flex-md-row"
              >
                <v-col>
                  <v-responsive
                    class="overflow-y-auto px-2"
                    :max-height="$vuetify.breakpoint.mdAndUp ? 360 : 260"
                  >
                    <v-row dense justify="space-between">
                      <v-col
                        v-for="(image, i) in images"
                        :key="i"
                        cols="auto"
                        class="py-0 pb-2"
                      >
                        <v-card
                          max-width="80"
                          min-width="80"
                          flat
                          hover
                          @click="selectedImage = image"
                        >
                          <v-img
                            :src="
                              $axios.defaults.baseURL +
                                '/images/' +
                                image +
                                '?w=80'
                            "
                            class="white--text grey lighten-3 align-end"
                            :aspect-ratio="1"
                          >
                            <!-- <v-card-title v-text="card.title"></v-card-title> -->
                          </v-img>
                          <!-- <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn x-small icon>
                            <v-icon x-small>mdi-heart</v-icon>
                          </v-btn>

                          <v-btn x-small icon>
                            <v-icon x-small>mdi-bookmark</v-icon>
                          </v-btn>
                          <v-btn x-small icon>
                            <v-icon x-small>mdi-share-variant</v-icon>
                          </v-btn>
                        </v-card-actions> -->
                        </v-card>
                      </v-col>
                      <v-col
                        v-for="i in 20"
                        :key="i + images.length"
                        cols="auto"
                        class="py-0 pb-2"
                      >
                        <v-card max-width="80" min-width="80" flat />
                      </v-col>
                    </v-row>
                  </v-responsive>
                </v-col>
                <div class="px-4 pb-4">
                  <v-row class="flex-row flex-md-column">
                    <v-img
                      :src="
                        $axios.defaults.baseURL +
                          '/images/' +
                          selectedImage +
                          '?w=300'
                      "
                      min-width="300"
                      max-width="300"
                      min-height="175"
                      class="grey lighten-3 text-center align-center"
                    >
                      <div v-show="!selectedImage">
                        <v-icon size="80" class="text--disabled">
                          mdi-camera-outline
                        </v-icon>
                        <h4>Please select an image</h4>
                      </div>
                      <!-- gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" -->
                      <!-- <v-card-title v-text="card.title"></v-card-title> -->
                    </v-img>

                    <v-responsive
                      class="px-1 py-4 text-truncate"
                      :max-width="$vuetify.breakpoint.mdAndUp ? '300' : 'auto'"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <td>Name</td>
                            <td v-text="selectedImage || '...'" />
                          </tr>
                          <tr>
                            <td>Type</td>
                            <td v-text="selectedImageInfo.ext || '...'" />
                          </tr>
                          <tr>
                            <td>Size</td>
                            <td v-text="selectedImageInfo.size || '...'" />
                          </tr>
                          <tr>
                            <td class="pr-8">
                              Dimention
                            </td>
                            <td
                              v-text="selectedImageInfo.dimensions || '...'"
                            />
                          </tr>
                          <tr>
                            <td class="pr-8">
                              Link
                            </td>
                            <td
                              v-show="!selectedImageInfo.url"
                              v-text="'...'"
                            />
                            <td v-show="selectedImageInfo.url">
                              <a
                                :href="selectedImageInfo.url"
                                target="_blank"
                                v-text="selectedImageInfo.url"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td class="pr-8">
                              Created on
                            </td>
                            <td v-text="selectedImageInfo.createdOn" />
                          </tr>
                        </tbody>
                      </table>
                    </v-responsive>
                  </v-row>
                  <!-- <h5>{{ selectedImage || 'select an image' }}</h5> -->
                </div>
                <!-- <v-col cols="12" sm="5"> </v-col> -->
              </v-row>

              <div v-show="!images" class="text-center">
                <h3>No image to show, try to add some</h3>
              </div>
            </v-responsive>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text rounded @click="$emit('cancel')">
              cancel
            </v-btn>
            <v-btn
              depressed
              rounded
              width="150"
              color="main"
              class="white--text"
              :disabled="!selectedImage"
              @click="$emit('selected', selectedImage)"
            >
              <v-icon left>
                mdi-check
              </v-icon> done
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-else key="2">
        <media-upload
          @done="
            showGallery = true
            getImages
          "
          @uploaded="uploaded"
          @cancel="$emit('cancel')"
        />
      </div>
    </v-slide-x-transition>
  </div>
</template>

<script>
import moment from 'moment'
import mediaUpload from '~/components/global/mediaUpload'
export default {
  components: {
    mediaUpload
  },
  props: {
    uploadMode: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    images: [],
    showGallery: true,
    selectedImage: null,
    selectedImageInfo: {}
  }),
  watch: {
    selectedImage (v) {
      if (v) {
        this.selectedImage = v
        this.getImageInfo(v)
      }
    }
  },
  mounted () {
    this.getImages()
    this.showGallery = !this.uploadMode
  },
  methods: {
    uploaded (name) {
      // this.showGallery = true
      this.$emit('selected', name)
      // this.selectedImage = name
      // this.getImages()
    },
    // selectImage(name) {
    //   // eslint-disable-next-line no-console
    //   console.log(name)
    //   this.selectedImage = name
    //   this.getImageInfo(name)
    // },
    getImages () {
      this.$axios.get('/images').then(({ data }) => {
        this.images = data
        if (data) { this.selectedImage = data[0] }
      })
    },
    async getImageInfo (name) {
      const vm = this
      const url = this.$axios.defaults.baseURL + '/images/' + name
      const res = await this.$axios.get(`/images/info/${name}`)
      const info = {
        ext: name.split('.').pop(),
        url,
        size: this.formatBytes(res.data.size),
        createdOn: moment(new Date(res.data.createdOn)).format(
          'MMM D, YYYY, HH:MM'
        )
      }
      const img = new Image()
      img.onload = function () {
        info.dimensions = this.width + 'x' + this.height
        vm.selectedImageInfo = info
      }
      img.src = url
    },
    formatBytes (bytes, decimals = 2) {
      if (bytes === 0) { return '0 Bytes' }

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / k ** i).toFixed(dm)) + ' ' + sizes[i]
    }
  }
}
</script>

<style scoped></style>
