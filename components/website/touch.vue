<template>
  <div class="touch" />
</template>

<script>
export default {}
</script>

<style>
.touch {
  position: absolute;
  width: 100%;
  left: 0;
  height: 100px;
}
.left {
  -ms-transform: skewY(-2deg); /* IE 9 */
  -webkit-transform: skewY(-2deg); /* Safari prior 9.0 */
  transform: skewY(-2deg);
}
.right {
  -ms-transform: skewY(2deg); /* IE 9 */
  -webkit-transform: skewY(2deg); /* Safari prior 9.0 */
  transform: skewY(2deg);
}
.top {
  top: -32px;
}
.bottom {
  bottom: -32px;
}
</style>
