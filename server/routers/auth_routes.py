from fastapi import APIRouter,status,Depends
from fastapi.exceptions import HTTPException
from schemas.auth_schema import LoginModel
from fastapi.exceptions import HTTPException
from werkzeug.security import check_password_hash
from fastapi_jwt_auth import AuthJWT
from fastapi.encoders import jsonable_encoder
from db.database import get_db
from repository import user_repository, token_repository
from sqlalchemy.orm import Session

router = APIRouter(
    prefix='/auth',
    tags=['Auth Routes']
)

# hello route
@router.get('/')
async def hello(Authorize: AuthJWT=Depends()):
    try:
        Authorize.jwt_required()
        return {"message":"Hello World"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Token"
        )

# login route
@router.post('/login', status_code=200)
async def login(user: LoginModel, Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    db_user = user_repository.get_user_by_email(db=db, email=user.email)

    if db_user and check_password_hash(db_user.password, user.password):
        access_token=Authorize.create_access_token(subject=db_user.id)
        refresh_token=Authorize.create_refresh_token(subject=db_user.id)

        token_repository.create_token(db=db, user_id=db_user.id, access_token=access_token, refresh_token=refresh_token)

        response={
            "access":access_token,
            "refresh":refresh_token
        }

        return jsonable_encoder(response)

    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid Username Or Password"
    )

# refreshing tokens
@router.get('/refresh')
async def refresh_token(Authorize: AuthJWT=Depends()):
    try:
        Authorize.jwt_refresh_token_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please provide a valid refresh token"
        ) 

    current_user=Authorize.get_jwt_subject()
    access_token=Authorize.create_access_token(subject=current_user)
    return jsonable_encoder({"access":access_token})

# logout route
@router.get('/logout')
async def logout(Authorize: AuthJWT=Depends(), db: Session = Depends(get_db)):
    Authorize.jwt_required()
    Authorize.unset_access_cookies
    current_user=Authorize.get_jwt_subject()
    token=token_repository.get_token_by_id_and_token(db=db, user_id=current_user, token=Authorize._token)

    if token:
        token_repository.delete_token_if_exist(db=db, user_id=current_user, token=Authorize._token)
        return {"message":"Successfully logged out"}

    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid Token"
    )