from pydantic import BaseModel
from typing import List, Optional


# ---------- BASIC BOOK ----------

class BookResponse(BaseModel):
    id: int
    title: str
    isbn: str
    publication_year: int
    author_id: int
    category_id: int

    class Config:
        from_attributes = True


# ---------- COUNT RESPONSE ----------

class CountResponse(BaseModel):
    count: int


# ---------- AVERAGE RESPONSE ----------

class AverageYearResponse(BaseModel):
    average_year: float


# ---------- MIN MAX RESPONSE ----------

class MinMaxYearResponse(BaseModel):
    earliest_year: Optional[int]
    latest_year: Optional[int]


# ---------- YES/NO RESPONSE ----------

class ExistsResponse(BaseModel):
    exists: bool


# ---------- COUNT PER NAME RESPONSE ----------

class NameCountResponse(BaseModel):
    name: str
    count: int


# ---------- AUTHOR WITH BOOKS ----------

class AuthorBooksResponse(BaseModel):
    author_name: str
    books: List[str]

# -------- AUTHOR --------

class AuthorCreate(BaseModel):
    name: str
    basicinfo: Optional[str] = None


class AuthorResponse(BaseModel):
    id: int
    name: str
    basicinfo: Optional[str] = None

    class Config:
        from_attributes = True


# -------- CATEGORY --------

class CategoryCreate(BaseModel):
    name: str


class CategoryResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


# -------- BOOK --------

class BookCreate(BaseModel):
    title: str
    isbn: str
    publication_year: int
    author_id: int
    category_id: int
