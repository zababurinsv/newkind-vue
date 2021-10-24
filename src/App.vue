<template>
  <Header/>
    <router-view/>
  <Footer/>
</template>
<script>
import Header from "@/components/header/index.vue"
import Footer from "@/components/footer/index.vue"
export default {
  name: "App",
  components: { Header, Footer },
}
</script>
<style lang="scss">
  @import "/assets/global.scss";
</style>