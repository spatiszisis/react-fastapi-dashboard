interface NutritionProgramDayBase {
  day: string;
  text: string;
  notes: string;
  nutrition_program_id: number;
}

export interface NutritionProgramDayCreate extends NutritionProgramDayBase {}

export interface NutritionProgramDayUpdate extends NutritionProgramDayBase {}

export interface NutritionProgramDay extends NutritionProgramDayBase {
  id: number;
  created_at: string;
  updated_at: string;
}
