from datetime import datetime
from pydantic import BaseModel
from schemas import appointment_schema, nutrition_program_schema

class UserBase(BaseModel):
    email: str
    password: str
    role: int
    first_name: str
    last_name: str

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    is_active: bool
    pass

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    appointments: list[appointment_schema.Appointment] = []
    nutritionPrograms: list[nutrition_program_schema.NutritionProgram] = []

    class Config:
        orm_mode = True

class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str

class TokenCreate(TokenSchema):
    user_id: str
    status: bool
    created_at: datetime