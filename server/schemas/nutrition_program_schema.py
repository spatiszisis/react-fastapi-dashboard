from datetime import datetime
from pydantic import BaseModel
from schemas import nutrition_program_day_schema

class NutritionProgramBase(BaseModel):
    title: str
    notes: str
    start_date: datetime
    end_date: datetime
    user_id: int

class NutritionProgramCreate(NutritionProgramBase):
    pass

class NutritionProgramUpdate(NutritionProgramBase):
    id: int

class NutritionProgram(NutritionProgramBase):
    id: int
    created_at: datetime
    updated_at: datetime
    nutritionProgramDays: list[nutrition_program_day_schema.NutritionProgramDay] = []

    class Config:
        orm_mode = True