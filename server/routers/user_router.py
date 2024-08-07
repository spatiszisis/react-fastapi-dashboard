from typing import List
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.user_schema import UserCreate, User, UserUpdate
from repository import user_repository
from fastapi_jwt_auth import AuthJWT

router = APIRouter(
    prefix='/users',
    tags=['Users Routes']
)

@router.get("/", response_model=List[User])
async def read_users(request: Request, Authorize: AuthJWT=Depends(), skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # try:
    #     Authorize.jwt_required()
    # except Exception as e:
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Invalid Token"
    #     )
    users = user_repository.get_users(db, skip=skip, limit=limit)
    return users

@router.post("/", response_model=User, status_code=201)
async def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = user_repository.get_user_by_email(db=db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    user_repository.create_user(db=db, user=user)
    return JSONResponse(content={"message": "User created successfully"}, status_code=201)

@router.get("/{user_id}", response_model=User)
async def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_repository.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.put("/{user_id}", status_code=201)
async def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = user_repository.get_user_by_email(db=db, email=user.email)
    if db_user and db_user.id != user_id:
        raise HTTPException(status_code=400, detail="Email is already registered")
    db_user = user_repository.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user_repository.update_user(db=db, user_id=user_id, user=user)
    return JSONResponse(content={"message": "User updated successfully"}, status_code=201)

@router.delete("/{user_id}", status_code=201)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_repository.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user_repository.delete_user(db=db, user_id=user_id)
    return JSONResponse(content={"message": "User removed successfully"}, status_code=201)