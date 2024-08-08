from venv import create
from sqlalchemy.orm import Session
from schemas.nutrition_program_day_schema import NutritionProgramDayCreate, NutritionProgramDay, NutritionProgramDayUpdate
from models.nutrition_program_model import NutritionProgramDay
import datetime

def get_nutrition_program_day(db: Session, nutrition_program_day_id: int):
    return db.query(NutritionProgramDay).filter(NutritionProgramDay.id == nutrition_program_day_id).first()

def get_nutrition_program_days(db: Session, skip: int = 0, limit: int = 100):
    return db.query(NutritionProgramDay).offset(skip).limit(limit).all()

def create_nutrition_program_day(db: Session, nutrition_program_day: NutritionProgramDayCreate):
    db_nutrition_program_day = NutritionProgramDay(
        day=nutrition_program_day.day, 
        title=nutrition_program_day.title, 
        notes=nutrition_program_day.notes, 
        nutrition_program_id=nutrition_program_day.nutrition_program_id,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )
    db.add(db_nutrition_program_day)
    db.commit()
    db.refresh(db_nutrition_program_day)
    return db_nutrition_program_day

def update_nutrition_program_day(db: Session, nutrition_program_day_id: int, nutrition_program_day: NutritionProgramDayUpdate):
    db_nutrition_program_day = db.query(NutritionProgramDay).filter(NutritionProgramDay.id == nutrition_program_day_id).first()
    db_nutrition_program_day.day = nutrition_program_day.day
    db_nutrition_program_day.title = nutrition_program_day.title
    db_nutrition_program_day.notes = nutrition_program_day.notes
    db_nutrition_program_day.nutrition_program_id = nutrition_program_day.nutrition_program_id
    db_nutrition_program_day.updated_at = datetime.datetime.now()
    db.commit()
    db.refresh(db_nutrition_program_day)
    return db_nutrition_program_day

def delete_nutrition_program_day(db: Session, nutrition_program_day_id: int):
    db_nutrition_program_day = db.query(NutritionProgramDay).filter(NutritionProgramDay.id == nutrition_program_day_id).first()
    db.delete(db_nutrition_program_day)
    db.commit()
    return db_nutrition_program_day