import enum
from sqlalchemy import Boolean, Column, Integer, String, Enum
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
    is_active = Column(Boolean, default=False)

    nutritionPrograms = relationship("NutritionProgram", back_populates="user", cascade="all, delete-orphan")
    appointments = relationship("Appointment", back_populates="user", cascade="all, delete-orphan")
    