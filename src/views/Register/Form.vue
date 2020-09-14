<template>
  <div>
    <b-form @submit.prevent="register">
      <b-row>
        <b-col>
          <b-form-group label="Name:" label-for="txtName">
            <b-form-input type="text" placeholder="Name" class="input" id="txtName" required v-model="name"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Email:" label-for="txtEmail">
            <b-form-input type="email" placeholder="Email" class="input" id="txtEmail" required v-model="email"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Password:" label-for="password">
            <b-form-input placeholder="Password" class="input" type="password" id="password" required v-model="pass"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Confirmar password:" label-for="password2">
            <b-form-input placeholder="Password" class="input" type="password" id="password2" required v-model="pass2"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button type="submit" class="button">Register</b-button>
        </b-col>
      </b-row>
      <SocialMediaAuth />
    </b-form>
  </div>
</template>

<script>
import { createCompany } from '@/backend/controllers/AuthController'
import { showToast } from '@/utils'
import SocialMediaAuth from '@/components/SocialMediaAuth'
import { mapGetters } from 'vuex'

export default {
  name: 'formRegister',
  components: { SocialMediaAuth },
  data () {
    return {
      email: '',
      pass: '',
      pass2: '',
      name: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    async register () {
      try {
        this.pass === this.pass2
          ? await createCompany(this.email, this.pass, this.name, this.$router)
          : showToast(this.$bvToast, 'Error', 'Passwords must be the same', 'danger')
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
      }
    }
  },
  created () {
    // eslint-disable-next-line no-unused-expressions
    this.user ? this.$router.push({ path: '/' }) : null
  }
}
</script>
