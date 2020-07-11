<script>
import { Line } from "vue-chartjs";
import axios from '@/axios.js';

export default {
  extends: Line,
  mounted() {
    let data  = [];
    
    let cores = ["#008B8B","#696969","#4682B4","#808080"]

    axios.get("/vehicles/most-viewed").then(result=>{

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
