<template>
  <v-row justify="center" align="center" class="frame-content">
    <v-col cols="12"> No Data Available, ON PROCCESS BUILDING</v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['authenticated'],
  name: 'IndexPage',
}
</script>
<style>
/* html,
body {
  padding: 0;
  overflow: hidden !important;
} */
/* .frame-content {
  height: 90vh;
  overflow-y: auto;
} */
</style>
