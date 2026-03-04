import { useState } from "react";
import { getTotalBooks } from "../../services/api";

function TotalBooksCard(){

  const [count,setCount] = useState(null);

  const loadCount = async () => {
    const data = await getTotalBooks();
    setCount(data.count);
  };

  return(
    <div className="card">

      <h3>Total Books</h3>

      <button onClick={loadCount}>
        Load
      </button>

      {count !== null && <p className="card-number">{count}</p>}

    </div>
  )
}

export default TotalBooksCard