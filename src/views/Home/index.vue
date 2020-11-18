<template>
    <div>
        <div class="cards">
            <b-container class="my-3">
                <b-row class="justify-content-md-center">
                    <b-col cols="12" md="auto">
                        <Card title="Nuevo Procedimiento"
                        msg="Genera historia, control de Covid-19 y registro de procedimiento rapidamente."
                        img="https://firebasestorage.googleapis.com/v0/b/maquillaje-permanente.appspot.com/o/Imgs%2Fcejas-tatuadas_opt-1.png?alt=media&token=6093cbaf-658f-4e3c-8945-767e159523b0"
                        @action="procedure = $event;go('Records')"/>
                    </b-col>
                    <b-col cols="12" md="auto">
                        <Card title="Consultar Historias y procedimientos"
                        msg="Consulte la informacion de cualquier paciente junto con sus procedimientos."
                        img="https://img.freepik.com/vector-gratis/ilustracion-lupa_53876-28516.jpg?size=626&ext=jpg"
                        @action="procedure = $event;go('Consultation')" />
                    </b-col>
                    <b-col cols="12" md="auto">
                        <Card title="Control Covid-19 Salida"
                        msg="Genera rapidamente registro de control para el Covid-19 por salida del paciente."
                        img="https://firebasestorage.googleapis.com/v0/b/maquillaje-permanente.appspot.com/o/Imgs%2FCorana-Virus-800px.jpg?alt=media&token=668a43e3-18bd-43d0-a7c5-3c98a72c91c6"
                        @action="procedure = $event;go('CovidControl')"/>
                    </b-col>
                    <b-col cols="12" md="auto">
                        <Card title="Actualizar historia"
                        msg="Actualice toda la informacion de un paciente"
                        img="https://firebasestorage.googleapis.com/v0/b/maquillaje-permanente.appspot.com/o/Imgs%2FHistoria.jpg?alt=media&token=ac04297f-6b8c-4030-ab16-5f03400bc233"
                        @action="procedure = $event;go('Records', {actualiza: true})"/>
                    </b-col>
                </b-row>
            </b-container>
        </div>

    </div>
</template>

<script>
import Card from '@/components/widgets/Card.vue'
export default {
  components: { Card },
  data () {
    return {
      procedure: false
    }
  },
  methods: {
    go (name, params = {}) {
      // eslint-disable-next-line
      this.procedure ? this.$router.push({ name, params: params }) : null
    }
  }
}
</script>

<style lang="scss">
    .cards{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0px 30px;
        color: rgb(56, 53, 53);
    }
</style>
