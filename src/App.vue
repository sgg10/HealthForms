<template>
  <div id="app">
    <Loadlayout v-if="isLoading">
      <BaseLoading/>
    </Loadlayout>

    <b-container fluid v-else>
      <MainLayout />
    </b-container>
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
  color: #e9eef3;
  background-color: #15202b;
}
</style>
