<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  layout: 'root',
  middleware: 'root-auth-redirect'
}
</script>
