<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'admin-auth-redirect'
}
</script>
