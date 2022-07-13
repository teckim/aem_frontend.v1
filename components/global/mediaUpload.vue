<template>
  <v-card>
    <v-row no-gutters align="center" class="pr-4">
      <div>
        <v-card-title>
          Upload media
        </v-card-title>
        <v-card-subtitle>
          upload images to gallery
        </v-card-subtitle>
      </div>
      <v-spacer />
      <v-btn
        depressed
        rounded
        dark
        small
        color="primary"
        @click="$emit('done')"
      >
        <v-icon left small>
          mdi-image-multiple-outline
        </v-icon>
        <span class="text-none">
          Gallery
        </span>
      </v-btn>
    </v-row>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12" :sm="selectedFile ? '8' : '12'">
          <v-toolbar v-show="selectedFile" height="36" flat>
            <v-spacer />
            <v-select
              v-show="!resultSrc"
              v-model="ratio"
              rounded
              dense
              :items="ratios"
              label="ratio"
              hide-details
              class="mr-2 float-left"
              style="max-width: 170px"
            />
            <v-btn
              v-show="!resultSrc"
              small
              depressed
              rounded
              color="primary"
              class="mr-2"
              @click="preview"
            >
              <span class="text-none">preview</span>
            </v-btn>

            <div v-show="resultSrc">
              <v-btn
                small
                depressed
                rounded
                color="primary"
                class="mr-2"
                @click="resultSrc = null"
              >
                <v-icon small left>
                  mdi-pencil
                </v-icon>
                <span class="text-none">edit</span>
              </v-btn>
            </div>
            <v-btn
              small
              icon
              color="success"
              class="mr-2"
              @click="selectedFile = null"
            >
              <v-icon>mdi-check-circle-outline</v-icon>
            </v-btn>
            <v-btn small icon color="error" @click="selectedFile = null">
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-toolbar>
          <v-responsive
            :min-height="!selectedFile ? 280 : 'auto'"
            :class="!selectedFile ? 'align-center' : ''"
          >
            <clipper-basic
              v-if="!resultSrc"
              ref="clipper"
              bg-color="transparent"
              class="mx-auto"
              :ratio="ratio"
              :style="`max-width:${width}px;`"
              :init-width="100"
              :init-height="100"
              :src="src"
            >
              <div slot="placeholder" class="text-center">
                <h3 v-show="!imgName" class="pb-4">
                  Please add an image for upload
                </h3>
                <div v-show="imgName" class="text-center py-5 px-1">
                  <check />
                  <h3 class="success--text pb-2">
                    Image uploaded successfully
                  </h3>
                </div>
                <v-btn
                  depressed
                  rounded
                  dark
                  color="primary"
                  :loading="isSelecting"
                  @click="selectFile"
                >
                  <v-icon left small>
                    mdi-plus
                  </v-icon>
                  <span class="text-none">Add picture</span>
                </v-btn>
                <v-btn
                  v-show="imgName"
                  depressed
                  rounded
                  dark
                  color="main"
                  @click="$emit('uploaded', imgName)"
                >
                  <v-icon left small>
                    mdi-chevron-right
                  </v-icon>
                  <span class="text-none">Continue</span>
                </v-btn>
              </div>
            </clipper-basic>
            <v-img
              v-else
              :aspect-ratio="ratio"
              contain
              :max-height="canvasHeight || 'auto'"
              :src="resultSrc || ''"
            />
          </v-responsive>
        </v-col>
        <v-col v-if="selectedFile" cols="12" sm="4">
          <div class="px-4 py-9 text-truncate">
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td v-text="selectedFile.name" />
                </tr>
                <tr>
                  <td>Type</td>
                  <td v-text="selectedFile.type.split('/')[1]" />
                </tr>
                <tr>
                  <td>Size</td>
                  <td v-text="formatBytes(selectedFile.size)" />
                </tr>
                <tr>
                  <td class="pr-8">
                    Dimention
                  </td>
                  <td v-text="width + 'x' + height" />
                </tr>
              </tbody>
            </table>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text rounded @click="$emit('cancel')">
        cancel
      </v-btn>
      <v-btn
        depressed
        rounded
        class="white--text"
        width="150"
        color="main"
        :loading="isUploading"
        :disabled="!!progress || !selectedFile"
        @click="uploadFile"
      >
        <v-icon left>
          mdi-cloud-upload-outline
        </v-icon> upload
      </v-btn>
    </v-card-actions>
    <v-alert
      class="upload-status mb-0"
      text
      dense
      color="main"
      :value="!!progress"
    >
      <v-row no-gutters align="center">
        <v-progress-circular :value="progress" />
        <div style="max-width:170px" class="pl-4 text-truncate body-2">
          uploading name.jpeg
        </div>
      </v-row>
    </v-alert>
    <input
      ref="uploader"
      class="d-none"
      type="file"
      accept="image/*"
      @input="onFileChanged"
    >
  </v-card>
</template>

<script>
import check from '~/components/global/check'
export default {
  components: {
    check
  },
  data: () => ({
    src: null,
    width: 500,
    height: null,
    ratio: 16 / 9,
    resultSrc: null,
    selectedFile: null,
    canvas: null,
    canvasHeight: null,
    isSelecting: false,
    isUploading: false,
    imgName: null,
    progress: 0,
    ratios: [
      { text: '16:9 Event', value: 16 / 9 },
      { text: '4:3 Project', value: 4 / 3 },
      { text: 'Manual', value: null }
    ]
  }),
  watch: {
    selectedFile (v) {
      if (v) {
        const vm = this
        const reader = new FileReader()
        reader.readAsDataURL(v)
        reader.onload = function (event) {
          const data = reader.result
          vm.src = data

          const _URL = window.URL || window.webkitURL
          const img = new Image()
          const objectUrl = _URL.createObjectURL(v)
          img.onload = function () {
            vm.width = this.width
            vm.height = this.height
            _URL.revokeObjectURL(objectUrl)
          }
          img.src = objectUrl
        }
      } else {
        this.resetUpload()
      }
    }
  },
  methods: {
    selectFile () {
      this.selectedFile = null
      this.imgName = null
      this.isSelecting = true
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false
        },
        { once: true }
      )

      this.$refs.uploader.click()
    },
    onFileChanged (e) {
      this.selectedFile = e.target.files[0]
    },
    preview () {
      // eslint-disable-next-line no-console
      this.canvasHeight = this.$refs.clipper.$el.clientHeight
      this.canvas = this.$refs.clipper.clip()
      this.resultSrc = this.canvas.toDataURL(this.selectedFile.type)
    },
    uploadFile () {
      this.isUploading = true
      // const canvas = this.$refs.clipper.clip()
      if (!this.canvas) { this.canvas = this.$refs.clipper.clip() }
      this.canvas.toBlob(
        (blob) => {
          const formData = new FormData()
          formData.append('image', blob)
          this.isUploading = false
          this.$axios
            .post('/images', formData, {
              onUploadProgress: (pEvent) => {
                this.progress = Math.round((pEvent.loaded * 100) / pEvent.total)
              }
            })
            .then(({ data }) => {
              this.progress = 0
              this.imgName = data.file.filename
              this.selectedFile = null
            })
            .catch((e) => {
              this.progress = 0
            })
        },
        this.selectedFile.type,
        1
      )
    },
    resetUpload () {
      this.src = null
      this.resultSrc = null
      try {
        this.$refs.uploader.value = ''
        if (this.$refs.uploader.value) {
          this.$refs.uploader.type = 'text'
          this.$refs.uploader.type = 'file'
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
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

<style scoped>
.upload-status {
  position: absolute;
  bottom: 5px;
  left: 5px;
}
</style>
