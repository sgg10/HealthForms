<template>
  <div>
    <hr>
    <b-row class="mb-3">
      <b-col>
        <h5>Or sign in whit</h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-img @click="signInGoogle" style="cursor: pointer;" class="loginButton" src="https://img.icons8.com/color/48/000000/google-logo.png" width="50" height="50" rounded="circle" alt="Circle image"></b-img>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { signInGoogle } from '../backend/controllers/AuthController'
import { showToast } from '../utils'

export default {
  name: 'SocialMediaAuth',
  methods: {
    async signInGoogle () {
      try {
        await signInGoogle()
        this.$router.push({ name: 'Home' })
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
      }
    }
  }
}
</script>
