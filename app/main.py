from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import tables, crud, schemas

tables.base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#Get all books
@app.get("/books/", response_model=list[schemas.BookResponse])
def read_books(db: Session = Depends(get_db)):
    return crud.get_books(db)

@app.get("/authors/")
def read_authors(db: Session = Depends(get_db)):
    return crud.get_authors(db)



@app.get("/categories/")
def read_categories(db: Session = Depends(get_db)):
    return crud.get_categories(db)









# 1️⃣ Total books
@app.get("/books/count", response_model=schemas.CountResponse)
def get_total_books(db: Session = Depends(get_db)):
    return {"count": crud.total_books(db)}


# 2️⃣ Average publication year
@app.get("/books/average-year", response_model=schemas.AverageYearResponse)
def get_avg_year(db: Session = Depends(get_db)):
    return {"average_year": crud.average_publication_year(db)}


# 3️⃣ Earliest & latest by author
@app.get("/authors/{author_id}/min-max-year", response_model=schemas.MinMaxYearResponse)
def get_min_max(author_id: int, db: Session = Depends(get_db)):
    min_year, max_year = crud.min_max_year_by_author(db, author_id)
    return {"earliest_year": min_year, "latest_year": max_year}


# 4️⃣ First N books
@app.get("/books/first/{n}", response_model=list[schemas.BookResponse])
def get_first_books(n: int, db: Session = Depends(get_db)):
    return crud.first_n_books(db, n)


# 6️⃣ Exists by author
@app.get("/authors/{author_id}/has-book", response_model=schemas.ExistsResponse)
def has_book_author(author_id: int, db: Session = Depends(get_db)):
    return {"exists": crud.book_exists_by_author(db, author_id)}


# 7️⃣ Books per author
@app.get("/stats/books-per-author", response_model=list[schemas.NameCountResponse])
def books_author(db: Session = Depends(get_db)):
    data = crud.books_per_author(db)
    return [{"name": name, "count": count} for name, count in data]


# 8️⃣ Authors with sorted books
@app.get("/authors/books-sorted", response_model=list[schemas.AuthorBooksResponse])
def author_books_sorted(db: Session = Depends(get_db)):
    data = crud.authors_with_sorted_books(db)
    return [{"author_name": name, "books": books} for name, books in data]

# -------- CREATE AUTHOR --------
@app.post("/authors/", response_model=schemas.AuthorResponse)
def add_author(author: schemas.AuthorCreate, db: Session = Depends(get_db)):
    return crud.create_author(db, author)


# -------- CREATE CATEGORY --------
@app.post("/categories/", response_model=schemas.CategoryResponse)
def add_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    return crud.create_category(db, category)


# -------- CREATE BOOK --------
@app.post("/books/", response_model=schemas.BookResponse)
def add_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.create_book(db, book)

@app.get("/authors/{author_id}")
def read_author(author_id: int, db: Session = Depends(get_db)):
    author = crud.get_author(db, author_id)
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    return author

@app.put("/authors/{author_id}")
def update_author(author_id: int, author: schemas.AuthorCreate, db: Session = Depends(get_db)):
    updated = crud.update_author(db, author_id, author)
    if not updated:
        raise HTTPException(status_code=404, detail="Author not found")
    return updated

@app.delete("/authors/{author_id}")
def delete_author(author_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_author(db, author_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Author not found")
    return {"message": "Author deleted"}

@app.put("/categories/{category_id}")
def update_category(category_id: int, category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    updated = crud.update_category(db, category_id, category)
    if not updated:
        raise HTTPException(status_code=404, detail="Category not found")
    return updated

@app.delete("/categories/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_category(db, category_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category deleted"}

@app.get("/books/{book_id}")
def read_book(book_id: int, db: Session = Depends(get_db)):
    book = crud.get_book(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@app.put("/books/{book_id}")
def update_book(book_id: int, book: schemas.BookCreate, db: Session = Depends(get_db)):
    updated = crud.update_book(db, book_id, book)
    if not updated:
        raise HTTPException(status_code=404, detail="Book not found")
    return updated


@app.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_book(db, book_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"message": "Book deleted"}