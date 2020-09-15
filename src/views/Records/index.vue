<template>
    <div>
        <Identificador :actualiza="actualiza"/>
    </div>
</template>

<script>
import Identificador from './Identifier'
export default {
  components: { Identificador },
  props: ['actualiza']
}
</script>
