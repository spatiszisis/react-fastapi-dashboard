from typing import List
from fastapi import APIRouter
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.user_schema import UserCreate, User
from repository import user_repository

router = APIRouter()

@router.get("/users", response_model=List[User])
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = user_repository.get_users(db, skip=skip, limit=limit)
    return users

@router.post("/users", response_model=User, status_code=201)
async def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = user_repository.get_user_by_email(db=db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    return user_repository.create_user(db=db, user=user)

@router.get("/users/{user_id}", response_model=User)
async def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_repository.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.put("/users/{user_id}", response_model=User)
async def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    db_user = user_repository.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user_repository.update_user(db=db, user_id=user_id, user=user)

@router.delete("/users/{user_id}", response_model=User)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_repository.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user_repository.delete_user(db=db, user_id=user_id)