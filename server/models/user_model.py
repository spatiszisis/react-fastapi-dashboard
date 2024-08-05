import enum
import datetime
from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime
from sqlalchemy.orm import relationship
from db.database import Base
from .mixins_model import Timestamp

class Role(enum.IntEnum):
    admin = 1
    customer = 2

class User(Timestamp, Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String)
    role = Column(Enum(Role))
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    is_active = Column(Boolean, default=True)

    nutritionPrograms = relationship("NutritionProgram", back_populates="user", cascade="all, delete-orphan")
    appointments = relationship("Appointment", back_populates="user", cascade="all, delete-orphan")

class Token(Base):
    __tablename__ = "tokens"

    user_id = Column(Integer)
    access_token = Column(String, primary_key=True, index=True)
    refresh_token = Column(String)
    status = Column(Boolean)
    created_at = Column(DateTime, default= datetime.datetime.now())