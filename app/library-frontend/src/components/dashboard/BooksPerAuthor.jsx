import { useState } from "react";
import { getBooksPerAuthor } from "../../services/api";

function BooksPerAuthor(){

  const [data,setData] = useState([]);

  const loadData = async () => {
    const res = await getBooksPerAuthor();
    console.log(res);   // helpful for debugging
    setData(res);
  };

  return(
    <div className="card">

      <h3>Books per Author</h3>

      <button onClick={loadData}>
        Load
      </button>

      <ul>
        {data.map((item,index)=>(
          <li key={index}>
            {item.name} — {item.count}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default BooksPerAuthor