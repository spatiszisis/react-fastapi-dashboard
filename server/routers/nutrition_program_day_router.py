from typing import List
from fastapi import APIRouter
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.nutrition_program_day_schema import NutritionProgramDayCreate, NutritionProgramDay
from repository import nutrition_program_day_repository
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix='/nutrition_program_days',
    tags=['Nutrition Program Days Routes']
)

@router.post("/", response_model=NutritionProgramDay, status_code=201)
async def create_new_nutrition_program_day(nutrition_program_day: NutritionProgramDayCreate, db: Session = Depends(get_db)):
    nutrition_program_day_repository.create_nutrition_program_day(db=db, nutrition_program_day=nutrition_program_day)
    return JSONResponse(content={"message": "Nutrition program day created successfully"}, status_code=201)

@router.get("/", response_model=List[NutritionProgramDay])
async def read_nutrition_program_days(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    nutrition_program_days = nutrition_program_day_repository.get_nutrition_program_days(db, skip=skip, limit=limit)
    return nutrition_program_days

@router.get("/{nutrition_program_day_id}", response_model=NutritionProgramDay)
async def read_nutrition_program_day(nutrition_program_day_id: int, db: Session = Depends(get_db)):
    db_nutrition_program_day = nutrition_program_day_repository.get_nutrition_program_day(db=db, nutrition_program_day_id=nutrition_program_day_id)
    if db_nutrition_program_day is None:
        raise HTTPException(status_code=404, detail="Nutrition program day not found")
    return db_nutrition_program_day

@router.put("/{nutrition_program_day_id}", response_model=NutritionProgramDay)
async def update_nutrition_program_day(nutrition_program_day_id: int, nutrition_program_day: NutritionProgramDayCreate, db: Session = Depends(get_db)):
    db_nutrition_program_day = nutrition_program_day_repository.get_nutrition_program_day(db=db, nutrition_program_day_id=nutrition_program_day_id)
    if db_nutrition_program_day is None:
        raise HTTPException(status_code=404, detail="Nutrition program day not found")
    nutrition_program_day_repository.update_nutrition_program_day(db=db, nutrition_program_day_id=nutrition_program_day_id, nutrition_program_day=nutrition_program_day)
    return JSONResponse(content={"message": "Nutrition program day updated successfully"}, status_code=201)

@router.delete("/{nutrition_program_day_id}", response_model=NutritionProgramDay)
async def delete_nutrition_program_day(nutrition_program_day_id: int, db: Session = Depends(get_db)):
    db_nutrition_program_day = nutrition_program_day_repository.get_nutrition_program_day(db=db, nutrition_program_day_id=nutrition_program_day_id)
    if db_nutrition_program_day is None:
        raise HTTPException(status_code=404, detail="Nutrition program day not found")
    nutrition_program_day_repository.delete_nutrition_program_day(db=db, nutrition_program_day_id=nutrition_program_day_id)
    return JSONResponse(content={"message": "Nutrition program day removed successfully"}, status_code=201)