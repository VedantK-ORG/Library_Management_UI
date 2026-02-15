from sqlalchemy.orm import Session
from sqlalchemy import func
from . import tables


# 1️⃣ Total number of books
def total_books(db: Session):
    return db.query(func.count(tables.Book.id)).scalar()


# 2️⃣ Average publication year
def average_publication_year(db: Session):
    avg = db.query(func.avg(tables.Book.publication_year)).scalar()
    return avg if avg else 0


# 3️⃣ Earliest & latest book for an author
def min_max_year_by_author(db: Session, author_id: int):
    result = db.query(
        func.min(tables.Book.publication_year),
        func.max(tables.Book.publication_year)
    ).filter(tables.Book.author_id == author_id).first()

    return result


# 4️⃣ First N books sorted by title
def first_n_books(db: Session, n: int):
    return db.query(tables.Book).order_by(tables.Book.title).limit(n).all()


# 4️⃣ First N authors sorted by name
def first_n_authors(db: Session, n: int):
    return db.query(tables.Author).order_by(tables.Author.name).limit(n).all()


# 5️⃣ Do all books in category have publication year?
def all_books_have_year(db: Session, category_id: int):
    count_without_year = db.query(tables.Book).filter(
        tables.Book.category_id == category_id,
        tables.Book.publication_year == None
    ).count()

    return count_without_year == 0


# 6️⃣ At least one book by author?
def book_exists_by_author(db: Session, author_id: int):
    return db.query(tables.Book).filter(tables.Book.author_id == author_id).first() is not None


# 6️⃣ At least one book in category?
def book_exists_by_category(db: Session, category_id: int):
    return db.query(tables.Book).filter(tables.Book.category_id == category_id).first() is not None


# 7️⃣ Count books per author
def books_per_author(db: Session):
    return db.query(
        tables.Author.name,
        func.count(tables.Book.id)
    ).join(tables.Book).group_by(tables.Author.name).all()


# 7️⃣ Count books per category
def books_per_category(db: Session):
    return db.query(
        tables.Category.name,
        func.count(tables.Book.id)
    ).join(tables.Book).group_by(tables.Category.name).all()


# 8️⃣ List authors + sorted books
def authors_with_sorted_books(db: Session):
    authors = db.query(tables.Author).all()
    result = []

    for author in authors:
        books = db.query(tables.Book.title)\
            .filter(tables.Book.author_id == author.id)\
            .order_by(tables.Book.publication_year)\
            .all()

        result.append((author.name, [b[0] for b in books]))

    return result

# -------- CREATE AUTHOR --------
def create_author(db: Session, author_data):
    author = tables.Author(**author_data.dict())
    db.add(author)
    db.commit()
    db.refresh(author)
    return author


# -------- CREATE CATEGORY --------
def create_category(db: Session, category_data):
    category = tables.Category(**category_data.dict())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


# -------- CREATE BOOK --------
def create_book(db: Session, book_data):
    book = tables.Book(**book_data.dict())
    db.add(book)
    db.commit()
    db.refresh(book)
    return book


#Get books
def get_books(db):
    return db.query(tables.Book).all()

#Get book by id
def get_book(db, book_id):
    return db.query(tables.Book).filter(tables.Book.id == book_id).first()

#Update book
def update_book(db, book_id, book_data):
    book = db.query(tables.Book).filter(tables.Book.id == book_id).first()
    if book:
        book.title = book_data.title
        book.isbn = book_data.isbn
        book.publication_year = book_data.publication_year
        book.author_id = book_data.author_id
        book.category_id = book_data.category_id
        db.commit()
        db.refresh(book)
    return book

#Delete book
def delete_book(db, book_id):
    book = db.query(tables.Book).filter(tables.Book.id == book_id).first()
    if book:
        db.delete(book)
        db.commit()
    return book

#Get all categories
def get_categories(db):
    return db.query(tables.Category).all()

#get Category by ID
def get_category(db, category_id):
    return db.query(tables.Category).filter(tables.Category.id == category_id).first()

#Update Category
def update_category(db, category_id, category_data):
    category = db.query(tables.Category).filter(tables.Category.id == category_id).first()
    if category:
        category.name = category_data.name
        db.commit()
        db.refresh(category)
    return category

#Delete category
def delete_category(db, category_id):
    category = db.query(tables.Category).filter(tables.Category.id == category_id).first()
    if category:
        db.delete(category)
        db.commit()
    return category

#Get all authors
def get_authors(db):
    return db.query(tables.Author).all()

#get author by ID
def get_author(db, author_id):
    return db.query(tables.Author).filter(tables.Author.id == author_id).first()

def update_author(db, author_id, author_data):
    author = db.query(tables.Author).filter(tables.Author.id == author_id).first()
    if author:
        author.name = author_data.name
        author.basicinfo = author_data.basicinfo
        db.commit()
        db.refresh(author)
    return author

#Delete Author
def delete_author(db, author_id):
    author = db.query(tables.Author).filter(tables.Author.id == author_id).first()
    if author:
        db.delete(author)
        db.commit()
    return author