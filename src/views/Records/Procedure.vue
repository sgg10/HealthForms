<template>
  <div>
    <section>
      <b-container class="procedimiento_container text-left my-3" fluid>
        <b-form @submit.prevent="crear">
          <b-row>
              <b-col>
                  <b-form-group label="Id:" label-for="txtCC">
                      <b-form-input id="txtCC" v-model="form.cc" type="number" required placeholder="Cedula" disabled></b-form-input>
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-form-group label="Desired job:" label-for="txtNom">
                      <b-form-input id="txtNom" v-model="form.trabajo_deseado" type="text" required placeholder="Desired job" ></b-form-input>
                  </b-form-group>
              </b-col>
              <b-col>
                  <b-form-group label="Work done:" label-for="txtNom">
                      <b-form-input id="txtNom" v-model="form.trabajo_realizado" type="text" required placeholder="Work done" ></b-form-input>
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-form-group label="Pigments used:" label-for="txtNom">
                      <b-form-input id="txtNom" v-model="form.pigmentos" type="text" required placeholder="Pigments" ></b-form-input>
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-form-group label="Recommended medications:" label-for="txtNom">
                      <b-form-input id="txtNom" v-model="form.medicamentos" type="text" required placeholder="Medications" ></b-form-input>
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-form-group label="Attach medical authorization:" label-for="txtNom">
                      <b-form-radio-group required v-model="form.autorizacion"  :options="yes_no"></b-form-radio-group>
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-form-group label="Value:" label-for="txtNom">
                      <b-form-input id="txtNom" v-model="form.valor" type="text" required placeholder="Value" ></b-form-input>
                  </b-form-group>
              </b-col>
              <b-col>
                  <b-form-group label="Retouch date:" label-for="txtNom">
                      <b-form-input id="txtNom" type="text" v-model="form.retoque" required placeholder="Date" ></b-form-input>
                  </b-form-group>
              </b-col>
          </b-row>

          <section v-if="autorizaFotos=='Yes'">
              <h3>Fotos</h3>
              <b-row>
                  <b-col>
                      <b-button @click="nFotos++" class="bg-success mb-3"><b-icon-plus-circle></b-icon-plus-circle> Add photo</b-button>
                  </b-col>
              </b-row>
              <b-row v-for="(index) in nFotos" :key="index" class="mb-3">
                  <b-col cols="8">
                      <b-form-file v-model="fotos[index-1]" :state="Boolean(form.fotos[index-1])" placeholder="Foto"
                      drop-placeholder="Foto"></b-form-file>
                  </b-col>
                  <b-col>
                      <b-button class="bg-danger" @click="form.fotos.splice(index-1, 1);nFotos--"><b-icon-trash></b-icon-trash> Delete</b-button>
                  </b-col>
              </b-row>
          </section>
          <b-row>
              <b-col>
                  <b-button type="submit" class="bg-success mt-4" block> Continue</b-button>
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
      yes_no: ['Yes', 'No'],
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
      if (this.autorizaFotos === 'Yes') {
        const links = listFiles.map(file => uploadImage(file, `Patients/${this.form.cc}`, file.name))
        return links
      }
      return []
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
        showToast(this.$bvToast, 'finished work', 'All information has been saved to the database', 'success')
        this.$router.push({ name: 'Home' })
      } catch (error) {
        showToast(this.$bvToast, 'Aborted Task', error.message, 'danger')
        console.log(error)
      }
    }
  }
}
</script>

<style>
    .procedimiento_container{
        color: white;
    }
</style>
