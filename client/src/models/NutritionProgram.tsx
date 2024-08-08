import { NutritionProgramDay } from "./NutritionProgramDay";

interface NutritionProgramsBase {
  title: string;
  notes: string;
  start_date: string;
  end_date: string;
  user_id: number;
}

export interface NutritionProgramCreate extends NutritionProgramsBase {}

export interface NutritionProgramUpdate extends NutritionProgramsBase {}

export interface NutritionProgram extends NutritionProgramsBase {
  id: number;
  created_at: string;
  updated_at: string;
  nutritionProgramDays: NutritionProgramDay[];
}
