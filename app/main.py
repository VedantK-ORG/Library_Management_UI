from .database import engine
from . import tables

def create_tables():
    tables.base.metadata.create_all(bind=engine)
    print("Tables created successfully")


if __name__ == "__main__":
    create_tables()