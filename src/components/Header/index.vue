<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="NavBar" >
      <b-navbar-brand :to="{name: 'Home'}">
        <img
          src= "@/assets/imgs/logo1.svg"
          alt=""
          width="200px"
          height="75px"
        >
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="user">
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{user.displayName || user.email}}</em>
              </template>
              <!-- TODO: change url-->
              <b-dropdown-item :to="{name: 'verRegistros'}" disabled>Profile</b-dropdown-item>
              <b-dropdown-item href="#" @click="logOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <section v-else>
            <b-navbar-brand class="brand" @click="$router.push({name: 'Login'})">Sign In</b-navbar-brand>
            <b-navbar-brand class="brand" @click="$router.push({name: 'Register'})">Sign Up</b-navbar-brand>
          </section>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { auth } from 'firebase'
import { signOut } from '../../backend/controllers/AuthController'

export default {
  name: 'Header',
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    ...mapMutations('auth', ['SET_USER']),
    logOut () {
      signOut()
      this.$router.push({ name: 'Login' })
    }
  },
  created () {
    // eslint-disable-next-line
    auth().onAuthStateChanged(u => this.SET_USER(u))
  }
}
</script>

<style lang="scss" scoped>
  .NavBar {
    background: transparent;
    .brand {
      cursor: pointer;
    }
  }
</style>
