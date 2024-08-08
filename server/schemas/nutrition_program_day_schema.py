from datetime import datetime
from pydantic import BaseModel

class NutritionProgramDayBase(BaseModel):
    title: str
    day: datetime
    notes: str
    nutrition_program_id: int

class NutritionProgramDayCreate(NutritionProgramDayBase):
    pass

class NutritionProgramDayUpdate(NutritionProgramDayBase):
    id: int

class NutritionProgramDay(NutritionProgramDayBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True