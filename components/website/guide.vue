<template>
  <div>
    <v-timeline>
      <v-timeline-item v-for="(item, i) in items" :key="i" color="minor" small>
        <template #opposite>
          <span class="title" v-text="i + 1 + '. ' + item.title" /><br>
          <span class="subtitle text-secondary" v-text="item.subtitle" />
        </template>
        <div class="pa-4 d-flex justify-center">
          <v-card elevation="8" class="d-inline-flex">
            <v-img :src="item.img" />
          </v-card>
          <!-- <h2 :class="`title font-weight-light mb-4 ${item.img}--text`">
          Lorem ipsum
        </h2>
        <div>
          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
          imperdiet nec ut, sed euismod convenire principes at. Est et nobis
          iisque percipit, an vim zril disputando voluptatibus, vix an salutandi
          sententiae.
        </div> -->
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: 'Sign up',
        subtitle: 'Login into your account or create a new one.',
        img: require('~/assets/images/signup.jpg')
      },
      {
        title: 'Email confirmation',
        subtitle:
          'IMPORTANT!, Check your email inbox/spam to confirm your account.',
        img: require('~/assets/images/confirmation.jpg')
      },
      {
        title: 'Choose an event',
        subtitle: 'Browse our events and choose what interests you.',
        img: require('~/assets/images/browse-events.jpg')
      },
      {
        title: 'Get a ticket',
        subtitle:
          'The ticket assures your place in the event, so make sure to have one.',
        img: require('~/assets/images/get-ticket.jpg')
      },
      {
        title: 'Follow your team',
        subtitle:
          'Optional, When you follow a team you will be notified by their latest events as soon as published.',
        img: require('~/assets/images/follow-office.jpg')
      },
      {
        title: 'Enjoy',
        subtitle: "That's it, You are ready to join us.",
        img: require('~/assets/images/enjoy.jpg')
      }
    ]
  })
}
</script>

<style scoped></style>
