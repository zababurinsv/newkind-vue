<template>
  <div class="main">
    <card/>
    <list :items="dataCars"/>
  </div>
</template>

<script>
import store from "@/store"
import Card from "./_card"
import List from "./_list"

export default {
  name:'Index',
  components: { Card, List },
  setup() {
    store.dispatch("fetchCurrentData");
    return {}
  },
  computed: {
    dataCars() {
      return this.$store.state.currentData
    }
  }
}
</script>