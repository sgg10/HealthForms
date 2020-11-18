<template>
  <div>
    <section>
      <b-container class="control_container text-left mt-2" fluid>
        <b-form @submit.prevent="continuar">
          <section class="mt-4">
            <h3>Control of Covid-19 for exit</h3>
            <b-row>
              <b-col>
                <b-form-group label="ID:" label-for="txtCC">
                  <b-form-input id="txtCC" type="number" required placeholder="ID" v-model="control_covid.cedula"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Temperature: ">
                  <b-form-input id="txtTemperatura" type="number" required placeholder="Degrees" v-model="control_covid.temeperatura"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </section>

          <b-row>
            <b-col>
              <b-button type="submit" class="bg-success my-3" size="lg" block>Register</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-container>
    </section>
  </div>
</template>

<script>
import { create } from '../../backend/controllers/FirestoreController'
export default {
  name: 'CovidControl',
  data () {
    return {
      control_covid: {
        tos_seca: '-',
        cansancio_agotamiento: '-',
        dolor_garganta: '-',
        dificultad_respiratoria: '-',
        dolor_cabeza: '-',
        familiares_con_covid: '-',
        contacto_con_contagiados: '-',
        viajo: '-',
        contsacto_con_viajeros: '-',
        temeperatura: '',
        tipo: 'Salida',
        fecha: '',
        cedula: ''
      }
    }
  },
  methods: {
    async continuar () {
      const moment = require('moment')
      const fecha = new Date()
      this.control_covid.fecha = moment(fecha).format('MM/DD/YYYY')
      await create('Covid_Control', this.control_covid)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>
  .control_container{
    color: white;
  }
</style>
