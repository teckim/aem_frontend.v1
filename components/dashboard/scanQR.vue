<template>
  <v-card min-height="512px">
    <v-card-actions>
      <v-row justify="space-between" class="px-5">
        <v-checkbox
          v-model="continuously"
          dense
          hide-details
          class="my-0"
          :label="!continuously ? 'Scan continuously' : 'Freez when not in use'"
        />
        <v-btn depressed small icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
    </v-card-actions>
    <v-row class="qrreader-container">
      <!-- <img :src="require('@/assets/images/icons/qrcontainer.png')" alt=""> -->
      <!-- <v-overlay absolute :value="true" :opacity="0" :z-index="1">
          </v-overlay>-->
      <v-slide-x-transition hide-on-leave>
        <v-card
          v-if="!!order"
          flat
          tile
          width="100%"
          color="grey lighten-4"
          style="position: absolute; z-index: 1; bottom: 0"
        >
          <v-row no-gutters align="center" justify="space-between">
            <div class="pa-4">
              <div class="headline">
                <span v-if="order.user">
                  {{ order.user.first + ' ' + order.user.last }}
                </span>
                <span v-else>User deleted</span>
                <span
                  class="main--text"
                  v-text="order.table ? 'Table ' + order.table : ''"
                />
              </div>
              <div v-show="paidEvent" class="subtitle">
                paid {{ order.paid || 0 }}
                <span class="overline">{{ currency }}</span>
              </div>
              <div class="warning--text body-2">
                {{ order.note }}
              </div>
            </div>
            <!-- <div class="user-action">
              <v-btn
                v-if="order.checkedIn"
                depressed
                tile
                dark
                height="100%"
                color="grey"
                @click="$emit('checkout', order._id)"
              >
                check out
              </v-btn>
              <v-btn
                v-else
                depressed
                tile
                height="100%"
                color="success"
                @click="$emit('checkin', order._id)"
              >
                check in
              </v-btn>
            </div> -->
          </v-row>
        </v-card>
      </v-slide-x-transition>
      <qrcode-stream
        v-if="!loading && open && !freezed"
        class="qrcode"
        :camera="camera"
        @decode="onDecode"
      >
        <v-alert v-show="!!error" tile type="error" :value="true">
          {{ error }}
        </v-alert>
      </qrcode-stream>
      <!-- <div class="qrcode"></div> -->
      <div>
        <div v-show="!loading && open && !freezed" class="qr-frame red" />
      </div>
      <v-overlay :absolute="true" :value="loading">
        <v-progress-circular indeterminate size="64" />
      </v-overlay>
      <div v-show="freezed && !loading" class="qr-overlay" @click="freez">
        <span>Please tap to continue scaning</span>
      </div>
    </v-row>
  </v-card>
</template>

<script>
const Qr = process.client ? require('vue-qrcode-reader') : null
export default {
  components: {
    QrcodeStream: Qr && Qr.QrcodeStream
  },
  props: {
    open: {
      type: Boolean
    },
    order: {
      type: Object,
      default: null
    },
    paidEvent: {
      type: Boolean
    },
    error: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    scannedString: '',
    freezed: false,
    loading: false,
    freezTimeout: null,
    continuously: false,
    camera: 'auto'
  }),
  computed: {
    currency () {
      return this.$auth.user.office.currency || ''
    }
  },
  watch: {
    open (v) {
      this.freez()
    },
    continuously (v) {
      if (v) { this.freezed = false } else { this.freezed = true }
    }
  },
  mounted () {
    this.freez()
  },
  methods: {
    freez () {
      if (!this.continuously) {
        if (this.freezTimeout) { clearTimeout(this.freezTimeout) }
        this.freezed = false
        this.freezTimeout = setTimeout(() => (this.freezed = true), 10000)
      }
    },
    onDecode (string) {
      this.freez()
      this.showUser = true
      this.$emit('decoded', string)
      // if (!string.length) return null
      // if (string !== this.scannedString) {
      //   this.qrLoading = true
      //   this.checkInOrder(string)
      //   this.scannedString = string
      // }
      // this.freez = false
    },
    checkOut (id) {
      this.$emit('checkout', id)
    }
  }
}
</script>

<style scoped>
.qrreader-container {
  position: relative;
}
.qr-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000080;
  cursor: pointer;
}
.qrreader-container {
  position: absolute;
  height: calc(100% - 44px);
  z-index: 1;
  margin: auto;
  left: 0;
  right: 0;
}
.qr-frame {
  height: 2px;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  animation: upDown 2s linear infinite;
}
.qrreader-container .qrcode {
  overflow: hidden;
}
@keyframes upDown {
  0%,
  100% {
    bottom: 99%;
  }
  50% {
    bottom: 0;
  }
}
.user-action {
  height: 100%;
  position: absolute;
  right: 0;
}
</style>
