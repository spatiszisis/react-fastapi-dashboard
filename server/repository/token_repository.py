from sqlalchemy.orm import Session
from models.user_model import Token

def get_token_by_id_and_token(db: Session, user_id: int, token: str):
    return db.query(Token).filter(Token.user_id == user_id, Token.access_token == token, Token.status == True).first()

def get_tokens(db: Session):
    return db.query(Token).all()

def create_token(db: Session, user_id: int, access_token: str, refresh_token: str):
    db_token = Token(
        user_id= user_id, 
        access_token= access_token, 
        refresh_token= refresh_token, 
        status=True,
    )
    db.add(db_token)
    db.commit()
    db.refresh(db_token)
    return db_token

def delete_token_if_exist(db: Session, user_id: int, token: str):
    existing_token = get_token_by_id_and_token(db=db, user_id=user_id, token=token)
    if existing_token:
        existing_token.status=False
        db.add(existing_token)
        db.commit()
        db.refresh(existing_token)