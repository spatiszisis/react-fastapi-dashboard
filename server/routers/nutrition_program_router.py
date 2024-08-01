from typing import List
from fastapi import APIRouter
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.nutrition_program_schema import NutritionProgramCreate, NutritionProgram
from repository import nutrition_program_repository

router = APIRouter()

@router.get("/nutrition_programs", response_model=List[NutritionProgram])
async def read_nutrition_programs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    nutrition_programs = nutrition_program_repository.get_nutrition_programs(db, skip=skip, limit=limit)
    return nutrition_programs

@router.post("/nutrition_programs", response_model=NutritionProgram, status_code=201)
async def create_new_nutrition_program(nutrition_program: NutritionProgramCreate, db: Session = Depends(get_db)):
    return nutrition_program_repository.create_nutrition_program(db=db, nutrition_program=nutrition_program)

@router.get("/nutrition_programs/{nutrition_program_id}", response_model=NutritionProgram)
async def read_nutrition_program(nutrition_program_id: int, db: Session = Depends(get_db)):
    db_nutrition_program = nutrition_program_repository.get_nutrition_program(db=db, nutrition_program_id=nutrition_program_id)
    if db_nutrition_program is None:
        raise HTTPException(status_code=404, detail="NutritionProgram not found")
    return db_nutrition_program

@router.put("/nutrition_programs/{nutrition_program_id}", response_model=NutritionProgram)
async def update_nutrition_program(nutrition_program_id: int, nutrition_program: NutritionProgramCreate, db: Session = Depends(get_db)):
    db_nutrition_program = nutrition_program_repository.get_nutrition_program(db=db, nutrition_program_id=nutrition_program_id)
    if db_nutrition_program is None:
        raise HTTPException(status_code=404, detail="NutritionProgram not found")
    return nutrition_program_repository.update_nutrition_program(db=db, nutrition_program_id=nutrition_program_id, nutrition_program=nutrition_program)

@router.delete("/nutrition_programs/{nutrition_program_id}", response_model=NutritionProgram)
async def delete_nutrition_program(nutrition_program_id: int, db: Session = Depends(get_db)):
    db_nutrition_program = nutrition_program_repository.get_nutrition_program(db=db, nutrition_program_id=nutrition_program_id)
    if db_nutrition_program is None:
        raise HTTPException(status_code=404, detail="NutritionProgram not found")
    return nutrition_program_repository.delete_nutrition_program(db=db, nutrition_program_id=nutrition_program_id)