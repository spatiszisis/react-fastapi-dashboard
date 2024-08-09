from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from db.database import Base
from .mixins_model import Timestamp

class NutritionProgram(Timestamp, Base):
    __tablename__ = "nutrition_programs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    notes = Column(Text, nullable=True)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="nutritionPrograms")
    nutritionProgramDays = relationship("NutritionProgramDay", back_populates="nutrition_program", cascade="all, delete-orphan")

class NutritionProgramDay(Timestamp, Base):
    __tablename__ = "nutrition_program_days"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    title = Column(String(100), nullable=False)
    notes = Column(Text, nullable=True)

    nutrition_program_id = Column(Integer, ForeignKey("nutrition_programs.id"), nullable=False)
    nutrition_program = relationship("NutritionProgram", back_populates="nutritionProgramDays")