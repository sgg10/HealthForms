<template>
  <div>
    <FormAuthLayout>
      <h2>Login</h2>
      <FormLogin/>
    </FormAuthLayout>
  </div>
</template>

<script>
import FormAuthLayout from '../../layouts/FormAuthLayout'
import FormLogin from './Form'

export default {
  name: 'Register',
  components: { FormAuthLayout, FormLogin }
}
</script>
