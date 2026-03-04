import { useState } from "react";
import { getBooksPerCategory } from "../../services/api";

function BooksPerCategory(){

  const [data,setData] = useState([]);

  const loadData = async () => {
    const res = await getBooksPerCategory();
    console.log(res); // debugging
    setData(res);
  };

  return(
    <div className="card">

      <h3>Books per Category</h3>

      <button onClick={loadData}>
        Load
      </button>

      <ul>
        {data.map((item,index)=>(
          <li key={index}>
            {item.name} : {item.count}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default BooksPerCategory