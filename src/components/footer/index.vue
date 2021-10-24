<template>
  <div class="footer">
    <div class="footer__info">
      © 2020 CAPTAIN QUACK<br>
      Десница тысячелетия и моллюск! </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss">
@import "../../assets/index.scss";
@import "../../assets/global.scss";

.footer {
  background: $black;
  min-height: 102px;
  display: flex;
  flex-direction: revert;
  justify-content: center;
  color: white;

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
}

</style>