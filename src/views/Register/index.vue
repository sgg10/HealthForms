<template>
  <div>
    <FormAuthLayout>
      <h2>Register</h2>
      <FormRegister/>
    </FormAuthLayout>
  </div>
</template>

<script>
import FormAuthLayout from '../../layouts/FormAuthLayout'
import FormRegister from './Form'

export default {
  name: 'Register',
  components: { FormAuthLayout, FormRegister }
}
</script>
