<template>
  <div>
    <div class="py-8 my-8 grey lighten-3">
      <!-- <touch class="right bottom white" /> -->
      <v-container class="mt-12">
        <v-card flat class="mx-auto transparent text-center">
          <h1>ABOUT ALGERIA ENGLISH MEETING</h1>
        </v-card>
      </v-container>
    </div>
    <div style="position: relative">
      <touch class="left bottom grey lighten-3" />
    </div>
    <div>
      <v-container>
        <v-card
          flat
          max-width="800"
          class="mt-12 py-12 px-8 mx-auto text-center"
        >
          <h2>What is AEM?</h2>
          <p>
            AEM is the abbreviation for Algeria English Meeting which is an
            organization based on regular meetings that offer a platform for the
            English community in Algeria to improve their language, meet new
            people & learn new vocabularies in a fun way.
          </p>
          <h2>How did we start?</h2>
          <p>
            We started our organization fundamentally by collaborating with
            Adana English night in Turkey but eventually, we’ve become
            independent & we launched our own projects and concepts: AEM coffee
            meetups, AEM hangouts, AEM Kids, Better circle and Alone e-meetups
          </p>
          <h2>What do we do?</h2>
          <p>
            We emphasize on giving our participants the space to practice their
            English through plenty of fun activities & competitions that allow
            them to enhance their level.
          </p>
          <h2>What is our goal?</h2>
          <p>
            We highly believe that our program & meetups can help people to
            upgrade their English level by allowing them to communicate & to
            overcome their fear of speaking in front of the public
          </p>
          <h2>Who can benefit?</h2>
          <p>
            Everybody is welcome to join us, we are here to help everyone who
            wants to improve their English language & their public speaking
            skills
          </p>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
import touch from '~/components/website/touch'
export default {
  components: {
    touch
  }
}
</script>
