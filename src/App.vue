<template>
  <div id="app">
    <Loadlayout v-if="isLoading">
      <BaseLoading/>
    </Loadlayout>

    <MainLayout v-else/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loadlayout from './layouts/LoadLayout'
import MainLayout from './layouts/MainLayout'
import BaseLoading from '@/components/BaseLoading.vue'

export default {
  name: 'App',
  components: {
    MainLayout,
    Loadlayout,
    BaseLoading
  },
  computed: {
    ...mapState('loading', { isLoading: 'isLoading' })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
