<script>
import { Bar } from "vue-chartjs";
import axios from '@/axios.js';

export default {
  extends: Bar,
  mounted() {
    let data  = [];
    let cores = ["#000000","#4682B4","#D3D3D3","#3CB371"]

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
          labels: [],
          datasets: data
        },
        { responsive: true, maintainAspectRatio: false }
      );
    });
  }
};
</script>
