<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-btn
          depressed
          tile
          dark
          width="100%"
          height="100"
          color="main"
          to="/user/tickets"
        >
          <strong class="title">Tickets</strong>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="4" md="2">
        <v-btn
          depressed
          tile
          dark
          width="100%"
          height="100"
          color="primary"
          to="/user/profile/edit"
        >
          <strong class="title">Profile</strong>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
