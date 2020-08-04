<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  middleware: 'admin-auth-redirect',
  layout: 'dashboard'
}
</script>
