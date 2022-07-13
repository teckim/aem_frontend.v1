<template>
  <div>
    <!-- <v-btn color="success" @click="$refs.slider.prev()">text</v-btn> -->
    <v-row
      v-show="(items || []).length > 1"
      no-gutters
      justify="center"
      align="center"
    >
      <v-btn
        depressed
        text
        tile
        x-large
        @click="$refs.slider.prev()"
      >
        <v-icon color="grey">
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <span class="px-4" v-text="index + 1" />
      <v-btn
        depressed
        text
        tile
        x-large
        @click="$refs.slider.next()"
      >
        <v-icon color="grey">
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-row>
    <v-carousel
      v-if="(items || []).length"
      ref="slider"
      v-model="index"
      height="auto"
      hide-delimiters
      :show-arrows="false"
    >
      <v-carousel-item v-for="(item, i) in items" :key="i">
        <v-sheet light class="py-4" height="100%">
          <div class="mx-4">
            <ticket
              class="mx-auto"
              :index="i"
              :item="item"
              :user="$auth.user"
              @cancel="(i) => $emit('cancel', i)"
            />
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-card
      v-else-if="loading"
      raised
      max-width="350"
      min-height="450"
      class="mx-auto rounded"
      light
    >
      <v-row class="py-8 " justify="center" no-gutters>
        <div>
          <v-skeleton-loader
            width="150"
            height="150"
            tile
            type="image"
          />
        </div>
      </v-row>
      <div>
        <v-skeleton-loader
          type="list-item-two-line"
          max-height="50"
          max-width="270"
        />
        <v-skeleton-loader
          type="list-item-two-line"
          max-height="50"
          max-width="140"
        />
        <v-skeleton-loader
          type="list-item-two-line"
          max-height="50"
          max-width="270"
        />
        <v-skeleton-loader
          type="list-item-two-line"
          max-height="50"
          max-width="120"
        />
      </div>
    </v-card>
    <v-card v-else tile flat min-height="200" width="100%">
      <v-row class="fill-height text-center flex-column" justify="center">
        <div class="mb-4">
          <v-icon size="80">
            mdi-emoticon-sad-outline
          </v-icon>
        </div>
        <div>
          It seems that you dont have any ticket yet <br>
          check <nuxt-link to="/events">
            events
          </nuxt-link> to get a ticket
        </div>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import ticket from '~/components/user/ticket'
export default {
  components: {
    ticket
  },
  props: {
    items: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    index: 0
  })
}
</script>

<style scoped>
.rounded {
  border-radius: 25px !important;
}
</style>
