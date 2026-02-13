from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import base

class Author(base):
    __tablename__ = "authors"

    id = Column(Integer, primary_key=true, index=true)
    name = Column(String, nullable=False)
    basicinfo = Column(String)

    Au
