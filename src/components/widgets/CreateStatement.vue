<template>
  <div>
    <b-form>
      <b-form-group label="Statements">
        <vue-editor class="editor" v-model="statements"></vue-editor>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { create, getAll, update } from '../../backend/controllers/FirestoreController'
import { mapGetters, mapMutations } from 'vuex'
import { showToast } from '../../utils'

export default {
  name: 'CreateStatement',
  components: { VueEditor },
  data () {
    return {
      statements: '',
      exists: false,
      idStatement: null
    }
  },
  methods: {
    ...mapMutations('loading', ['SET_LOADING']),
    async insert () {
      try {
        this.SET_LOADING(true)
        if (this.exists) {
          await create('Statement', { uid: this.user.uid, statements: this.statements })
        } else {
          await update('Statement', this.idStatement, { statements: this.statements })
        }
        showToast(this.$bvToast, 'Complete', 'The statements were set correctly', 'success')
      } catch (error) {
        // TODO: Use setError to show any error
        console.log('Error')
      } finally {
        this.SET_LOADING(false)
      }
    }
  },
  computed: {
    ...mapGetters('loading', ['isLoading']),
    ...mapGetters('auth', ['user'])
  },
  async created () {
    try {
      this.SET_LOADING(true)
      const result = await getAll('Statement').where('uid', '==', this.user.uid).get()
      if (result.docs) {
        this.statements = result.docs[0].data().statements
        this.idStatement = result.docs[0].id
        this.exists = true
      }
    } catch (error) {
      // TODO: Use setError to show any error
      console.log('Error')
    } finally {
      this.SET_LOADING(false)
    }
  }
}
</script>
