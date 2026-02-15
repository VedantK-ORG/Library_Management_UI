from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import base

class Author(base):
    __tablename__ = "authors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    basicinfo = Column(String)

    books = relationship("Book", back_populates="author")


class Category(base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    
    books = relationship("Book",back_populates="category")

class Book(base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    isbn = Column(String, unique=True, nullable=True)
    publication_year = Column(Integer, nullable=False)

    author_id = Column(Integer, ForeignKey('authors.id'), nullable=False)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)

    author = relationship("Author", back_populates="books")
    category = relationship("Category", back_populates="books")