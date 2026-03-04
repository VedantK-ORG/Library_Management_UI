import { deleteBook } from "../../services/api";

function BooksTable({ books, refresh }) {

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    await deleteBook(id);
    refresh();
  };

  return (
    <table className="books-table">

      <thead>
        <tr>
          <th>Title</th>
          <th>ISBN</th>
          <th>Year</th>
          <th>Author</th>
        </tr>
      </thead>

      <tbody>

        {books.map(book => (
          <tr key={book.id}>

            <td>{book.title}</td>
            <td>{book.isbn}</td>
            <td>{book.publication_year}</td>
           
            

            <td>
              <button onClick={() => handleDelete(book.id)}>
                Delete
              </button>
            </td>

          </tr>
        ))}

      </tbody>

    </table>
  );
}

export default BooksTable;