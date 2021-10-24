<template>
  <div class="header">
    <div class="header__image"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    notes() {
      return this.$store.state.notes
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/index.scss";
@import "../../assets/global.scss";

.header {
  background: $black;
  height: 102px;
  display: flex;
  flex-direction: revert;
  justify-content: center;

  &__image {
    height: 104px;
    width: 494px;
    background: url('../../assets/img/duck _desktop.png') no-repeat 100%;
    background-size: 100%;

    @include respond-to(phone) {
      width: 300px;
      height: 63px;
    }
  }
}

</style>