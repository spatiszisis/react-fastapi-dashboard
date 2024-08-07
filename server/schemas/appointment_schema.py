from datetime import datetime
from pydantic import BaseModel
from enum import Enum

class AppointmentBase(BaseModel):
    title: str
    description: str
    is_active: bool
    date: datetime
    user_id: int

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(AppointmentBase):
    pass

class Appointment(AppointmentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True