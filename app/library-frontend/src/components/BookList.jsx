import { useEffect, useState } from "react";
import { getBooks } from "../services/api";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(data => setBooks(data));
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} ({book.publication_year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;