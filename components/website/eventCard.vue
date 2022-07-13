<template>
  <v-card
    flat
    outlined
    class="mx-auto event-card"
    max-width="280"
    height="100%"
    :to="`events/${item._id}`"
  >
    <v-img
      :aspect-ratio="16 / 9"
      class="white--text grey lighten-3"
      :src="$axios.defaults.baseURL + '/images/' + item.image.name + '?w=150'"
      :lazy-src="require('@/assets/images/placeholder.png')"
    >
      <v-card-title class="pa-0">
        <div style="width: 100%">
          <div class="office">
            <div class="body-2">
              {{ item.office.name + ' Team' }}
            </div>
            <div class="overline">
              {{ item.office.province + ' - ' + item.office.country }}
            </div>
          </div>
        </div>
      </v-card-title>
      <!-- <v-card-title class="align-end fill-height">
                <span v-text="event.subject"></span>
                </v-card-title>-->
    </v-img>
    <div>
      <v-card-title>
        <div>
          <div class="main--text body-1 font-weight-bold" v-text="date" />
          <div v-text="item.subject" />
        </div>
      </v-card-title>
      <!-- <v-card-text>
        <div class="text-truncate pt-4">
          <span
            height="70"
            class="black--text"
            style="font-size: 18px"
            v-text="item.project.title"
          ></span>
        </div>
        <div
          class="text-truncate body-2"
          v-text="`${item.location.name} - ${item.location.address}`"
        ></div>
      </v-card-text> -->
    </div>
    <!-- :style="{ 'background-image': 'url(' + require('@/assets/images/icons/bookmark.png') + ')' }" -->
    <div class="event-mark font-weight-black">
      <span v-if="item.price">
        <span
          v-text="item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
        />
        <span class="overline" v-text="item.office.currency" />
      </span>
      <span v-else>Free</span>
      <!-- <span class="font-weight-black">Free</span> -->
    </div>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
    date () {
      if (!this.item) { return null }
      return moment(this.item.startsOn).format('ddd, MMM D, HH:mm')
    }
  }
}
</script>

<style scoped>
.event-card {
  transition: all 200ms;
}
.event-card:hover {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  position: relative;
}
.event-mark {
  position: absolute;
  display: none;
  top: 138px;
  right: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  padding: 5px 25px;
  border-radius: 28px !important;
}
.event-card:hover .event-mark {
  display: block;
}
.office {
  width: 100%;
  background: rgba(238, 138, 93, 0.9);
  height: 0px;
  position: relative;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  overflow: hidden;
  padding: 0 16px;
}
.event-card:hover .office {
  height: auto;
  padding: 12px 16px;
}
.search-box {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
