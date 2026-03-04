const BASE_URL = "http://127.0.0.1:8000";

export const getTotalBooks = async () => {
  const res = await fetch(`${BASE_URL}/books/count`);
  return res.json();
};

export const getAverageYear = async () => {
  const res = await fetch(`${BASE_URL}/books/average-year`);
  return res.json();
};

export const getBooksPerAuthor = async () => {
  const res = await fetch(`${BASE_URL}/stats/books-per-author`);
  return res.json();
};

export const getBooks = async () => {
  const res = await fetch(`${BASE_URL}/books`);
  return res.json();
};

export const addBook = async (book) => {
  const res = await fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });
  return res.json();
};

export const deleteBook = async (id) => {
  const res = await fetch(`${BASE_URL}/books/${id}`, {
    method: "DELETE"
  });
  return res.json();
};

export const updateBook = async (id, book) => {
  const res = await fetch(`${BASE_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });
  return res.json();
};

export const getBooksPerCategory = async () => {
  const res = await fetch("http://127.0.0.1:8000/stats/books-per-category");
  return res.json();
};

export const getAuthors = async () => {
  const res = await fetch("http://127.0.0.1:8000/authors");
  return res.json();
};

export const addAuthor = async (author) => {
  const res = await fetch("http://127.0.0.1:8000/authors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(author)
  });

  return res.json();
};

export const deleteAuthor = async (id) => {
  const res = await fetch(`http://127.0.0.1:8000/authors/${id}`, {
    method: "DELETE"
  });

  return res.json();
};