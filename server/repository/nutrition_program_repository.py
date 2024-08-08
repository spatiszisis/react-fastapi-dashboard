from sqlalchemy.orm import Session
from models.nutrition_program_model import NutritionProgram
from schemas.nutrition_program_schema import NutritionProgramCreate, NutritionProgramUpdate
import datetime

def get_nutrition_program(db: Session, nutrition_program_id: int):
    return db.query(NutritionProgram).filter(NutritionProgram.id == nutrition_program_id).first()

def get_nutrition_programs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(NutritionProgram).offset(skip).limit(limit).all()

def create_nutrition_program(db: Session, nutrition_program: NutritionProgramCreate):
    db_nutrition_program = NutritionProgram(
        title=nutrition_program.title, 
        notes=nutrition_program.notes, 
        start_date=nutrition_program.start_date, 
        end_date=nutrition_program.end_date, 
        user_id=nutrition_program.user_id,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )
    db.add(db_nutrition_program)
    db.commit()
    db.refresh(db_nutrition_program)
    return db_nutrition_program

def update_nutrition_program(db: Session, nutrition_program_id: int, nutrition_program: NutritionProgramUpdate):
    db_nutrition_program = db.query(NutritionProgram).filter(NutritionProgram.id == nutrition_program_id).first()
    db_nutrition_program.title = nutrition_program.title
    db_nutrition_program.notes = nutrition_program.notes
    db_nutrition_program.start_date = nutrition_program.start_date
    db_nutrition_program.end_date = nutrition_program.end_date
    db_nutrition_program.user_id = nutrition_program.user_id
    db_nutrition_program.updated_at = datetime.datetime.now()
    db.commit()
    db.refresh(db_nutrition_program)
    return db_nutrition_program

def delete_nutrition_program(db: Session, nutrition_program_id: int):
    db_nutrition_program = db.query(NutritionProgram).filter(NutritionProgram.id == nutrition_program_id).first()
    db.delete(db_nutrition_program)
    db.commit()
    return db_nutrition_program