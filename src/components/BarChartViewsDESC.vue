<script>
import { Bar } from "vue-chartjs";
import axios from '@/axios.js';

export default {
  extends: Bar,
  mounted() {
  
    let data  = [];

    let cores = [
      '#F0E68C',
      '#FF0000',
      '#FFA500',
      '#4B0082'
    ];

    axios.get("/vehicles/least-viewed").then(result=>{

      result.data.forEach((element,index) => {
          data.push(
            {
              label:element[1],
              backgroundColor: cores[index],
              data: [element[2]]
            }
          );
      });

      this.renderChart(
        {
          labels: ["Veiculo"],
          datasets: data
        },
        { responsive: true, maintainAspectRatio: false }
      );
    });
  }
};
</script>
