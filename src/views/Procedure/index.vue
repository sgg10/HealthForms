<template>
  <div>
    <h1 style="color: white;">Procedimiento</h1>
    <section>
      <b-container class="procedimiento_container text-left my-3" fluid>
        <b-form @submit.prevent="crear">
          <b-row>
              <b-col>
                  <b-form-group label="Cedula:" label-for="txtCC">
                      <b-form-input id="txtCC" v-model="form.cc" type="number" required placeholder="Cedula" disabled></b-form-input>
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-form-group label="Trabajo deseado:" label-for="txtNom">
                      <b-form-input id="txtNom" v-model="form.trabajo_deseado" type="text" required placeholder="Trabajo deseado" ></b-form-input>
                  </b-form-group>
              </b-col>
              <b-col>
                  <b-form-group label="Trabajo realizado:" label-for="txtNom">
                      <b-form-input id="txtNom" v-model="form.trabajo_realizado" type="text" required placeholder="Trabajo realizado" ></b-form-input>
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-form-group label="Pigmentos utilizados:" label-for="txtNom">
                      <b-form-input id="txtNom" v-model="form.pigmentos" type="text" required placeholder="Pigmentos" ></b-form-input>
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-form-group label="Medicamentos recomendados:" label-for="txtNom">
                      <b-form-input id="txtNom" v-model="form.medicamentos" type="text" required placeholder="Medicamentos" ></b-form-input>
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-form-group label="Anexa autorizacion medica:" label-for="txtNom">
                      <b-form-radio-group required v-model="form.autorizacion"  :options="yes_no"></b-form-radio-group>
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-form-group label="Valor:" label-for="txtNom">
                      <b-form-input id="txtNom" v-model="form.valor" type="text" required placeholder="Valor" ></b-form-input>
                  </b-form-group>
              </b-col>
              <b-col>
                  <b-form-group label="Fecha del retoque:" label-for="txtNom">
                      <b-form-input id="txtNom" type="text" v-model="form.retoque" required placeholder="Fecha" ></b-form-input>
                  </b-form-group>
              </b-col>
          </b-row>

          <section v-if="autorizaFotos=='Si' && 1+1==3">
              <h3>Fotos</h3>
              <b-row>
                  <b-col>
                      <b-button @click="nFotos++" class="bg-success mb-3"><b-icon-plus-circle></b-icon-plus-circle> Agregar Foto</b-button>
                  </b-col>
              </b-row>
              <b-row v-for="(index) in nFotos" :key="index" class="mb-3">
                  <b-col cols="8">
                      <b-form-file v-model="fotos[index-1]" :state="Boolean(form.fotos[index-1])" placeholder="Foto"
                      drop-placeholder="Foto"></b-form-file>
                  </b-col>
                  <b-col>
                      <b-button class="bg-danger" @click="form.fotos.splice(index-1, 1);nFotos--"><b-icon-trash></b-icon-trash> Eliminar</b-button>
                  </b-col>
              </b-row>
          </section>
          <b-row>
              <b-col>
                  <b-button type="submit" class="bg-success mt-4" block> Continuar</b-button>
              </b-col>
          </b-row>
        </b-form>
      </b-container>
    </section>
  </div>
</template>

<script>
// TODO: Add isLoading
import { uploadImage } from '../../backend/controllers/StoregeController'
import { create, getAll } from '../../backend/controllers/FirestoreController'
import { showToast } from '../../utils'
import { mapGetters } from 'vuex'

const fecha = new Date()
const mes = `${fecha.getMonth() + 2}`.trim().length === 1 ? `0${fecha.getMonth() + 2}` : `${fecha.getMonth() + 2}`

export default {
  props: ['cedula', 'autorizaFotos'],
  data () {
    return {
      yes_no: ['Si', 'No'],
      nFotos: 0,
      fotos: [],
      form: {
        cc: this.cedula,
        trabajo_deseado: '',
        trabajo_realizado: '',
        pigmentos: '',
        medicamentos: '',
        autorizacion: '',
        valor: '',
        retoque: `${fecha.getDate()}/${mes}/${fecha.getFullYear()}`,
        fotos: [],
        fecha: ''
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    upload (listFiles) {
      if (this.autorizaFotos === 'Si') {
        listFiles.map(file => uploadImage(file, `Pacientes/${this.form.cc}`, file.name))
        return listFiles
      }
      return []
    }
  },
  async crear () {
    try {
      this.form.fotos = await Promise.all(this.upload(this.fotos))
      const moment = require('moment')
      const fecha = new Date()
      this.form.fecha = moment(fecha).format('DD/MM/YYYY')
      const user = await getAll('Companies').where('email', '==', this.user.email).get()
      this.form.realizadoPor = user.docs[0].id
      await create('Procedure', this.form)
      showToast(this.$bvToast, 'Tarea finalizada', 'Se ha guradado toda la informacion a la base de datos', 'success')
      this.$router.push({ name: 'Home' })
    } catch (error) {
      showToast(this.$bvToast, 'Tarea Abortada', error.message, 'danger')
    }
  }
}
</script>

<style>
    .procedimiento_container{
        color: white;
    }
</style>
