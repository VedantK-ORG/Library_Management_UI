import { deleteAuthor } from "../../services/api";

function AuthorsList({ authors, refresh }) {

  const handleDelete = async (id) => {

    if(!window.confirm("Delete this author?")) return;

    await deleteAuthor(id);

    refresh();
  };

  return(

    <table className="authors-table">

      <thead>
        <tr>
          <th>Name</th>
          <th>Info</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {authors.map(author=>(
          <tr key={author.id}>

            <td>{author.name}</td>
            <td>{author.basicinfo}</td>

            <td>

              <button onClick={()=>handleDelete(author.id)}>
                Delete
              </button>

            </td>

          </tr>
        ))}

      </tbody>

    </table>

  );
}

export default AuthorsList;