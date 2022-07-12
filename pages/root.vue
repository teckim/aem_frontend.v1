<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  middleware: 'root-auth-redirect',
  layout: 'root'
}
</script>
