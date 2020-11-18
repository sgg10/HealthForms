<template>
  <div>
    <b-container fluid class="text-left">
      <b-row>
        <b-col md="3" class="mb-3">
          <b-list-group >
            <b-list-group-item button @click="showInfo(item)" v-for="(item, index) in procedimientos" :key="index">{{ item.trabajo_realizado }}-{{item.fecha}}</b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col v-if="seleccionado" class="ZonaTrabajo">
          <div class="">
            <section class="informacion_procedimiento">
              <b-row class="my-2">
                <b-col>
                  <p>Desired job: {{seleccionado.trabajo_deseado}}</p>
                </b-col>
                <b-col>
                  <p>Work done: {{seleccionado.trabajo_realizado}}</p>
                </b-col>
              </b-row>
              <b-row class="my-2">
                <b-col>
                  <p>Pigments used: {{seleccionado.pigmentos}}</p>
                </b-col>
              </b-row>
              <b-row class="my-2">
                <b-col>
                  <p>Recommended medications: {{seleccionado.medicamentos}}</p>
                </b-col>
              </b-row>
              <b-row class="my-2">
                <b-col>
                  <p>Attach medical authorization: {{seleccionado.autorizacion}}</p>
                </b-col>
                <b-col>
                  <p>Value: ${{configurarPrecio(seleccionado.valor)}}</p>
                </b-col>
              </b-row>
              <b-row class="my-2">
                <b-col>
                  <p>Retouch date: {{seleccionado.retoque}}</p>
                </b-col>
              </b-row>
            </section>

            <section v-if="autorizaFotos=='Yes'" class="Patient photos">
              <b-row>
                <b-col>
                  <b-button @click="nFotos++" class="bg-success mb-3"><b-icon-plus-circle></b-icon-plus-circle> Agregar Foto</b-button>
                </b-col>
                <b-col v-if="nFotos>0">
                  <b-button @click="subirFotos(seleccionado.fotos)" class="bg-success mb-3"><b-icon-upload></b-icon-upload> Subir Fotos</b-button>
                </b-col>
              </b-row>
              <b-row v-for="(index) in nFotos" :key="index" class="mb-3">
                <b-col cols="8">
                  <b-form-file v-model="fotos[index-1]" :state="Boolean(fotos[index-1])" placeholder="Foto"
                  drop-placeholder="Foto"></b-form-file>
                </b-col>
                <b-col>
                  <b-button class="bg-danger" @click="fotos.splice(index-1, 1);nFotos--"><b-icon-trash></b-icon-trash> Eliminar</b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col v-for="(item, index) in seleccionado.fotos" :key="index" cols="12" md="auto">
                  <img @click="show" :src="item" width="150" height="150" class=" foto mr-2 mb-2">
                </b-col>
                <b-modal id="modal_foto" size="lg" centered hide-footer hide-header>
                  <b-carousel controls >
                    <b-carousel-slide v-for="(item, index) in seleccionado.fotos" :key="index">
                      <template v-slot:img>
                        <img :src="item" class="d-block img-fluid w-100">
                      </template>
                    </b-carousel-slide>
                  </b-carousel>
                </b-modal>
              </b-row>
            </section>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { update } from '../../backend/controllers/FirestoreController'
import { uploadImage } from '../../backend/controllers/StoregeController'
import { showToast } from '../../utils'
export default {
  props: ['procedimientos', 'autorizaFotos'],
  data () {
    return {
      seleccionado: '',
      nFotos: 0,
      fotos: [],
      nuevoSetFotos: []
    }
  },
  methods: {
    showInfo (item) {
      this.seleccionado = item
    },
    configurarPrecio (precio) {
      return `${new Intl.NumberFormat().format(parseInt(precio))}`
    },
    show () {
      this.$bvModal.show('modal_foto')
    },
    async subirFotos (actualPhotoList) {
      this.nuevoSetFotos = await Promise.all(this.upload(this.fotos))
      actualPhotoList.forEach(link => this.nuevoSetFotos.push(link))
      await update('Procedure', this.seleccionado.id, { fotos: this.nuevoSetFotos }).then(() => {
        showToast(this.$bvToast, 'Task completed ', ' New photos have been saved', 'success')
        this.nuevoSetFotos = []
        this.foto = []
        this.nFotos = 0
        this.seleccionado = ''
      })
    },
    upload (listFiles) {
      if (this.autorizaFotos === 'Si') {
        const links = listFiles.map(file => uploadImage(file, `Pacientes/${this.seleccionado.cc}`, file.name))
        return links
      }
      return []
    }
  }
}
</script>

<style lang="scss">
  .ZonaTrabajo{
    background: rgba($color: #ffffff, $alpha: 0.4);
  }

  .foto{
    cursor: pointer;
  }
</style>
