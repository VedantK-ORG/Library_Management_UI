import { useState } from "react";
import { addBook } from "../../services/api";

function BookForm({ refresh }) {

  const [form, setForm] = useState({
    title: "",
    isbn: "",
    publication_year: "",
    author_id: "",
    category_id: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addBook({
      ...form,
      publication_year: Number(form.publication_year),
      author_id: Number(form.author_id),
      category_id: Number(form.category_id)
    });

    refresh();

    setForm({
      title: "",
      isbn: "",
      publication_year: "",
      author_id: "",
      category_id: ""
    });
  };

  return (

    <form onSubmit={handleSubmit} className="book-form">

      <h3>Add Book</h3>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <input
        placeholder="ISBN"
        value={form.isbn}
        onChange={(e) => setForm({ ...form, isbn: e.target.value })}
        required
      />

      <input
        placeholder="Year"
        type="number"
        value={form.publication_year}
        onChange={(e) =>
          setForm({ ...form, publication_year: e.target.value })
        }
      />

      <input
        placeholder="Author ID"
        type="number"
        value={form.author_id}
        onChange={(e) =>
          setForm({ ...form, author_id: e.target.value })
        }
        required
      />

      <input
        placeholder="Category ID"
        type="number"
        value={form.category_id}
        onChange={(e) =>
          setForm({ ...form, category_id: e.target.value })
        }
        required
      />

      <button type="submit">
        Add Book
      </button>

    </form>
  );
}

export default BookForm;