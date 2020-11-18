<template>
  <div>
    <b-container class="record_container text-left mt-2">
      <b-form @submit.prevent="photoUpload">
        <section class="personal_information">
          <h3>Personal Information</h3>
          <b-row>
            <b-col>
              <b-form-group label="ID:" label-for="txtCC">
                <b-form-input id="txtCC" type="number" required placeholder="Document ID" disabled v-model="form.cedula"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Name:" label-for="txtNom">
                <b-form-input id="txtNom" type="text" required placeholder="Name" v-model="form.nombre"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Birth:" label-for="txtFechaNacimiento">
                <b-form-input v-if="recibe.consulta || actualiza" id="txtFechaNacimiento" type="text" required placeholder="Birth" v-model="form.fecha_nacimiento"></b-form-input>
                <b-form-datepicker v-else id="txtFechaNacimiento" v-model="form.fecha_nacimiento" show-decade-nav></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Phone:" label-for="txtTelefono">
                <b-form-input id="txtTelefono" type="number" required placeholder="Phone number" v-model="form.telefono"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Celphone:" label-for="txtCelular">
                <b-form-input id="txtCelular" type="number" required placeholder="Celphone number" v-model="form.celular"></b-form-input>
              </b-form-group>
            </b-col>
        </b-row>
        </section>

        <section class="allergies mt-4">
          <h3>Allergic history</h3>
          <div>
              <b-row>
                <b-col>
                  <b-form-group>
                    <b-form-checkbox-group v-model="form.alergias" :options="alergias"></b-form-checkbox-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row v-if="form.alergias.indexOf('Others') != -1">
                <b-col>
                  <b-form-group label="Which?" label-for="txtOtrasAlergias">
                    <b-form-input id="txtOtrasAlergias" type="text" required placeholder="Others allergics" v-model="form.otrasAlergias"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
          </div>
        </section>

        <section class="allergies mt-4">
          <h3>Diseases history</h3>
          <div>
              <b-row>
                <b-col>
                  <b-form-group>
                    <b-form-checkbox-group v-model="form.enfermedades" :options="enfermedades"></b-form-checkbox-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row v-if="form.enfermedades.indexOf('Otros') != -1">
                <b-col>
                  <b-form-group label="Which?" label-for="txtOtrasenfermedades">
                    <b-form-input id="txtOtrasenfermedades" type="text" required placeholder="Others diseases" v-model="form.otrasEnfermedades"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
          </div>
       </section>

        <section class="previous-procedures mt-4">
          <h3>Previous procedures</h3>
          <b-row>
            <b-col>
              <b-form-group label="Have had you done permanent makeup before?">
                <b-form-radio-group required v-model="form.procedimiento_anterior.value" :options="yes_no"></b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <div v-if="form.procedimiento_anterior.value=='Si'">
            <b-row>
              <b-col>
                <b-form-group label="Which?" label-for="txtCualesProAnteriores">
                  <b-form-input id="txtCualesProAnteriores" type="text" required placeholder="Procedimientos" v-model="form.procedimiento_anterior.cuales"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="How long ago?" label-for="txtHaceCuanto">
                  <b-form-input id="txtHaceCuanto" type="text" required placeholder="Años" v-model="form.procedimiento_anterior.hace_cuanto"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Pigmentation">
                  <b-form-radio-group required v-model="form.procedimiento_anterior.pigmentacion" :options="pigmentacion"></b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
        </section>

        <section class="historia_container_autorizacion mt-4">
            <h3>Authorizations</h3>
            <b-row>
                <b-col>
                    <b-form-group label="Do you authorize the handling of personal information?" label-for="txtManejoInfo">
                        <b-form-radio-group required v-model="form.autorizaciones.informacion" :options="yes_no"></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Do you authorize information to be sent to the email" label-for="txtInfo">
                        <b-form-radio-group required v-model="form.autorizaciones.autCorreo" :options="yes_no"></b-form-radio-group>
                    </b-form-group>
                </b-col>
                <b-col v-if="form.autorizaciones.autCorreo=='Si'">
                    <b-form-group label="Email" label-for="txtCorreo">
                        <b-form-input id="txtCorreo" required type="text" placeholder="Correo" v-model="form.autorizaciones.correo"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Do you authorize the use of photos?" label-for="txtFotos">
                        <b-form-radio-group required v-model="form.autorizaciones.fotos" :options="yes_no"></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
        </section>

        <section class="mt-4" v-if="!recibe.consulta && !actualiza">
            <h3>Control for Covid-19</h3>
            <h5>Record Yes or No in case you have presented in the last 12 hours any of the mentioned symptoms</h5>
            <b-row>
                <b-col>
                    <b-form-group label="Dry cough" label-for="rbTos">
                        <b-form-radio-group required v-model="control_covid.tos_seca" :options="yes_no"></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Tiredness or exhaustion" label-for="rbCansancio">
                        <b-form-radio-group required v-model="control_covid.cansancio_agotamiento" :options="yes_no"></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Sore throat" label-for="rbGarganta">
                        <b-form-radio-group required v-model="control_covid.dolor_garganta" :options="yes_no"></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="difficulty breathing" label-for="rbRespiratoria">
                        <b-form-radio-group required v-model="control_covid.dificultad_respiratoria" :options="yes_no"></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-group label="Headache" label-for="rbCabeza">
                        <b-form-radio-group required v-model="control_covid.dolor_cabeza" :options="yes_no"></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Has any member of your family been diagnosed with Covid-19?" label-for="txtFotos">
                        <b-form-radio-group required v-model="control_covid.familiares_con_covid" :options="yes_no"></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Have you had contact with someone infected?" label-for="txtFotos">
                        <b-form-radio-group required v-model="control_covid.contacto_con_contagiados" :options="yes_no"></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Have you traveled in the last month?" label-for="txtFotos">
                        <b-form-radio-group required v-model="control_covid.viajo" :options="yes_no"></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Have you had contact with people who have traveled in the last month?" label-for="txtFotos">
                        <b-form-radio-group required v-model="control_covid.contsacto_con_viajeros" :options="yes_no"></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Temperature: " label-for="txtFotos">
                        <b-form-input id="txtTemperatura" type="number" required placeholder="degrees" v-model="control_covid.temeperatura"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </section>

        <section class="mt-2">
            <h3>Patient statements</h3>
            <b-row>
                <b-col>
                    <b-button @click="declaraciones" class="bg-success mb-4">Read the patient Statements</b-button>
                </b-col>
            </b-row>
        </section>

        <section class="mb-4">
            <h3>Patient's signature</h3>
            <b-row>
                <b-col v-if="!recibe.consulta">
                    <Signature @resultado="datosFirma=$event" @autoriza="autoriza=$event"/>
                </b-col>
                <b-col  v-if="recibe.consulta && !actualiza">
                    <img class="firma_img" :src="form.firma" alt="firma_paciente" />
                </b-col>
            </b-row>
        </section>

        <b-row v-if="!recibe.consulta && !actualiza">
            <b-col>
                <b-button type="submit" class="bg-success my-3" size="lg" block>Continue</b-button>
            </b-col>
        </b-row>
        <b-row v-if="actualiza">
            <b-col>
                <b-button @click="actualizarHistoria" class="bg-success my-3" size="lg" block>Update</b-button>
            </b-col>
        </b-row>
        <b-modal id="modal-declaraciones" title="PATIENT STATEMENT" size="xl" scrollable centered
        cancel-variant="danger" cancel-title="I do not accept" ok-title="I accept" ok-variant="success"
        @ok="aceptoDeclaracion=true" @cancel="noContinua">
            <Declaracion />
        </b-modal>
      </b-form>
    </b-container>
  </div>
</template>

<script>
// TODO: Add isLoading
import Declaracion from './Declaracion.vue'
import Signature from '../../components/widgets/Signature'
import { showToast } from '../../utils'
import { create, getAll, update } from '../../backend/controllers/FirestoreController'
import { getUser } from '../../backend/controllers/AuthController'
import { storage } from 'firebase'
import { mapGetters } from 'vuex'

export default {
  props: ['recibe', 'actualiza'],
  components: { Declaracion, Signature },
  data () {
    return {
      form: {
        cedula: this.recibe.cedula || '',
        fecha: this.recibe.fecha || '',
        fecha_nacimiento: this.recibe.fecha_nacimiento || '',
        edad: this.recibe.edad || '',
        nombre: this.recibe.nombre || '',
        telefono: this.recibe.telefono || '',
        celular: this.recibe.celular || '',
        alergias: this.recibe.alergias || [],
        otrasAlergias: this.recibe.otrasAlergias || '',
        enfermedades: this.recibe.enfermedades || [],
        otrasEnfermedades: this.recibe.otrasEnfermedades || '',
        procedimiento_anterior: this.recibe.procedimiento_anterior || {
          value: '',
          cuales: '',
          hace_cuanto: '',
          pigmentacion: ''
        },
        autorizaciones: this.recibe.autorizaciones || {
          autCorreo: '',
          correo: '',
          informacion: '',
          fotos: ''
        },
        firma: this.recibe.firma || ''
      },
      control_covid: {
        tos_seca: '',
        cansancio_agotamiento: '',
        dolor_garganta: '',
        dificultad_respiratoria: '',
        dolor_cabeza: '',
        familiares_con_covid: '',
        contacto_con_contagiados: '',
        viajo: '',
        contsacto_con_viajeros: '',
        temeperatura: '',
        tipo: 'Entrada'
      },
      alergias: ['Anesthesia', 'Penicillin', 'Herpes', 'Others'],
      enfermedades: ['Pressure', 'Sugar', 'Heart', 'Epilepsy', 'AIDS', 'Cancer', 'Keloid scarring', 'Lupus', 'Diabetes', 'Others'],
      yes_no: ['Yes', 'No'],
      pigmentacion: ['Rosacea', 'Greyish', 'Bluish', 'Blurred', 'Normal'],
      datosFirma: {},
      continuaProceso: false,
      autoriza: false,
      aceptoDeclaracion: false
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    declaraciones () {
      this.$bvModal.show('modal-declaraciones')
    },
    noContinua () {
      showToast(this.$bvToast, 'Access Denied', 'Sorry, you cannot continue if you do not accept the statements', 'danger')
    },
    continuar () {
      const moment = require('moment')
      const fecha = new Date()
      this.form.fecha = moment(fecha).format('MM/DD/YYYY')
      this.form.fecha_nacimiento = moment(this.form.fecha_nacimiento).format('MM/DD/YYYY')
      this.form.edad = moment(this.form.fecha_nacimiento, 'MM/DD/YYYY').fromNow().split(' ')[0]
      this.recibe.nuevo ? this.crear() : this.actualizar()
    },
    async crear () {
      try {
        const user = await getAll('Companies').where('email', '==', this.user.email).get()
        this.form.pacienteDe = user.docs[0].id
        await create('Records', { ...this.form, company: getUser().uid })
        showToast(this.$bvToast, 'Registration Completed', 'The history has been created successfully, now the procedure data must be filled in', 'success')
        this.covid()
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
        console.log(error)
      }
    },
    async actualizar () {
      try {
        await update('Records', this.recibe.ID, this.form)
        showToast(this.$bvToast, 'Registration Completed', 'history has been updated successfully, procedure details must now be filled in', 'success')
        this.covid()
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
        console.log(error)
      }
    },
    covid () {
      this.control_covid.nombre = this.form.nombre
      this.control_covid.cedula = this.form.cedula
      this.control_covid.fecha = this.form.fecha
      try {
        create('Covid_Control', this.control_covid)
        this.$emit('datos', this.form)
        this.$emit('continua', true)
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
        console.log(error)
      }
    },
    async actualizarHistoria () {
      const moment = require('moment')
      this.form.edad = moment(this.form.fecha_nacimiento, 'DD/MM/YYYY').fromNow().split(' ')[0]
      try {
        await update('Records', this.recibe.ID, this.form)
        showToast(this.$bvToast, 'Registration Completed', 'History has been updated successfully', 'success')
        this.$router.push({ name: 'Home' })
      } catch (error) {
        showToast(this.$bvToast, 'Error', error.message, 'danger')
        console.log(error)
      }
    },
    photoUpload () {
      if (this.aceptoDeclaracion) {
        if (this.autoriza) {
          const storageRef = storage().ref()
          const filesRefs = storageRef.child(`Imgs/Pacientes/${this.form.cedula}/firma.png`)
          filesRefs.putString(this.datosFirma.dataURL, 'data_url').then(snapshot => {
            filesRefs.getDownloadURL().then(url => {
              this.form.firma = url
              this.continuar()
            })
          }).catch(err => showToast(this.$bvToast, 'Task Aborted', err.message, 'danger'))
        } else {
          showToast(this.$bvToast, 'Access Denied', 'Sorry, you cannot continue without your signature', 'danger')
        }
      } else {
        showToast(this.$bvToast, 'Access Denied', 'Sorry, you cannot continue if you do not accept the statements', 'danger')
      }
    }
  }
}
</script>

<style>
    .record_container{
        color: white;
    }

    .firma_img{
        background: white;
    }
</style>
