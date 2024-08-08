import { Appointment } from "./Appointment";
import { NutritionProgram } from "./NutritionProgram";

interface UserBase {
  email: string;
  password: string;
  role: number;
  first_name: string;
  last_name: string;
}

export interface UserCreate extends UserBase {}

export interface UserUpdate extends UserBase {
  id: number;
  is_active: boolean;
}

export interface User extends UserCreate {
  id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  appointments: Appointment[];
  nutritionPrograms: NutritionProgram[];
}
