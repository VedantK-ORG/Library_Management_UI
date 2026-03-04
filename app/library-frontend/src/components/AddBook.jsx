import { useState } from "react";
import { addBook } from "../services/api";
import "./AddBook.css";

function AddBook() {
  const [form, setForm] = useState({
    title: "",
    isbn: "",
    publication_year: "",
    author_id: "",
    category_id: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBook({
        ...form,
        publication_year: Number(form.publication_year),
        author_id: Number(form.author_id),
        category_id: Number(form.category_id),
      });

      alert("Book added successfully!");

      setForm({
        title: "",
        isbn: "",
        publication_year: "",
        author_id: "",
        category_id: ""
      });

    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Book</h2>

      <form className="book-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            value={form.isbn}
            onChange={(e) =>
              setForm({ ...form, isbn: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Publication Year</label>
          <input
            type="number"
            value={form.publication_year}
            onChange={(e) =>
              setForm({ ...form, publication_year: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Author ID</label>
          <input
            type="number"
            value={form.author_id}
            onChange={(e) =>
              setForm({ ...form, author_id: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Category ID</label>
          <input
            type="number"
            value={form.category_id}
            onChange={(e) =>
              setForm({ ...form, category_id: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Book
        </button>

      </form>
    </div>
  );
}

export default AddBook;