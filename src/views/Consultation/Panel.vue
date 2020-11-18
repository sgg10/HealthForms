<template>
  <div>
    <b-container class="text-left w-100" fluid >
      <b-form @submit.prevent="buscar" class="form_search mt-4">
        <b-row>
          <b-col>
            <b-form-group label="Id:" label-for="txtCedula">
              <b-form-input v-model="cedula" class="w-100 mr-3" id="txtCedula" list="listSku" type="text" required placeholder="Ingrese la cedula"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-button type="submit" size="lg" class="bg-success mt-4"><b-icon-check-circle></b-icon-check-circle> Continuar</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>

    <div>
      <b-tabs content-class="mt-3" class="mt-2" v-if="visible">
        <b-tab title="History" active><Record :recibe="datosHistoria"/></b-tab>
        <b-tab title="Procedures"><Procedures :procedimientos="procedimientos" :autorizaFotos="datosHistoria.autorizaciones.fotos" /></b-tab>
        <b-tab title="Covid-19 Control"><CovidControl :registros="control" /></b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import Record from '../Records/Record'
import CovidControl from './CovidControl'
import Procedures from './Procedures'
import { getAll } from '../../backend/controllers/FirestoreController'
import { getUser } from '../../backend/controllers/AuthController'
import { showToast } from '../../utils'
export default {
  name: 'Panel',
  components: { Record, CovidControl, Procedures },
  data () {
    return {
      cedula: '',
      datosHistoria: {},
      procedimientos: [],
      control: [],
      visible: false
    }
  },
  methods: {
    async buscar () {
      this.datosHistoria = {}
      this.procedimientos = []
      this.control = []
      const historia = await getAll('Records').where('cedula', '==', this.cedula).where('company', '==', getUser().uid).get()
      if (!historia.empty) {
        this.visible = true
        this.datosHistoria = historia.docs[0].data()
        this.datosHistoria.ID = historia.docs[0].id
        this.datosHistoria.consulta = true
        getAll('Procedure').where('cc', '==', this.cedula).orderBy('fecha', 'desc').onSnapshot(async querySnapShot => {
          if (!querySnapShot.empty) {
            this.procedimientos = []
            querySnapShot.forEach(procedimiento => this.procedimientos.push({ ...procedimiento.data(), id: procedimiento.id }))
            const control = await getAll('Covid_Control').where('cedula', '==', this.cedula).get()
            if (!control.empty) {
              this.control = []
              control.docs.forEach(element => this.control.push({ ...element.data(), id: element.id }))
            }
          }
        })
      } else {
        showToast(this.$bvToast, 'Alert ', ' Customer not found', 'warning')
      }
    }
  }
}
</script>

<style >
  h1, .form_search{
    color: white;
  }
</style>
