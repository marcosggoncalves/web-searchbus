<script>
import { Pie } from "vue-chartjs";
import axios from '@/axios.js';

export default {
  extends: Pie,
  mounted() {
    let chartData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#6A5ACD', // Blue
            '#00CED1',
            '#006400',
            '#FFD700'
          ],
          hoverBackgroundColor: [
            '#6A5ACD', // Blue
            '#00CED1',
            '#006400',
            '#FFD700'
          ]
        }
      ]
    }

    axios.get("/vehicles/most-viewed").then(result=>{

      result.data.forEach((element) => {
          chartData.labels.push(element[1]);
          chartData.datasets[0].data.push(element[2]);
      });

      this.renderChart(
        chartData,
        { responsive: true, maintainAspectRatio: false }
      );
    });
  }
};
</script>
