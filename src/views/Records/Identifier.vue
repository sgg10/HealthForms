<template>
  <div>
    <b-container class="text-left w-100" fluid v-if="!his&&!pro">
      <b-form @submit.prevent="verificar" class="form_identify mt-4">
        <b-row>
          <b-col>
              <b-form-group label="Cedula:" label-for="txtSKU">
                  <b-form-input v-model="cedula" class="w-100 mr-3" id="txtSKU" list="listSku" type="text" required placeholder="Ingrese la cedula"></b-form-input>
              </b-form-group>
          </b-col>
          <b-col>
              <b-button type="submit" size="lg" class="bg-success mt-4"><b-icon-check-circle></b-icon-check-circle> Continuar</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
    <h1 v-if="his" >Historias</h1>
    <Historia v-if="his" :actualiza="actualiza" :recibe="datosHistoria" @datos="recibeDatosHistoria=$event" @continua="pro = $event;his=false"/>
    <h1 v-if="pro && !actualiza">Procedimiento</h1>
    <Procedimiento v-if="pro" :cedula="datosHistoria.cedula" :autorizaFotos="recibeDatosHistoria.autorizaciones.fotos"/>

  </div>
</template>

<script>
import Historia from './Record'
import Procedimiento from './Procedure'
import { getAll } from '../../backend/controllers/FirestoreController'

export default {
  components: { Historia, Procedimiento },
  props: ['actualiza'],
  data () {
    return {
      cedula: '',
      pro: false,
      his: false,
      nueva: false,
      datosHistoria: {},
      recibeDatosHistoria: {}
    }
  },
  methods: {
    verificar () {
      getAll('Records').where('cedula', '==', this.cedula).get().then(result => {
        if (!result.empty) {
          this.datosHistoria = result.docs[0].data()
          this.datosHistoria.ID = result.docs[0].id
          this.datosHistoria.nuevo = false
        } else {
          this.datosHistoria.cedula = this.cedula
          this.datosHistoria.nuevo = true
        }
        this.his = true
      })
    }
  }
}
</script>

<style >
    h1, .form_identify{
        color: white;
    }

</style>
