import { useState } from "react";
import { getAverageYear } from "../../services/api";

function AverageYearCard(){

  const [avg,setAvg] = useState(null);

  const loadAverage = async () => {
    const data = await getAverageYear();
    setAvg(data.average_year ?? "N/A");
  };

  return(
    <div className="card">

      <h3>Average Publication Year</h3>

      <button onClick={loadAverage}>
        Load
      </button>

      {avg !== null && <p className="card-number">{avg}</p>}

    </div>
  )
}

export default AverageYearCard