<template>
  <div>
    <v-row justify="space-between" align="center" no-gutters>
      <div class="py-2">
        <div class="headline">
          Add members
        </div>
      </div>
      <!-- <v-btn rounded color="main white--text">
        <span class="pr-4">scan</span>
        <v-icon right>mdi-qrcode-scan</v-icon>
      </v-btn> -->
    </v-row>
    <v-row no-gutters>
      <v-card flat class="mt-8 mb-4" width="100%">
        <add-member
          @cancel="$router.push('/dashboard/members/manage')"
          @refresh="$router.push('/dashboard/members/manage')"
        />
      </v-card>
    </v-row>
  </div>
</template>

<script>
import addMember from '~/components/dashboard/addMember'
export default {
  components: {
    addMember
  }
}
</script>

<style></style>
