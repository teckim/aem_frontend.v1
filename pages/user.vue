<template>
  <div>
    <nuxt-child />
  </div>
</template>
<script>
export default {
  layout: 'user',
  middleware: 'auth-redirect'
}
</script>
