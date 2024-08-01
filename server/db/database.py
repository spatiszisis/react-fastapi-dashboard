from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

URL_DATABASE = 'postgresql://fastapi_user:fastapi_password@localhost:5433/fastapi_db'

engine = create_engine(
    URL_DATABASE, connect_args={}, future=True
)
SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, future=True
)

Base = declarative_base()

# DB Utitlities
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()