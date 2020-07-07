<template>
  <div id="app">
    <Table/>
  </div>
</template>

<script>
import Table from './components/Table';
import 'materialize-css/dist/js/materialize.min'

export default {
  name: 'App',
  components: {
    Table
  }
}
</script>

<style lang="scss">
  @import '~materialize-css/dist/css/materialize.min.css';
</style>
