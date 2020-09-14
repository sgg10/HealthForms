<template>
  <div>
    <b-form @submit.prevent="register">
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
          <b-button type="submit" class="button">Sign In</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div @click="forgot" class="forgot" style="cursor: pointer;">
              <strong>¿Olvidaste tu contraseña?</strong>
          </div>
        </b-col>
      </b-row>
      <SocialMediaAuth />
    </b-form>
  </div>
</template>

<script>
import { signInEmail, changePass } from '@/backend/controllers/AuthController'
import { showToast } from '@/utils'
import SocialMediaAuth from '@/components/SocialMediaAuth'
import { mapGetters } from 'vuex'

export default {
  name: 'formRegister',
  components: { SocialMediaAuth },
  data () {
    return {
      email: '',
      pass: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    async signInEmail () {
      try {
        await signInEmail(this.email, this.pass)
        this.$router.push({ name: 'Home' })
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
      }
    },
    forgot () {
      this.email
        ? changePass(this.email).then(() => showToast(this.$bvToast, 'Tarea completa', 'Hemos enviado un correo para cambiar la contraseña', 'success'))
        : showToast(this.$bvToast, 'Advertencia', 'Ingresa tu email en el campo correspondiente', 'warning')
    }
  },
  created () {
    // eslint-disable-next-line no-unused-expressions
    this.user ? this.$router.push({ name: 'Home' }) : null
  }
}
</script>
