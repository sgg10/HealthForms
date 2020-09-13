<template>
  <div>
    <Header/>

    <div class="container">
      <router-view />
    </div>

    <FooterBar/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import FooterBar from '@/components/Footer'
export default {
  name: 'MainLayout',
  components: {
    Header,
    FooterBar
  }
}
</script>
