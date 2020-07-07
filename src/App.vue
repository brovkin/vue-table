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
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap');
  @import '~materialize-css/dist/css/materialize.min.css';

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  .checkbox-green[type="checkbox"].filled-in:checked + span:after{
    border: 2px solid #4CAF50 !important;
    background-color: #4CAF50 !important;
  }
</style>
