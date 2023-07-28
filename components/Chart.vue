<template>
  <div>
    <line-chart :chart-data="chartData" :options="chartOptions"></line-chart>
  </div>
</template>

<script>
import { reactiveProp, Line } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted() {
    // renderChart method disediakan oleh Line chart
    this.renderChart(this.chartData, this.options)
  },
}
</script>
