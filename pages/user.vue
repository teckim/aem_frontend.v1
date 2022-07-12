<template>
  <div>
    <nuxt-child />
  </div>
</template>
<script>
export default {
  middleware: 'auth-redirect',
  layout: 'user'
}
</script>
