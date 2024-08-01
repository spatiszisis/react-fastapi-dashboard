from sqlalchemy.orm import Session
from models.user_model import User
from schemas.user_schema import UserCreate, UserUpdate
import datetime

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

def create_user(db: Session, user: UserCreate):
    db_user = User(
        email=user.email, 
        role=user.role, 
        is_active=user.is_active, 
        first_name=user.first_name,
        last_name=user.last_name,
        password=user.password,
        created_at=datetime.datetime.now(), 
        updated_at=datetime.datetime.now()
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    db.delete(user)
    db.commit()
    return user

def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user: User = db.query(User).filter(User.id == user_id).first()
    db_user.email = user.email
    db_user.role = user.role
    db_user.is_active = user.is_active
    db_user.first_name = user.first_name
    db_user.last_name = user.last_name
    db_user.password = user.password
    db_user.updated_at = datetime.datetime.now()
    db.commit()
    db.refresh(db_user)
    return db_user
    