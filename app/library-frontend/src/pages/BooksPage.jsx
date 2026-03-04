import { useEffect, useState } from "react";
import { getBooks } from "../services/api";

import BooksTable from "../components/books/BooksTable";
import BookForm from "../components/books/BookForm";

function BooksPage(){

  const [books,setBooks] = useState([]);

  const loadBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return(

    <div>

      <h2>Books Management</h2>

      <BookForm refresh={loadBooks} />

      <BooksTable books={books} refresh={loadBooks} />

    </div>

  )
}

export default BooksPage;