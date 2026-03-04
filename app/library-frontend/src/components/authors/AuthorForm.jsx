import { useState } from "react";
import { addAuthor } from "../../services/api";

function AuthorForm({ refresh }) {

  const [name,setName] = useState("");
  const [basicinfo,setInfo] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    await addAuthor({
      name:name,
      basicinfo:basicinfo
    });

    setName("");
    setInfo("");

    refresh();
  };

  return(

    <form onSubmit={handleSubmit} className="author-form">

      <h3>Add Author</h3>

      <input
        placeholder="Author Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
      />

      <input
        placeholder="Basic Info"
        value={basicinfo}
        onChange={(e)=>setInfo(e.target.value)}
      />

      <button type="submit">
        Add Author
      </button>

    </form>

  );
}

export default AuthorForm;