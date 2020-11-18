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
        { label: 'Date', key: 'fecha' },
        { label: 'Document', key: 'cedula' },
        { label: 'Dry cough', key: 'tos_seca' },
        { label: 'Tiredness or exhaustion', key: 'cansancio_agotamiento' },
        { label: 'Sore throat', key: 'dolor_garganta' },
        { label: 'Difficulty breathing', key: 'dificultad_respiratoria' },
        { label: 'Headache', key: 'dolor_cabeza' },
        { label: 'Temperature', key: 'temeperatura' },
        { label: 'Family members with Covid-19', key: 'familiares_con_covid' },
        { label: 'Contact with infected people', key: 'contacto_con_contagiados' },
        { label: 'Contact with people who traveled', key: 'contsacto_con_viajeros' },
        { label: 'Has traveled in the last month', key: 'viajo' },
        { label: 'Evaluation type', key: 'tipo' }
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
