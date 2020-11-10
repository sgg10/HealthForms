<template>
  <div>
    <b-table :fields="filds" :items="registros" bordered striped head-variant="dark" responsive>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'Control_Covid',
  props: ['registros'],
  data () {
    return {
      filds: [
        { label: 'Fecha', key: 'fecha' },
        { label: 'Documento', key: 'cedula' },
        { label: 'Tos seca', key: 'tos_seca' },
        { label: 'Cansancio o agotamiento', key: 'cansancio_agotamiento' },
        { label: 'Dolor de garganta', key: 'dolor_garganta' },
        { label: 'Dificultad respiratoria', key: 'dificultad_respiratoria' },
        { label: 'Dolor de cabeza', key: 'dolor_cabeza' },
        { label: 'Temperatura', key: 'temeperatura' },
        { label: 'Miembros de la familia con Covid-19', key: 'familiares_con_covid' },
        { label: 'Contacto con personas contagiadas', key: 'contacto_con_contagiados' },
        { label: 'Contacto con personas que viajaron', key: 'contsacto_con_viajeros' },
        { label: 'Ha viajado en el ultimo mes', key: 'viajo' },
        { label: 'Tipo de evaluacion', key: 'tipo' }
      ]
    }
  }
}
</script>

<style lang="scss">
  td{
    color: white;
  }
</style>
