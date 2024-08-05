from pydantic import BaseModel
from typing import Optional
import os

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

class SignUpModel(BaseModel):
    id: Optional[int]
    username: str
    email: str
    password: str
    is_staff: Optional[bool]
    is_active: Optional[bool]

    class Config:
        orm_mode= True
        schema_extra={
            'example':{
                "username":"johndoe",
                "email":"johndoe@gmail.com",
                "password":"password",
                "is_staff":False,
                "is_active":True
            }
        }

class Settings(BaseModel):
    authjwt_secret_key: str = 'b4bb9013c1c03b29b9311ec0df07f3b0d8fd13edd02d5c45b2fa7b86341fa405'

class LoginModel(BaseModel):
    email: str
    password: str

class ChangePassword(BaseModel):
    email: str
    old_password: str
    new_password: str